import { useEffect, useState } from "react";
import "./App.css";

const PLAYERS = {
  X: "❌",
  O: "⚪",
};

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

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

export default function App() {
  const [board, setBoard] = useState(() => {
    const boardStorage = localStorage.getItem("board");
    return boardStorage ? JSON.parse(boardStorage) : Array(9).fill(null);
  });

  const [currentPlayer, setCurrentPlayer] = useState(() => {
    const currentPlayerStorage = localStorage.getItem("currentPlayer");
    return currentPlayerStorage ?? PLAYERS.X;
  });

  const [result, setResult] = useState(null);

  const updateBoard = ({ board, position, currentPlayer }) => {
    const newBoard = [...board];
    newBoard[position] = currentPlayer;
    setBoard(newBoard);
  };

  const updateCurrentPlayer = ({ currentPlayer, PLAYERS }) => {
    const newCurrentPlayer =
      currentPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
    setCurrentPlayer(newCurrentPlayer);
  };

  const handleClick = ({ board, position, currentPlayer, result }) => {
    if (board[position] || result !== null) return;
    updateBoard({ board, position, currentPlayer });
    updateCurrentPlayer({ currentPlayer, PLAYERS });
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(PLAYERS.X);
    setResult(null);
  };

  useEffect(() => {
    const newResult = checkResult({ board });
    if (newResult !== null) setResult(newResult);
  }, [board]);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  }, [board]);

  useEffect(() => {
    localStorage.setItem("currentPlayer", currentPlayer);
  }, [currentPlayer]);

  return (
    <main>
      <section className="board">
        {board.map((square, index) => (
          <article
            onClick={() =>
              handleClick({ board, position: index, currentPlayer, result })
            }
            className="square"
            key={index}
          >
            {square}
          </article>
        ))}
      </section>
      <section className="players">
        <article
          className={`player ${currentPlayer === PLAYERS.X ? "current" : ""}`}
        >
          {PLAYERS.X}
        </article>
        <article
          className={`player ${currentPlayer === PLAYERS.O ? "current" : ""}`}
        >
          {PLAYERS.O}
        </article>
        <button title="Nueva partida" onClick={reset} className="reset-btn">
          🆕
        </button>
      </section>

      {result !== null && (
        <section className="result">
          <div>
            <p>
              {result === false ? (
                "Empate"
              ) : (
                <>
                  Ganó <span>{result}</span>
                </>
              )}
            </p>
            <button onClick={reset} className="reset-btn">
              🆕
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
