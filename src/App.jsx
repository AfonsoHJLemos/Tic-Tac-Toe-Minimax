import "./App.css";
import Info from "./components/Info/Info.jsx";
import Board from "./components/Board/Board.jsx";
import Stats from "./components/Stats/Stats.jsx";
import { useState } from "react";

function App() {
  const [info, setInfo] = useState({
    board: Array(9).fill(0),
    bestIndex: null,
    bestIndexes: [...Array(9).keys()],
    randomIndex: null,
  });
  const [stats, setStats] = useState({
    draws: 0,
    wins: 0,
    losses: 0,
    time: 0,
  });
  const [pruning, setPruning] = useState(true);

  return (
    <div id="App">
      <Info info={info} />
      <Board setInfo={setInfo} setStats={setStats} pruning={pruning} />
      <Stats stats={stats} pruning={pruning} setPruning={setPruning} />
    </div>
  );
}

export default App;
