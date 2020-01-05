import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Card from "../components/Card";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "transparent",
    marginTop: "30px",
    marginBottom: "10px",
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div >
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={5}
      >
        <Grid className={classes.root} item xs={12} sm={6} md={3} xl={3}>
          <Card />
        </Grid>
        <Grid className={classes.root} item xs={12} sm={6} md={3} xl={3}>
          <Card />
        </Grid>
        <Grid className={classes.root} item xs={12} sm={6} md={3} xl={3}>
          <Card />
        </Grid>
        <Grid className={classes.root} item xs={12} sm={6} md={3} xl={3}>
          <Card />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
