/* eslint-disable react/prop-types */
import React from "react";
import Square from "./Square";
import "../index.css";

const Board = props => {
  const renderSquare = i => {
    const winLine = props.winLine;
    return (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        highlight={winLine && winLine.includes(i)}
      />
    );
  };

  // Use two loops to make the squares
  const boardSize = 3;
  const squares = [];
  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      row.push(renderSquare(i * boardSize + j));
    }
    squares.push(
      <div key={i} className="board-row">
        {row}
      </div>
    );
  }
  return <div>{squares}</div>;
};

export default Board;
