import React from 'react'
import MaterialTable, { Column } from 'material-table';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {
    Info,
    Edit,
    Delete,
    FirstPage,
    LastPage,
    KeyboardArrowRight,
    KeyboardArrowLeft,
    Search, Clear, Check, ArrowDownward, Close
} from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { deletePoint, listPoints } from "../apiCalls";

const innerProps = {
    localization: {
        pagination: {
            labelDisplayedRows: '{from}-{to} из {count}',
            labelRowsPerPage: 'Строк на странице',
            labelRowsSelect: 'строк',
            firstAriaLabel: 'Первая страница',
            firstTooltip: 'Первая страница',
            previousAriaLabel: 'Предыдущая страница',
            previousTooltip: 'Предыдущая страница',
            nextAriaLabel: 'Следующая страница',
            nextTooltip: 'Следующая страница',
            lastAriaLabel: 'Последняя страница',
            lastTooltip: 'Последняя страница',
        },
        header: {
            actions: '',
        },
        body: {
            editTooltip: 'Редактировать',
            emptyDataSourceMessage: 'Нет записей',
            filterRow: {
                filterTooltip: 'Фильтр',
            },
            editRow: {
                deleteText: 'Вы действительно хотите удалить эту запись?',
                cancelTooltip: 'Отмена',
                saveTooltip: 'Подтверждение',
            },
            deleteTooltip: 'Удалить запись',
        },/*
        toolbar: {
            searchTooltip: 'Поиск',
            searchPlaceholder: 'Поиск',
        },*/
    },
    options: {
        pageSize: 8,
        pageSizeOptions: [8, 16, 25],
        search: false,
        debounceInterval: 500,
        toolbarButtonAlignment: 'right',
        draggable: false,
    },
    icons: {
        FirstPage,
        LastPage,
        NextPage: KeyboardArrowRight,
        PreviousPage: KeyboardArrowLeft,
        Search,
        Filter: Search,
        Delete,
        Clear,
        Check,
        SortArrow: ArrowDownward,
        ResetSearch: Close,
        Edit,
    },
};

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


const useStyles = makeStyles(theme =>
    createStyles({
        tableTitle: {}
    }));


export default function PointTable(props) {
    const classes = useStyles();
    console.log(props);
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
                console.log(objectData);
                deletePoint(objectData.id)
                    .then(r => props.onUpdate())
            },
            tooltip: 'Удалить объект',
        },
    ];
    const tableRef = props.tableRef;// React.createRef();
    return (<MaterialTable
    {...innerProps}
    {...props}
    ref={tableRef}
    title={<Typography
            variant="h6"
            gutterBottom
            className={classes.tableTitle}>
            Объекты и координаты
        </Typography>}
    columns={tableColumns}
    actions={tableActions}
    options={{
        search: false,
        filtering: false,
        debounceInterval: 500,
        actionsColumnIndex: -1,
        pageSize: tableRef.current
            ? tableRef.current.state.pageSize
            : 8
    }}
    style={{ width: '100%', margin: 15 }} />);
}
