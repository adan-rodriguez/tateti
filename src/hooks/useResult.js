import { useEffect, useState } from "react";
import { PLAYERS, WINNING_COMBINATIONS } from "../constants";

const checkWinner = ({ board }) => {
  for (const combo of WINNING_COMBINATIONS) {
    if (
      board[combo[0]] !== null &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      const winnerPlayer = board[combo[0]];
      const color = winnerPlayer === PLAYERS.X ? "#9b3232" : "#d0d0d0";
      document
        .querySelectorAll(".square")
        .forEach((square) => (square.style.backgroundColor = "black"));
      document.querySelector(
        `.square[data-position="${combo[0]}"]`
      ).style.backgroundColor = color;
      document.querySelector(
        `.square[data-position="${combo[1]}"]`
      ).style.backgroundColor = color;
      document.querySelector(
        `.square[data-position="${combo[2]}"]`
      ).style.backgroundColor = color;
      return winnerPlayer;
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
    if (newResult !== null) {
      setResult(newResult);
      document.getElementById("winner-audio")?.play();
    }
  }, [board]);

  return { result };
}
