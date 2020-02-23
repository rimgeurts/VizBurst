import React from "react";
import styled from "@emotion/styled";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const Container = styled.div`
  cursor: pointer;
  display: inline-flex;
  width: 100px;
  flex-direction: column;
  align-items: left;
`;

const Button = styled.div`
  height: 30px;
  display: inline-flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
  padding: 5px;
  padding-left: 10px;
  &:hover {
      background-color: #f7f7f7;
    }
`;
const List = styled.div`
  display: flex;
  background-color: white;
  position: absolute;
  margin-top: 27px;
  width: 170px;
  z-index: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid #bfbfbf;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 6px 17px 18px -4px rgba(0, 0, 0, 0.39);
  padding: 5px;
`;

const Item = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  &:hover {
      background-color: #f7f7f7;
    }
`;

const StyleButton = () => {
  const [listOpen, setListOpen] = React.useState(false);
  const [style, setStyle] = React.useState([
    { name: "Header 1", code: <h1>Header 1</h1> },
    { name: "Header 2", code: <h2>Header 2</h2> },
    { name: "Normal", code: <p>Normal</p> }
  ]);
  const [selelectedStyle, setSelectedStyle] = React.useState("Normal");
  const listRef = React.useRef();

  const onClick = () => {
    setListOpen(prevState => !prevState);
    document.addEventListener("mousedown", onClickOutside);
  };

  const onSelect = value => {
    setSelectedStyle(value.name);
    setListOpen(false);
    document.removeEventListener("mousedown", onClickOutside);
  };

  const onClickOutside = e => {
    if (listRef.current) {
      if (!listRef.current.contains(e.target)) {
        console.log("TARGET", e.target);
        console.log("REF", listRef);
        setListOpen(false);
        document.removeEventListener("mousedown", onClickOutside);
      }
    }
  };

  return (
    <Container>
      <Button onClick={onClick}>
        <div>{selelectedStyle}</div>
        <ArrowDropDownIcon />
      </Button>
      {listOpen ? (
        <List ref={listRef}>
          {style.map((value, index) => {
            return (
              <Item key={index} onClick={() => onSelect(value)}>
                {value.code}
              </Item>
            );
          })}
        </List>
      ) : (
        undefined
      )}
    </Container>
  );
};

export default StyleButton;
