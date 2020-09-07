import React from "react";
export default function Square(props) {
  const className = "square" + (props.highlight ? " highlight" : "");
  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}
