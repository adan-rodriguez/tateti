import "./App.css";
import { useBoard } from "./hooks/useBoard";
import { useCurrentPlayer } from "./hooks/useCurrentPlayer";
import { PLAYERS } from "./constants";
import { useResult } from "./hooks/useResult";

export default function App() {
  const { currentPlayer, updateCurrentPlayer, resetCurrentPlayer } =
    useCurrentPlayer();
  const { board, updateBoard, resetBoard } = useBoard({ currentPlayer });
  const { result } = useResult({ board });

  const handleClick = ({ position }) => {
    if (board[position] || result !== null) return;
    updateBoard({ position });
    updateCurrentPlayer();
  };

  const reset = () => {
    resetBoard();
    resetCurrentPlayer();
  };

  return (
    <main>
      <section className="board">
        {board.map((square, index) => (
          <article
            onClick={() => handleClick({ position: index })}
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
            <button title="Nueva partida" onClick={reset} className="reset-btn">
              🆕
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
