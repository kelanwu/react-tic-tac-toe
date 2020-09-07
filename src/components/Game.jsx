import React, { useState } from "react";
import { calculateWinner } from "./helper";
import Board from "./Board";
import "../index.css";
const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setNext] = useState(true);
  const [isAscending, setIsAscending] = useState(0);

  const handleClick = i => {
    setHistory(() => history.slice(0, stepNumber + 1));
    let current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(() =>
      history.concat([
        {
          squares: squares,
          latestMoveSquare: i,
        },
      ])
    );
    setStepNumber(history.length);
    setNext(!xIsNext);
  };
  const jumpTo = step => {
    setStepNumber(step);
    setNext(step % 2 === 0);
  };

  const handleSortToggle = () => {
    setIsAscending(() => !isAscending);
  };

  const current = history[stepNumber];
  const winInfo = calculateWinner(current.squares);
  const winner = winInfo.winner;

  let moves = history.map((step, move) => {
    const latestMoveSquare = step.latestMoveSquare;
    const col = 1 + (latestMoveSquare % 3);
    const row = 1 + Math.floor(latestMoveSquare / 3);
    const desc = move
      ? `Go to move #${move} (${col}, ${row})`
      : "Go to game start";
    return (
      <li key={move}>
        {/* Bold the currently selected item */}
        <button
          className={move === stepNumber ? "move-list-item-selected" : ""}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    if (winInfo.isDraw) {
      status = "Draw";
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  }

  if (!isAscending) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => handleClick(i)}
          winLine={winInfo.line}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={() => handleSortToggle()}>
          {isAscending ? "descending" : "ascending"}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
