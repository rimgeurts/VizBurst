import React from "react";
import ImageElement from './ImageElement';


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

export default Element;