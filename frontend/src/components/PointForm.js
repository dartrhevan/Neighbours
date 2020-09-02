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

export default function ({initData = {x: '', y: '', description: ''}, title = "Добавить новый объект", onSave, onClose = null}) {
    const classes = useStyles();
    const [x, setX] = React.useState(initData.x);
    const [y, setY] = React.useState(initData.y);
    const [description, setDescription] = React.useState(initData.description);

    function send() {
        onSave(x, y, description);
    }

    return <Paper className={classes.form}>
        <Typography>{title}</Typography>
        <TextField className={classes.input} onChange={e => setDescription(e.target.value)} value={description} id="outlined-basic" label="Описание" variant="outlined"/>
        <TextField className={classes.input} onChange={e => setX(e.target.value)} value={x} id="outlined-basic" label="X" variant="outlined"/>
        <TextField className={classes.input} onChange={e => setY(e.target.value)} value={y} id="outlined-basic" label="Y" variant="outlined"/>
        <Button className={classes.button} variant='contained' color="primary" onClick={send}>Сохранить</Button>
        {onClose && <Button className={classes.button} variant='contained' color="primary" onClick={onClose}>Отмена</Button>}
    </Paper>;
};
