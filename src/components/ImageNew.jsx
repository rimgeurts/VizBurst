import { css } from "emotion";
import React, { useEffect } from "react";
import { useFocused, useSelected } from "slate-react";
import Context from "../util/Context";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  parent: {
    backgroundColor: "lightgrey",
    position: "relative"
  },
  imageParent: {
    display: "block",

    backgroundColor: "royalblue"
  },
  resize: {
    cursor: 'ew-resize',
    backgroundColor: "royalblue",
    display: "block"
  }
}));

const ImageElement = ({ attributes, children, element }) => {
  const classes = useStyles();
  const { state, setState } = React.useContext(Context);
  const [isResizing, setIsResizing] = React.useState(false);
  const [imageWidth, setImageWidth] = React.useState(20);
  const [startLoc, setStartLoc] = React.useState();
  const [startLoc, setStartLoc] = React.useState();
  const selected = useSelected();
  const focused = useFocused();

  const handleMousemove = e => {
    // we don't want to do anything if we aren't resizing.
    if (!isResizing) {
      return;
    }
    console.log("currentLoc", e.clientX);
    console.log("startLoc", startLoc);
    console.log("width", e.clientX - startLoc);

    setImageWidth(e.clientX - startLoc)

  };

  const handleMouseDown = (e) => {
    setStartLoc(e.clientX)
    setIsResizing(true);
  };
  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const resize = () => {
    console.log("reziing: " + imageWidth);
    //setImageWidth(imageWidth + 10);
  };

  useEffect(() => {
    document.addEventListener("mousemove", e => handleMousemove);
    //document.addEventListener('mouseup', e => handleMouseup);
  }, []);

  return (
    <div {...attributes}>
      <div
        className={classes.parent}
        contentEditable={false}
        onMouseMove={handleMousemove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
        >
          <img
            onClick={resize}
            alt=""
            src={element.url}
            className={css`
              border: solid 1px;
              display: block;
              width: 200px;
              max-height: 20em;
              box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"};
            `}
          />
          <div
            className={classes.resize}
          >
            ...
          </div>
        </Grid>
      </div>

      {children}
    </div>
  );
};

export default ImageElement;
