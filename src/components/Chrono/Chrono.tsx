import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function Chrono() {
  const [edition, setEdition] = useState(false);
  const [base, setBase] = useState(25);
  const [decrement, setDecrement] = useState(25 * 60);
  const [tempo, setTempo] = useState(0);

  useEffect(() => {
    if (decrement === 0) {
      clearInterval(tempo);
    }
  }, [decrement]);

  function start() {
    setTempo(
      setInterval(() => {
        setDecrement((secondes) => secondes - 1);
      }, 100)
    );

    return () => {
      clearInterval(tempo);
    };
  }

  function breakTempo() {
    clearInterval(tempo);
    setTempo(0);
  }

  function reset() {
    breakTempo();
    setDecrement(() => base * 60);
  }

  function beautifyData() {
    function _zerofy(n: number) {
      return n < 10 ? "0" + n : n;
    }

    const minutes = Math.trunc(decrement / 60);
    const secondes = decrement % 60;

    return `${_zerofy(minutes)}:${_zerofy(secondes)}`;
  }

  function handleSubmitChangeBase(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setEdition(false);
      setDecrement(() => base * 60);
    }
  }

  function showEdition() {
    setEdition(() => true);
  }

  return (
    <div className="chrono">
      {edition ? (
        <input
          id="inputBase"
          onChange={(e) => setBase(e.currentTarget.valueAsNumber)}
          type="number"
          onKeyUp={handleSubmitChangeBase}
          autoFocus
        />
      ) : (
        <p id="chronobase" onClick={showEdition}>
          {beautifyData()}
        </p>
      )}
      <div className="action_btn">
        {tempo ? (
          <button onClick={breakTempo}>Break</button>
        ) : (
          <button onClick={start}>Start</button>
        )}
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Chrono;
