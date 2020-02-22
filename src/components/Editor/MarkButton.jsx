import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Editor } from "slate";
import { useSlate } from "slate-react";
import ToolbarIcon from "./ToolbarIcon";

const useStyles = makeStyles(theme => ({
  icon: {
    color: "#4c4c4c",
    backgroundColor: "white",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: "30px",
    width: "30px",
    fontSize: "1.1em",
    //border: "1px solid white",
    //padding: "5px",
    textAlign: "center",
    //color: "white",
    //boxSizing: "content-box"
    margin: "2px"
  }
}));

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const MarkButton = ({ format, icon }) => {
  const classes = useStyles();
  const editor = useSlate();
  return (
    <Icon
      className={classes.icon}
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Icon>
  );
};

export default MarkButton;
