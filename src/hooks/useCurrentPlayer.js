import { useEffect, useState } from "react";
import { PLAYERS } from "../constants";

const INITIAL_PLAYER = PLAYERS.X;

export function useCurrentPlayer() {
  const [currentPlayer, setCurrentPlayer] = useState(() => {
    const currentPlayerStorage = localStorage.getItem("currentPlayer");
    return currentPlayerStorage ?? INITIAL_PLAYER;
  });

  const toogleCurrentPlayer = () => {
    const newCurrentPlayer =
      currentPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
    setCurrentPlayer(newCurrentPlayer);
  };

  const resetCurrentPlayer = () => setCurrentPlayer(INITIAL_PLAYER);

  useEffect(() => {
    localStorage.setItem("currentPlayer", currentPlayer);
  }, [currentPlayer]);

  return { currentPlayer, toogleCurrentPlayer, resetCurrentPlayer };
}
