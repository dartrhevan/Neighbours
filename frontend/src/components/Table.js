import React from 'react'
import MaterialTable, { Column } from 'material-table';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Info, Edit, Delete } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const tableColumns = [
    {
        title: 'Описание',
        field: "description",
        defaultSort: 'asc'
    },
    {
        title: 'X',
        field: "x",
        sorting: false,
    },
    {
        title: 'Y',
        field: "y",
        sorting: false,
    }
];

const tableActions = [
    {
        icon: () => <Edit/>,
        onClick: (event, objectData) => {
        },
        tooltip: 'Редактировать объект',
    },
    {
        icon: () => <Delete/>,
        onClick: (event, objectData) => {
        },
        tooltip: 'Удалить объект',
    },
];

const tableData = query =>
    new Promise((resolve => {
        /*getTimeZones({query, objectGuid, filters})
            .then((response) => {
                resolve({
                    data: response.data,
                    page: parseInt(response.headers['x-current-page'], 10) - 1,
                    totalCount: parseInt(response.headers['x-total-count'], 10),
                });
            })
            .catch(() => {
                resolve({
                    data: [],
                    page: 0,
                    totalCount: 0,
                });
            });*/
        resolve({
            data: [
                {
                    description: "fewwf",
                    x: 5,
                    y: 4
                }
            ],
            page: 0,
            totalCount: 7
        });
    }));

const useStyles = makeStyles(theme =>
    createStyles({
        tableTitle: {}
    }),
);

export default function PointTable(props) {
    const classes = useStyles();
    const tableRef = React.createRef();
    return (<MaterialTable
        ref={tableRef}
        title={
            <Typography
                variant="h6"
                gutterBottom
                className={classes.tableTitle}>
                Объекты и координаты
            </Typography>
        }
        columns={tableColumns}
        actions={tableActions}
        data={tableData}
        options={{
            search: true,
            debounceInterval: 500,
            pageSize: tableRef.current
                ? tableRef.current.state.pageSize
                : 8,
        }}
        style={{width: '100%'}}>

    </MaterialTable>);
}
