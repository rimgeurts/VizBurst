import { css } from "emotion";
import React, { useEffect, useCallback } from "react";
import { useFocused, useSelected } from "slate-react";
import Context from "../../util/Context";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  parent: {
    backgroundColor: "lightgrey",
    display: 'block',
    position: "relative"
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
  const [isResizing, setIsResizing] = React.useState(false);
  const [width, setWidth] = React.useState(50)
  const [location, setLocation] = React.useState({ x: 0, y: 0 });
  const [height, setHeight] = React.useState(0);
  const selected = useSelected();
  const focused = useFocused();

  const onMouseDown = e => {
    if (e.target.nodeName === "IMG") {
      setLocation({
        x: e.clientX - e.target.getBoundingClientRect().x,
        y: e.clientY - e.target.getBoundingClientRect().y
      });
    }
    console.log(e.target.nodeName);
  };

 
  return (
    <div {...attributes} className={classes.parent}>
      <div onMouseDown={onMouseDown} contentEditable={false}>
        <img
          alt=""
          src={element.url}
          className={css`
            border: solid 1px;
            display: block;

            width: ${width}%;
            max-height: 20em;
            box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"};
          `}
        />
      </div>
      <div
        className={css`
          padding: 2px;
          position: absolute;
          overflow: hidden;
          border-radius: 5px;
          top: ${location.y}px;
          left: ${location.x}px;
          background-color: white;
        `}
      >
        <button onClick={()=>{setWidth(100)}}>100%</button>
        <button onClick={()=>{setWidth(75)}}>75%</button>
        <button onClick={()=>{setWidth(50)}}>50%</button>
        <button onClick={()=>{setWidth(25)}}>25%</button>
      </div>
      {children}
    </div>
  );
};

export default ImageElement;
