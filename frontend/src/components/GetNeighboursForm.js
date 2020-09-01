import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>
    createStyles({
        form: {
            padding: 15
        },
        input: {
            margin: 10,
            width: '95%'
        },
        button: {
            margin: 10
        }
    }),
);

export default function (props) {
    const classes = useStyles();
    const [x, setX] = React.useState('');
    const [y, setY] = React.useState('');
    const [radius, setRadius] = React.useState('');

    function onList(event) {
        props.onGetNeighbours(x, y, radius);
    }

    return <Paper className={classes.form}>
        <Typography>Get object's neighbours</Typography>
        <TextField value={x} onChange={e => setX(e.target.value)} className={classes.input}
                   id="outlined-basic" label="X" variant="outlined"/>
        <TextField value={y} onChange={e => setY(e.target.value)} className={classes.input}
                   id="outlined-basic" label="Y" variant="outlined"/>
        <TextField value={radius} onChange={e => setRadius(e.target.value)} className={classes.input}
                   id="outlined-basic" label="Radius" variant="outlined"/>
        <Button variant='contained' color="primary" onClick={onList}>List</Button>
    </Paper>;
};
