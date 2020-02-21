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
}));

const InsertImageButton = () => {
  const classes = useStyles();
  const editor = useEditor();
  return (
    <ToolbarIcon
      icon="image"
      onMouseDown={event => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image:");
        if (!url) return;
        insertImage(editor, url);
      }}
    >
      image
    </ToolbarIcon>
  );
};

export default InsertImageButton;
