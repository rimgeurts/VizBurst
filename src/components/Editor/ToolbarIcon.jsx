import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Transforms } from "slate";
import { useEditor } from "slate-react";

export const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const useStyles = makeStyles(theme => ({
  icon: {
    color: "#4c4c4c",
    backgroundColor: "white",
    border: "1px solid #bfbfbf",
    borderRadius: "5px",
    display: "block",
    height: "30px",
    width: "30px",
    fontSize: "1em",
    //border: "1px solid white",
    //padding: "5px",
    textAlign: "center",
    //color: "white",
    //boxSizing: "content-box"
    margin: "2px"
  }
}));

const ToolbarIcon = ({icon}) => {
  const classes = useStyles();
  const editor = useEditor();
  return <Icon className={classes.icon}>{icon}</Icon>;
};

export default ToolbarIcon;
