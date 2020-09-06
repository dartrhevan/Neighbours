import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PointTable from "./components/Table";
import './index.css'
import { listPoints, savePoint, updatePoint, getNeighbours } from "./apiCalls";
import PointForm from "./components/PointForm";
import { checkFloatValidity } from "./CheckFloatValidity";
import GetNeighboursForm from "./components/GetNeighboursForm";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            width: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: "column"
        },
        bar: {
            flex: 1,
            flexDirection: "row"
        },
        h: {
            padding: 5,//'10px 50px',
            margin: 0
        },
        form: {
            padding: 15
        },
        input: {
            margin: 10,
            width: '95%'
        }
    }),
);

const listData = (query = {page: 0, pageSize: 8}) =>
    new Promise((resolve => {
        listPoints(query.page, query.pageSize).then(r => resolve({
            data: r.data.map(p => ({
                description: p.description,
                x: p.location.coordinates[0],
                y: p.location.coordinates[1],
                id: p._id
            })),
            page: query.page,
            totalCount: r.count
        }));
    }));

export default function App(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState("0");
    const [gettingNeighbours, setGettingNeighbours] = React.useState(false);
    const [searchData, setSearchData] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setGettingNeighbours(newValue === '1');
        setSearchData(null);
        updateTable();
    };

    const tableRef = React.createRef();
    console.log(tableRef);
    const updateTable = () => {
        if (tableRef.current) {
            console.log('update table');
            tableRef.current.dataManager.searchText = '';
            tableRef.current.onQueryChange({ page: 0, search: '' });
        }
    };

    const listNeighbours = query =>
        new Promise((resolve => {
            if (searchData)
                getNeighbours(searchData.point, searchData.radius)
                    .then(r => resolve({
                        data: r.map(p => ({
                            description: p.description,
                            x: p.location.coordinates[0],
                            y: p.location.coordinates[1],
                            id: p._id
                        })),
                        page: 0,
                        totalCount: r.length
                    }));
            else resolve({data: [], page: 0, totalCount: 0});
        }));

    function onGetNeighbours(x, y, radius) {
        if(!(checkFloatValidity(x) && checkFloatValidity(y) && checkFloatValidity(radius)))
            alert('Введены некорректные данные!');
        else
        // noinspection JSCheckFunctionSignatures
        {
            setSearchData({point: {x, y}, radius});
            updateTable();
        }
    }

    function tableData(query) {
        return gettingNeighbours ?
            listNeighbours(query) : listData(query);
    }

    function sendNewPoint(x, y, description) {
        if(!(checkFloatValidity(x) && checkFloatValidity(y)))
            alert('Введены некорректные координаты!');
        else
            savePoint({x, y, description})
                .then(r => updateTable());
    }

    function editPoint(x, y, description, id) {
        if(!(checkFloatValidity(x) && checkFloatValidity(y)))
            alert('Введены некорректные координаты!');
        else
            updatePoint({x, y, description, id})
                .then(r => updateTable());
    }

    return (<TabContext value={value}>
        <AppBar className={classes.bar} position="static">
            <h2 className={classes.h}>Соседние точки</h2>
            <TabList
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant="standard">
                <Tab value="0" label="Добавление объекта" />
                <Tab value="1" label="Получение соседей точки" />
            </TabList>
        </AppBar>

        <Container className={classes.root}>
            <TabPanel style={{width: "100%"}} value="0">
                <PointForm onUpdate={updateTable} onSave={sendNewPoint} />
            </TabPanel>
            <TabPanel style={{width: "100%"}} value="1">
                <GetNeighboursForm onGetNeighbours={onGetNeighbours} />
            </TabPanel>
            <Paper style={{width: "calc(100% - 50px)", padding: 25}}>
                <Typography>
                    X - Широта, находиться в отрезке от -90 до 90
                    <br/>
                    Y - Долгота, находиться в отрезке от -180 до 180
                </Typography>
            </Paper>
            <PointTable
                onUpdate={updateTable}
                updatePoint={editPoint}
                tableRef={tableRef}
                data={tableData} />
        </Container>

    </TabContext>);
}
