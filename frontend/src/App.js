import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import ActionChoice from "./components/ActionChoice";
import './index.css'
import PointTable from './components/Table'

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        content: {
            padding: theme.spacing(4),
        },
        field: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        button: {
            margin: theme.spacing(2),
        }
    }),
);

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <ActionChoice />
        <PointTable />
    </div>
  );
}

export default App;
