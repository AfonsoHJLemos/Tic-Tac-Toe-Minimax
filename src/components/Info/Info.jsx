import "./Info.css";

function Info({ info: { board, bestIndex, bestIndexes, randomIndex } }) {
  const createCell = (cell, index) => {
    return (
      <div
        id="InfoCell"
        style={{ color: bestIndex === index ? "hsl(0, 100%, 75%)" : null }}
        key={index}
      >
        {cell}
      </div>
    );
  };

  const createIndex = (value, index) => {
    return (
      <span key={index}>
        <span
          style={{
            color: randomIndex === index ? "hsl(0, 100%, 75%)" : null,
          }}
        >
          {value + 1}
        </span>
        {index < bestIndexes.length - 1 ? ", " : null}
      </span>
    );
  };

  return (
    <div id="Info">
      <h1>Info</h1>

      <div id="InfoBoard">
        {board.map((cell, index) => createCell(cell, index))}
      </div>

      <div id="InfoBestIndexes">
        Best Positions = [
        {bestIndexes
          ? bestIndexes.map((value, index) => createIndex(value, index))
          : null}
        ]
      </div>
    </div>
  );
}

export default Info;
