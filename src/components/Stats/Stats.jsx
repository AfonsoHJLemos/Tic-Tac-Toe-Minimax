import "./Stats.css";
import pruningAudio from "../../assets/pruning.mp3";
import { useRef } from "react";

function Stats({ stats: { draws, wins, losses, time }, pruning, setPruning }) {
  const pruningRef = useRef(null);

  return (
    <div id="Stats">
      <h1>Stats</h1>

      <div id="Calcs">
        Games Calculated
        <div>
          <span title="Total" style={{ fontWeight: "bolder" }}>
            {draws + wins + losses}
          </span>
          {" - "}
          <span title="Draws">{draws}</span>
          {" / "}
          <span title="Wins" style={{ color: "hsl(0, 100%, 75%)" }}>
            {wins}
          </span>
          {" / "}
          <span title="Losses" style={{ color: "hsl(200, 100%, 75%)" }}>
            {losses}
          </span>
        </div>
      </div>

      <div id="Time">Time: {time === 0 ? "≈0" : time}ms</div>

      <div id="Pruning">
        Alpha-Beta Pruning:{" "}
        <span
          onClick={() => {
            setPruning(!pruning);
            pruningRef.current.play();
          }}
        >
          {pruning ? "On" : "Off"}
        </span>
      </div>

      <audio ref={pruningRef} src={pruningAudio}></audio>
    </div>
  );
}

export default Stats;
