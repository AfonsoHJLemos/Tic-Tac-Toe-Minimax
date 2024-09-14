import "./Cell.css";

function Cell({ player, endLine, lastPlayed, index, handleClick }) {
  const symbol = () => {
    if (player === 1) return "🟃";
    else if (player === -1) return "⌬";

    return null;
  };

  const color = () => {
    if (endLine) {
      if (player === 1) return "hsl(0, 100%, 50%)";
      else return "hsl(200, 100%, 50%)";
    }

    if (lastPlayed) return "hsl(0, 100%, 75%)";

    return null;
  };

  return (
    <div
      id="Cell"
      onClick={() => handleClick(index)}
      style={{ color: color() }}
    >
      {symbol()}
    </div>
  );
}

export default Cell;
