import { css } from "emotion";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import React, { useEffect, useCallback, useRef } from "react";
import { useFocused, useSelected } from "slate-react";
import Context from "../../util/Context";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  parent: {
    //backgroundColor: "lightgrey",
    display: "block",
    position: "relative",
    width: "100%",
    margin: "0px",
    padding: "0px"
  },
  toolbar: {
    position: "absolute",
    bottom: "0px",
    left: "0px"
  }
}));

const ImageElement = ({ attributes, children, element }) => {
  const classes = useStyles();
  const { state, setState } = React.useContext(Context);
  const [width, setWidth] = React.useState(75);
  const [mouseOnImageToolBar, setMouseOnImageToolBar] = React.useState(false);
  const [location, setLocation] = React.useState({ x: 0, y: 0 });
  const [display, setDisplay] = React.useState("none");
  const selected = useSelected();
  const focused = useFocused();
  const imageRef = useRef();
  const imageToolbarRef = useRef();

  const onClickOutside = e => {
    e.preventDefault();
    console.log("imageToolbarRef", imageToolbarRef);
    console.log("target", e.target);
    console.log("MATCH", imageToolbarRef.current.contains(e.target));
    if (
      !imageRef.current.contains(e.target) &&
      !imageToolbarRef.current.contains(e.target)
    ) {
      setDisplay("none");
     document.removeEventListener("mousedown", onClickOutside);
    }
  };

  const onClickInside = e => {
    e.preventDefault();
    console.log("Clicked Inside on ImageRef: ", imageRef.current);
    document.addEventListener("mousedown", onClickOutside);

    setDisplay("block");
    setLocation({
      x: e.clientX - e.target.getBoundingClientRect().x,
      y: e.clientY - e.target.getBoundingClientRect().y
    });

    //
  };

  const button = css`
    background-color: black;
    color: white;
    &:hover {
      background-color: #333333;
    }
  `;
  return (
    <div {...attributes} className={classes.parent}>
      <div contentEditable={false}>
        <img
          ref={imageRef}
          onClick={onClickInside}
          alt=""
          src={element.url}
          className={css`
            border: solid 1px black;
            display: block;
            width: ${width}%;
            max-height: 20em;
            box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"};
          `}
        />
      </div>

      <div
        ref={imageToolbarRef}
        className={css`
          display: ${display};
          padding: 0px;
          margin: 0px;
          position: absolute;
          overflow: hidden;
          border-radius: 5px;
          top: ${location.y}px;
          left: ${location.x}px;
        `}
      >
        <div className={classes.root}>
          <ButtonGroup
            variant="contained"
            aria-label="contained primary button group"
          >
            <Button
              className={button}
              onClick={() => {
                setWidth(25);
              }}
            >
              25%
            </Button>
            <Button
              className={button}
              onClick={() => {
                setWidth(50);
              }}
            >
              50%
            </Button>
            <Button
              className={button}
              onClick={() => {
                setWidth(75);
              }}
            >
              75%
            </Button>
            <Button
              className={button}
              onClick={() => {
                setWidth(100);
              }}
            >
              100%
            </Button>
          </ButtonGroup>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ImageElement;
