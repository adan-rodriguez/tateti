import { useEffect, useState } from "react";

export function useBoard({ currentPlayer }) {
  const [board, setBoard] = useState(() => {
    const boardStorage = localStorage.getItem("board");
    return boardStorage ? JSON.parse(boardStorage) : Array(9).fill(null);
  });

  const updateBoard = ({ position }) => {
    const newBoard = [...board];
    newBoard[position] = currentPlayer;
    setBoard(newBoard);
  };

  const resetBoard = () => setBoard(Array(9).fill(null));

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  }, [board]);

  return { board, updateBoard, resetBoard };
}
