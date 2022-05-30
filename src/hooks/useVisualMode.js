import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /**
  * Transtion to the next mode.
  * @param {{change: string, replace: Boolean}}
  */
  function transition(change, replace = false) {
    const newHistory = [...history];
    if (replace) {
      newHistory.pop();
      setHistory(newHistory);
    } 
    newHistory.push(change);
    setHistory(newHistory);
    setMode(change);
  }

  /**
  * Transtion back to the previous mode.
  */
  function back() {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setMode(history[history.length-2]);
    }
  }

  return {
    mode,
    transition,
    back
  };
}