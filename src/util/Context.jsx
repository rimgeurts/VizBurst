import React from "react";

const Context = React.createContext({
  xLoc: 0,
  yLoc: 0,
  isDragging: false,
});

export default Context;
