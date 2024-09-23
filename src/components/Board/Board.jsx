import "./Board.css";
import Cell from "../Cell/Cell.jsx";
import startAudio from "../../assets/start.mp3";
import moveAudio from "../../assets/move.mp3";
import endAudio from "../../assets/end.mp3";
import winAudio from "../../assets/win.mp3";
import { useEffect, useRef, useState } from "react";

function Board({ setInfo, setStats, pruning }) {
  const [board, setBoard] = useState(Array(9).fill(0));
  const [ended, setEnded] = useState(false);
  const [endLine, setEndLine] = useState(null);
  const [lastPlayed, setLastPlayed] = useState(null);

  const startRef = useRef(null);
  const endRef = useRef(null);
  const winRef = useRef(null);
  const moveRef = useRef(null);

  useEffect(() => {
    initBoard();
  }, []);

  const handleClick = (index) => {
    if (ended) {
      resetBoard();
      return;
    }

    if (board[index] !== 0) return;

    const newBoard = [...board];

    // "⌬" Turn
    newBoard[index] = -1;

    if (endBoard(newBoard)) return;

    // "🟃" Turn
    const minimaxIndex = bestIndex(newBoard);
    newBoard[minimaxIndex] = 1;
    setLastPlayed(minimaxIndex);

    if (endBoard(newBoard)) return;

    setBoard(newBoard);
    moveRef.current.play();
  };

  const initBoard = () => {
    const newBoard = Array(9).fill(0);

    const minimaxIndex = bestIndex(newBoard);
    newBoard[minimaxIndex] = 1;

    setBoard(newBoard);
    setLastPlayed(minimaxIndex);
  };

  const resetBoard = () => {
    initBoard();

    setEnded(false);
    setEndLine(null);
    startRef.current.play();
  };

  const evalBoard = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [x, y, z] = line;

      if (board[x] === board[y] && board[y] === board[z] && board[z] !== 0)
        return { value: board[x], line };
    }

    if (!board.includes(0)) return { value: 0, line: null };

    return { value: null, line: null };
  };

  const endBoard = (board) => {
    const end = evalBoard(board);

    if (end.value === null) return false;

    setBoard(board);
    setEnded(true);

    if (end.value !== 0) {
      setEndLine(end.line);
      winRef.current.play();
      return true;
    }

    endRef.current.play();
    return true;
  };

  const bestIndex = (board) => {
    let bestIndexes = [];
    let bestScore = -Infinity;

    let scores = [];
    let stats = {
      draws: 0,
      wins: 0,
      losses: 0,
      time: 0,
    };
    const startTime = performance.now();

    for (let i = 0; i < board.length; i++) {
      if (board[i] !== 0) {
        scores.push("");
        continue;
      }

      board[i] = 1;
      const score = minimax(board, 0, false, -Infinity, Infinity, stats);
      board[i] = 0;

      if (score === bestScore) bestIndexes.push(i);
      else if (score > bestScore) {
        bestScore = score;
        bestIndexes = [i];
      }
      scores.push(score);
    }

    const endTime = performance.now();
    stats.time = Math.round((endTime - startTime) * 10) / 10;

    const randomIndex = Math.floor(Math.random() * bestIndexes.length);
    setInfo({
      board: scores,
      bestIndex: bestIndexes[randomIndex],
      bestIndexes,
      randomIndex,
    });
    setStats(stats);

    return bestIndexes[randomIndex];
  };

  const minimax = (board, depth, isMaximizing, alpha, beta, stats) => {
    const end = evalBoard(board);

    if (end.value !== null) {
      stats.draws += end.value === 0 ? 1 : 0;
      stats.wins += end.value === 1 ? 1 : 0;
      stats.losses += end.value === -1 ? 1 : 0;

      return end.value === 0 ? 0 : end.value * (10 - depth);
    }

    if (isMaximizing) {
      let bestScore = -Infinity;

      for (let i = 0; i < board.length; i++) {
        if (board[i] !== 0) continue;

        board[i] = 1;
        const score = minimax(board, depth + 1, false, alpha, beta, stats);
        board[i] = 0;

        bestScore = Math.max(score, bestScore);

        if (pruning) {
          alpha = Math.max(alpha, score);
          if (beta <= alpha) break;
        }
      }

      return bestScore;
    } else {
      let bestScore = Infinity;

      for (let i = 0; i < board.length; i++) {
        if (board[i] !== 0) continue;

        board[i] = -1;
        const score = minimax(board, depth + 1, true, alpha, beta, stats);
        board[i] = 0;

        bestScore = Math.min(score, bestScore);

        if (pruning) {
          beta = Math.min(beta, score);
          if (beta <= alpha) break;
        }
      }

      return bestScore;
    }
  };

  return (
    <div id="Board">
      {board.map((cell, index) => (
        <Cell
          player={cell}
          endLine={endLine ? endLine.includes(index) : false}
          lastPlayed={lastPlayed === index}
          index={index}
          handleClick={handleClick}
          key={index}
        />
      ))}

      <audio ref={startRef} src={startAudio}></audio>
      <audio ref={endRef} src={endAudio}></audio>
      <audio ref={winRef} src={winAudio}></audio>
      <audio ref={moveRef} src={moveAudio}></audio>
    </div>
  );
}

export default Board;
