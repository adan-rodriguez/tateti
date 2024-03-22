import { useBoard } from "./hooks/useBoard";
import { useCurrentPlayer } from "./hooks/useCurrentPlayer";
import { PLAYERS } from "./constants";
import { useResult } from "./hooks/useResult";
import { RefreshIcon } from "./components/icons/RefreshIcon";
import { VolumeIcon } from "./components/icons/VolumeIcon";
import { VolumeOffIcon } from "./components/icons/VolumeOffIcon";
import { useSound } from "./hooks/useSound";
import { SwitchHorizontal } from "./components/icons/SwitchHorizontal";
import { useMemo, useRef } from "react";

export default function App() {
  const { currentPlayer, toogleCurrentPlayer, resetCurrentPlayer } =
    useCurrentPlayer();
  const { board, updateBoard, resetBoard } = useBoard({ currentPlayer });
  const { result } = useResult({ board });
  const { sound, updateSound } = useSound();
  const $movementSound = useRef();
  const $resetSound = useRef();

  const handleClick = ({ position }) => {
    if (board[position] || result !== null) return;
    updateBoard({ position });
    toogleCurrentPlayer();
    $movementSound.current?.play();
  };

  const reset = () => {
    resetBoard();
    resetCurrentPlayer();
    $resetSound.current?.play();
    document
      .querySelectorAll(".square")
      .forEach((square) => (square.style.backgroundColor = ""));
  };

  const checkStartGame = useMemo(
    () => board.some((square) => square !== null),
    [board]
  );

  return (
    <main>
      <section className="game">
        <section className="board">
          {board.map((square, index) => (
            <article
              onClick={() => handleClick({ position: index })}
              className="square"
              key={index}
              data-position={index}
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
          <button
            onClick={toogleCurrentPlayer}
            disabled={checkStartGame}
            className={`btn ${checkStartGame ? "disabled" : ""}`}
          >
            <SwitchHorizontal />
          </button>
          <article
            className={`player ${currentPlayer === PLAYERS.O ? "current" : ""}`}
          >
            {PLAYERS.O}
          </article>
        </section>
      </section>

      <section className="buttons">
        <button
          title="Nueva partida"
          onClick={reset}
          disabled={!checkStartGame}
          className={`btn ${!checkStartGame ? "disabled" : ""}`}
        >
          <RefreshIcon />
        </button>
        <button
          className="btn"
          onClick={updateSound}
          title={sound ? "Desactivar sonido" : "Activar sonido"}
        >
          {sound ? <VolumeIcon /> : <VolumeOffIcon />}
        </button>
      </section>

      {/* {result !== null && (
        <section className="result">
          <div>
            <p>
              {result === false ? (
                "Empate"
              ) : (
                <>
                  Ganó <div className="player">{result}</div>
                </>
              )}
            </p>
            <button title="Nueva partida" onClick={reset} className="btn">
              <RefreshIcon />
            </button>
          </div>
        </section>
      )} */}

      {sound && (
        <>
          <audio
            id="movement-audio"
            src="/movement.mp3"
            ref={$movementSound}
          ></audio>
          <audio id="winner-audio" src="/winner.mp3"></audio>
          <audio id="reset-audio" src="/reset.mp3" ref={$resetSound}></audio>
        </>
      )}
    </main>
  );
}
