import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import PointTable from "./components/Table";
import './index.css'
import Button from "@material-ui/core/Button";
import { listPoints } from "./apiCalls";
import MaterialTable from "material-table";
import PointForm from "./components/PointForm";

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            //padding: '0 10',
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
            padding: '10px 50px',
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

const tableData = query =>
    new Promise((resolve => {
        listPoints(0, 5).then(r => resolve({
            data: r.map(p => ({
                description: p.description,
                x: p.location.coordinates[0],
                y: p.location.coordinates[1]
            })),
            page: 0,
            totalCount: 7
        }));
    }));

export default function App(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState("0");
    const handleChange = (event, newValue) =>
        setValue(newValue);


    const GetNeighboursForm = props => (<Paper className={classes.form}>
        <Typography>Get object's neighbours</Typography>
        <TextField className={classes.input} id="outlined-basic" label="X" variant="outlined" />
        <TextField className={classes.input} id="outlined-basic" label="Y" variant="outlined" />
        <Button variant='contained' color="primary">List</Button>
    </Paper>);

    return (<TabContext value={value}>
        <AppBar className={classes.bar} position="static">
            <h2 className={classes.h}>Neighbours test</h2>
            <TabList
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant="standard">
                <Tab value="0" label="Add point" />
                <Tab value="1" label="Get point's neighbours"/>
            </TabList>
        </AppBar>

        <Container className={classes.root}>
            <TabPanel style={{width: "100%"}} value="0"><PointForm /></TabPanel>
            <TabPanel style={{width: "100%"}} value="1"><GetNeighboursForm /></TabPanel>
            <PointTable
                data={tableData} />
        </Container>

    </TabContext>);
}
