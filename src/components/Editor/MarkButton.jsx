import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Editor } from "slate";
import { useSlate } from "slate-react";

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: "1em",
    //border: "1px solid white",
    //padding: "5px",
    textAlign: "center"
    //color: "white",
    //boxSizing: "content-box"
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
      <Button
        active={isMarkActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
      >
        <Icon className={classes.icon} fontSize="small">
          {icon}
        </Icon>
      </Button>
    );
  };

  export default MarkButton;