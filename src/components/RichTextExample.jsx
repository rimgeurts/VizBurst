import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import isHotkey from "is-hotkey";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { createEditor, Editor, Transforms } from "slate";
import { withHistory } from "slate-history";
import imageExtensions from "image-extensions";
import Context from "../util/Context";
import isUrl from "is-url";
import { Resizable, ResizableBox } from 'react-resizable';
import ImageElement from './ImageNew'

import {
  Slate,
  useSlate,
  Editable,
  useEditor,
  useSelected,
  useFocused,
  withReact
} from "slate-react";
import { css } from "emotion";

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
  icon: {
    fontSize: "1em",
    //border: "1px solid white",
    //padding: "5px",
    textAlign: "center"
    //color: "white",
    //boxSizing: "content-box"
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

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const RichTextExample = () => {
  const classes = useStyles();
  const [value, setValue] = useState(initialValue);
  const { state, setState } = React.useContext(Context);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  );

  const resize = () => {
    setState(prevState => {
      return {
        width: prevState.width + 10
      };
    });
  };

  return (
    <Paper className={classes.paper}>
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
              <Button
                onClick={() => {
                  resize();
                }}
              >
                {" "}
                Resize{" "}
              </Button>
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

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = props => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "center-align":
      return (
        <div align="center" {...attributes}>
          {children}
        </div>
      );
    case "left-align":
      return (
        <div align="left" {...attributes}>
          {children}
        </div>
      );
    case "right-align":
      return (
        <div align="right" {...attributes}>
          {children}
        </div>
      );
    case "image":
      return <ImageElement {...props} />;

    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const classes = useStyles();
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon className={classes.icon} fontSize="small">
        {icon}
      </Icon>
    </Button>
  );
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

export const withImages = editor => {
  const { insertData, isVoid } = editor;

  editor.isVoid = element => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = data => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");
        console.log("image is: ", file);
        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      console.log("tets");
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = { type: "images", url, children: [text] };
  Transforms.insertNodes(editor, image);
};


const isImageUrl = url => {
  console.log("test");
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};

const InsertImageButton = () => {
  const editor = useEditor();
  return (
    <Button
      onMouseDown={event => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image:");
        if (!url) return;
        insertImage(editor, url);
      }}
    >
      <Icon>image</Icon>
    </Button>
  );
};

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
  },
];

export default RichTextExample;
