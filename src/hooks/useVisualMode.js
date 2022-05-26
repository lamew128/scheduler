import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /**
  * Transtion to the next mode.
  * @param {{change: string, replace: Boolean}}
  */
  function transition(change, replace = false) {
    if (replace) {
      setHistory([history].pop());
    } 
    history.push(change);
    setMode(change);
  }

  /**
  * Transtion back to the previous mode.
  */
  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length-1]);
    }
  }

  return {
    mode,
    transition,
    back
  };
}