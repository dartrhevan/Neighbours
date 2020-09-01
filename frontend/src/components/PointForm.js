import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { savePoint, updatePoint } from "../apiCalls";


const useStyles = makeStyles(theme =>
    createStyles({
        form: {
            padding: 15
        },
        input: {
            margin: 10,
            width: '95%'
        }
    }),
);

function checkFloatValidity(float) {
    return /^\d+[.]\d+$/.test(float) || /^\d+$/.test(float);
}

export default function ({initX = '', initY = '', initDesc = '', onUpdate}) {
    const classes = useStyles();
    const [x, setX] = React.useState(initX);
    const [y, setY] = React.useState(initY);
    const [description, setDescription] = React.useState(initDesc);

    function send() {
        if(!(checkFloatValidity(x) && checkFloatValidity(y)))
            alert('Incorrect coordinates');
        else
            savePoint({x, y, description})
                .then(r => onUpdate());
    }

    return <Paper className={classes.form}>
        <Typography>Add new object</Typography>
        <TextField className={classes.input} onChange={e => setDescription(e.target.value)} value={description} id="outlined-basic" label="Description" variant="outlined"/>
        <TextField className={classes.input} onChange={e => setX(e.target.value)} value={x} id="outlined-basic" label="X" variant="outlined"/>
        <TextField className={classes.input} onChange={e => setY(e.target.value)} value={y} id="outlined-basic" label="Y" variant="outlined"/>
        <Button variant='contained' color="primary" onClick={send}>Save</Button>
    </Paper>;
};