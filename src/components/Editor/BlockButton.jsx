import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";
import ToolbarIcon from './ToolbarIcon'

const useStyles = makeStyles(theme => ({
  icon: {
    color: '#4c4c4c',
    backgroundColor: "white",
    border: "1px solid #bfbfbf",
    borderRadius: "5px", 
    display: "block",
    height: "30px",
    width: "30px",
    //fontSize: "15px",
    //border: "1px solid white",
   // padding: "5px",
    textAlign: "center",
    //color: "white",
    //boxSizing: "content-box"
    margin: "2px"
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
    <ToolbarIcon
      icon={icon}
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
    </ToolbarIcon>
  );
};

export default BlockButton;
