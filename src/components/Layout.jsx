import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeftOutlined";
import ChevronRightIcon from "@material-ui/icons/ChevronRightOutlined";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/MailOutlined";
import Background from "../background.jpg";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },

  divider: {
    backgroundColor: "rgba(255,255,255,.4)",
    marginLeft: "10px",
    marginRight: "10px"
  },
  background: {
    height: "100vh",
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    opacity: "1"
  },
  appBar: {
    background:
      "linear-gradient(90deg, rgba(33,33,33,1) 18%, rgba(0,0,0,0.42351466049382713) 99%)",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    marginLeft: '0px',
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },

  drawerOpen: {
    height: "100%",
    backdropFilter: "blur(20px)",
    background:
      "radial-gradient(circle, rgba(0,0,0,.35) 0%, rgba(0,0,0,.45) 100%)",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    height: "100%",
    backdropFilter: "blur(20px)",
    background:
      "radial-gradient(circle, rgba(0,0,0,.35) 0%, rgba(0,0,0,.45) 100%)",

    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(6) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8) + 1
    }
  },
  toolbar: {
    //  background:
    //    "radial-gradient(circle, rgba(35,37,38,.1) 0%, rgba(30,31,32,.1) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  space: {
    marginTop: "50px",
    padding: theme.spacing(0, 1)
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "100vh"
  },

  listitemOpen: {
    // backgroundColor: 'rgba(18,19,19,0.45)',
    border: "0px",
    borderRadius: "3px",
    display: "flex",
    alignItems: 'center',
    width: "100%",
    paddingLeft: ".5em",
    height: "3em",
    marginLeft: "30px",
    marginRight: "20px",
    marginBottom: '10px',
    transition: ".25s",

    // marginRight: '15px',
    "&:hover": {
      
      backgroundColor: "rgba(255,255,255,.2)"
    },
  },

  listitemClosed: {
    border: "0px",
    borderRadius: "3px",
    display: "flex",
    alignItems: 'center',
    width: "60%",
    paddingLeft: ".5em",
    height: "3em",
    marginLeft: "10px",
    marginRight: "10px",
    marginBottom: '10px',
    transition: ".25s",

    // marginRight: '15px',
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "rgba(255,255,255,.2)"
    },
  },

  listitemprofileOpen: {
    backgroundColor: "rgba(0,172,193, 1)",
    boxShadow:
      "0 12px 20px -10px rgba(0,172,193,.28), 0 4px 20px 0 rgba(0,172,193,.12), 0 7px 8px -5px rgba(0,172,193,.2)",
    //background-color: #00acc1;
    //border: "1px solid rgba(255,255,255,.1)",
    borderRadius: "3px",
    display: "flex",
    alignItems: 'center',
    width: "100%",
    paddingLeft: ".5em",
    height: "3em",
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    transition: ".3s",

    // marginRight: '15px',
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "rgba(0,172,193,.9)"
    },
    "&:focus": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "rgba(50,50,50,1)"
    }
  },

  listitemprofileClosed: {
    backgroundColor: "rgba(0,0,0,0)",
    //background-color: #00acc1;
    //border: "1px solid rgba(255,255,255,.1)",
    borderRadius: "3px",
    display: "flex",
    alignItems: 'center',
    width: "60%",
    paddingLeft: ".5em",
    height: "3em",
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    transition: ".3s",

    // marginRight: '15px',
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "rgba(0,172,193,.9)"
    },
    "&:focus": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "rgba(50,50,50,1)"
    }
  },
  link: {
    textDecoration: "none"
  }
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.background}>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          open={open}
        >
          <div className={classes.toolbar}>
          <IconButton
              style={{ color: "white" }}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
            <img
              style={{
                position: "absolute",
                top: "-25px",
                left: "40px",
                width: "50%",
                height: "auto"
              }}
              src={require("../logo.png")}
              alt="dsds"
            />
            <IconButton style={{ color: "white" }} onClick={handleDrawerClose}>
              {!open  ? (
                <MenuIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>

          <List>
            <ListItem style={{ padding: "0px", backgroundColor: 'transparent'  }} button>
              <div
                className={clsx({
                  [classes.listitemprofileOpen]: open,
                  [classes.listitemprofileClosed]: !open
                })}
              >
                <ListItemIcon style={{ color: "white" }}>
                  <AccountCircleRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  style={{
                    color: "white"
                  }}
                >
                  Rim Geurts
                </ListItemText>
              </div>
            </ListItem>
          </List>
          <Divider className={classes.divider} />
          <List>
            {["Dashboard", "Schedules", "Templates", "Mailing Lists"].map(
              (text, index) => (
                <Link
                  style={{ textDecoration: "none", color: 'none' }}
                  to={`/${text.toLowerCase()}`}
                >
                  <ListItem style={{ padding: "0px", backgroundColor: 'transparent'  }} button key={text}>
                    <div
                      className={clsx({
                        [classes.listitemOpen]: open,
                        [classes.listitemClosed]: !open
                      })}
                    >
                      <ListItemIcon style={{ color: "white" }}>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText
                        style={{
                          color: "white"
                        }}
                        primary={text}
                      />
                    </div>
                  </ListItem>
                </Link>
              )
            )}
          </List>
          <Divider className={classes.divider} />
          <List>
            {["Settings", "Trash", "Spam"].map((text, index) => (
              <ListItem style={{ padding: "0px" }} button key={text}>
                <div
                  className={clsx({
                    [classes.listitemOpen]: open,
                    [classes.listitemClosed]: !open
                  })}
                >
                  <ListItemIcon style={{ color: "white" }}>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText style={{ color: "white" }} primary={text} />
                </div>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
      <main className={classes.content}>
        <div className={classes.space} />
        {props.children}
      </main>
    </div>
  );
}
