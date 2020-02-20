import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import isHotkey from "is-hotkey";
import React, { useCallback, useMemo, useState } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import Context from "../../util/Context";
import BlockButton from "./BlockButton";
import Element from "./Element";
import InsertImageButton from "./ImageButton";
import Leaf from "./Leaf";
import MarkButton, { toggleMark } from "./MarkButton";
import { withImages } from "./WithImagesPlugin";

const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" }
    ]
  },
  {
    type: "paragraph",
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text "
      },
      { text: "bold", bold: true },
      {
        text:
          ", or add a semantically rendered block quote insertImage the middle of the page, like this:"
      }
    ]
  },
  {
    type: "image",
    width: "100%",
    url: "https://source.unsplash.com/kFrdX5IeQzI",
    children: [{ text: "" }]
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }]
  },
  {
    type: "paragraph",
    children: [{ text: "Try it out for yourself!" }]
  },
  {
    type: "image",
    width: "100%",
    url: "https://source.unsplash.com/kFrdX5IeQzI",
    children: [{ text: "" }]
  }
];

const useStyles = makeStyles(theme => ({
  slate: {
    marginLeft: "20px",
    marginRight: "20px"
  },
  paper: {
    backgroundColor: "white",
    marginTop: "90px",
    maxWidth: "800px",
    minHeight: "75%"
  },
  toolbar: {
    //backgroundColor: "grey"
    borderBottom: "1px solid lightgrey",
    marginLeft: "20px",
    marginRight: "20px"
  },
  container: {
    marginTop: "10px",
    marginBottom: "10px"
  }
}));

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code"
};

const Editor = () => {
  const classes = useStyles();
  const [value, setValue] = useState(initialValue);
  const { state, setState } = React.useContext(Context);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  );

  return (
    <Paper
      className={classes.paper}
    >
      <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <Toolbar variant="dense" className={classes.toolbar}>
          <Grid container className={classes.container}>
            <Grid item>
              <MarkButton format="code" icon="code" />
              <BlockButton format="heading-one" icon="looks_one" />
              <BlockButton format="heading-two" icon="looks_two" />
              <BlockButton format="block-quote" icon="format_quote" />
              <BlockButton format="numbered-list" icon="format_list_numbered" />
              <BlockButton format="bulleted-list" icon="format_list_bulleted" />
              <InsertImageButton />
            </Grid>
            <Grid item>
              <MarkButton format="bold" icon="format_bold" />
              <MarkButton format="italic" icon="format_italic" />
              <MarkButton format="underline" icon="format_underlined" />
              <BlockButton format="left-align" icon="format_align_left" />
              <BlockButton format="center-align" icon="format_align_center" />
              <BlockButton format="right-align" icon="format_align_right" />
            </Grid>
          </Grid>
        </Toolbar>

        <Editable
          className={classes.slate}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onKeyDown={event => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </Paper>
  );
};

export default Editor;
