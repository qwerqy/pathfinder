import { useEffect, useState } from "react";

const generateGridCanvas = (ROWS: number, COLUMNS: number) => {
  let result = [];
  for (let i = 0; i < ROWS; i++) {
    let row = [];
    for (let k = 0; k < COLUMNS; k++) {
      row.push(0);
    }
    result.push(row);
  }

  return result;
};

const Grid = () => <div className="grid-container" />;

const GridCanvas = () => {
  const COLUMNS = 10;
  const ROWS = 10;

  const [grid, setGrid] = useState<number[][]>([]);

  useEffect(() => {
    setGrid(generateGridCanvas(ROWS, COLUMNS));
  }, []);

  return (
    <div>
      {grid.map((row, idx) => {
        return (
          <div className="grid-row-container">
            {row.map((col, idx) => (
              <Grid key={idx} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default GridCanvas;
