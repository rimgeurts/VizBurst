import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "transparent",
    marginTop: "90px",
    flexGrow: 1
  },
  base: {
    //marginLeft:'20px',
    borderRadius: "6px",
    backgroundColor: "transparent"
  },
  card: {
    background: "white",
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
    borderRadius: "6px",
    width: "90%",
    paddingRight: "30px",
    paddingLeft: "30px",
    textAlign: "right"
    //float: "left",
  },
  iconcard: {
    background: "linear-gradient(60deg, #ffa726, #fb8c00)",
    boxShadow:
      "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(255, 152, 0,.4)",
    borderRadius: "6px",
    color: "#fff",
    marginTop: "-20px",
    marginLeft: "30px",
    padding: "20px",
    textAlign: "center",
    float: "left"
  },

  icon: {
    fontSize: "35px"
  },
  infoValue: {
    margin: '0',
    paddingTop: '5px',
    paddingBottom: '20px',
    color: '#3C4858',
    fontSize: '1.5em',
  },
  infoHeader: {
    paddingTop: '10px', 
  },
  infoBottom: {
    paddingTop: '10px', 
    paddingBottom: '10px', 
  }
}));

export default function Card() {
  const classes = useStyles();

  return (
    <div className={classes.base}>
      <div className={classes.iconcard}>
        <ScheduleIcon className={classes.icon}> </ScheduleIcon>
      </div>
      <div className={classes.card}>
        <div className={classes.infoHeader}>Data Usages</div>
        <p className={classes.infoValue}>49/50 GB</p>
        <Divider />
        <div className={classes.infoBottom}  >Data Usage</div>
      </div>
    </div>
  );
}
