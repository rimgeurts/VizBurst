import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";
import ToolbarIcon from './ToolbarIcon'
import Grid from "@material-ui/core/Grid";

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
    margin: "0px",
    '&:hover': {
      background: "#f7f7f7",
   },
  }
}));

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format
  });

  return !!match;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const BlockButton = ({ format, icon }) => {
  const classes = useStyles();
  const editor = useSlate();
  return (
    <Grid item>
    <Icon
      icon={icon}
      className={classes.icon}
      //active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
    {icon}
    </Icon>
    </Grid>
    
  );
};

export default BlockButton;
