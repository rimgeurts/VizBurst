import { css } from "emotion";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import React, { useEffect, useCallback } from "react";
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
  const [width, setWidth] = React.useState(100);
  const [mouseOnImageToolBar, setMouseOnImageToolBar] = React.useState(false);
  const [location, setLocation] = React.useState({ x: 0, y: 0 });
  const [display, setDisplay] = React.useState("none");
  const selected = useSelected();
  const focused = useFocused();

  const onMouseDown = e => {
    setDisplay("block");
    setLocation({
      x: e.clientX - e.target.getBoundingClientRect().x,
      y: e.clientY - e.target.getBoundingClientRect().y
    });

    console.log(e.target.nodeName);
  };

  React.useEffect(() => {
    if (mouseOnImageToolBar) {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  }, [mouseOnImageToolBar]);

  const onMouseLeave = () => {
    setDisplay("none");
    console.log("Mouse LEft");
    setMouseOnImageToolBar(false);
  };

  const onMouseEnter = () => {
    setMouseOnImageToolBar(true);
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
      <div onMouseDown={onMouseDown} contentEditable={false}>
        <img
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
        on={onMouseLeave}
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
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={classes.root}
        >
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
