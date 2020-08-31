import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>
    createStyles({
        bar: {
            flex: 1,
            flexDirection: "row"
        },
        h: {
            padding: '10px 50px',
            margin: 0
        }
    }),
);

export default function ActionChoice(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState("0");
    const handleChange = (event, newValue) =>
        setValue(newValue);

    return (
            <TabContext value={value}>
                <AppBar className={classes.bar} position="static">
                    <h2 className={classes.h}>Neighbours test</h2>
                    <TabList
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="standard">
                        <Tab value="0" label="Login" />
                        <Tab value="1" label="Register"/>
                    </TabList>
                </AppBar>

                <TabPanel value="0">Add point</TabPanel>
                <TabPanel value="1">Get neighbours</TabPanel>

            </TabContext>
    )
}
