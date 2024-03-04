import { useEffect, useState } from "react";
import { WINNING_COMBINATIONS } from "../constants";

const checkWinner = ({ board }) => {
  for (const combo of WINNING_COMBINATIONS) {
    if (
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      return board[combo[0]];
    }
  }
};

const checkDraw = ({ board }) => {
  return board.every((square) => square !== null);
};

const checkResult = ({ board }) => {
  const winner = checkWinner({ board });
  if (winner) return winner;
  if (checkDraw({ board })) return false;
  return null;
};

export function useResult({ board }) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (board.every((square) => square === null)) {
      setResult(null);
      return;
    }
    const newResult = checkResult({ board });
    if (newResult !== null) setResult(newResult);
  }, [board]);

  return { result };
}
