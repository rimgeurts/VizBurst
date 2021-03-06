import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import imageExtensions from "image-extensions";
import isHotkey from "is-hotkey";
import isUrl from "is-url";
import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Transforms } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, useEditor, withReact } from "slate-react";
import Context from "../../util/Context";
import BlockButton from "./BlockButton";
import Element from "./Element";
import Leaf from "./Leaf";
import MarkButton, { toggleMark } from "./MarkButton";
import ToolbarIcon from "./ToolbarIcon";

export const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const useStyles = makeStyles(theme => ({
  icon: {
    color: "#4c4c4c",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "30px",
    width: "30px",
    fontSize: "1em",
    //border: "1px solid white",
    //padding: "5px",
    textAlign: "center",
    //color: "white",
    //boxSizing: "content-box"
    margin: "2px",
    '&:hover': {
      background: "#f7f7f7",
   },
  }
}));

const InsertImageButton = () => {
  const classes = useStyles();
  const editor = useEditor();
  return (
    <Icon
      className={classes.icon}
      onMouseDown={event => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image:");
        if (!url) return;
        insertImage(editor, url);
      }}
    >
      image
    </Icon>
  );
};

export default InsertImageButton;
