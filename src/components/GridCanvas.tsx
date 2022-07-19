import { useEffect, useState } from "react";
import { GridStatus } from "../enums";

const generateGridCanvas = (ROWS: number, COLUMNS: number) => {
  let result = [];
  for (let i = 0; i < ROWS; i++) {
    let row = [];
    for (let k = 0; k < COLUMNS; k++) {
      row.push(GridStatus.EMPTY);
    }
    result.push(row);
  }

  return result;
};

interface GridProps {
  onClick: () => void;
  value: GridStatus;
}

const Grid = (props: GridProps) => {
  return (
    <div
      onClick={props.onClick}
      className={`border border-gray w-9 h-9 ${
        props.value === GridStatus.BORDER
          ? "bg-black"
          : props.value === GridStatus.FINISH_LINE
          ? "bg-red-700"
          : props.value === GridStatus.START
          ? "bg-green-500"
          : "bg-white"
      }`}
    />
  );
};

const GridCanvas = () => {
  const COLUMNS = 10;
  const ROWS = 10;

  const [grid, setGrid] = useState<GridStatus[][]>([]);
  const [setter, setSetter] = useState<GridStatus>(GridStatus.BORDER);
  const [startDisabled, setStartDisabled] = useState<boolean>(false);
  const [finishDisabled, setFinishDisabled] = useState<boolean>(false);

  const isValueExists = (value: GridStatus) => {
    for (let i = 0; i < grid.length; i++) {
      for (let k = 0; k < grid[i].length; k++) {
        if (grid[i][k] === value) {
          return true;
        }
      }
    }

    return false;
  };

  const handleGridClick = (rowIdx: number, colIdx: number) => {
    const copy = grid;
    copy[rowIdx][colIdx] =
      copy[rowIdx][colIdx] === GridStatus.BORDER ? GridStatus.EMPTY : setter;

    setGrid([...copy]);
    setSetter(GridStatus.BORDER);
  };

  const handleClearClick = () => {
    setGrid(generateGridCanvas(ROWS, COLUMNS));
  };

  const handleStartClick = () => {
    setSetter(GridStatus.START);
  };

  const handleFinishClick = () => {
    setSetter(GridStatus.FINISH_LINE);
  };

  useEffect(() => {
    setGrid(generateGridCanvas(ROWS, COLUMNS));
  }, []);

  useEffect(() => {
    if (isValueExists(GridStatus.START)) {
      setStartDisabled(true);
    } else {
      setStartDisabled(false);
    }

    if (isValueExists(GridStatus.FINISH_LINE)) {
      setFinishDisabled(true);
    } else {
      setFinishDisabled(false);
    }
  });

  return (
    <div>
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="flex">
          {row.map((col, colIdx) => (
            <Grid
              key={colIdx}
              onClick={() => handleGridClick(rowIdx, colIdx)}
              value={col}
            />
          ))}
        </div>
      ))}
      <div className="flex gap-1 mt-1">
        <button
          disabled={startDisabled}
          onClick={handleStartClick}
          className="bg-gray-500 text-white py-1 px-2"
        >
          Set start
        </button>
        <button
          disabled={finishDisabled}
          onClick={handleFinishClick}
          className="bg-gray-500 text-white py-1 px-2"
        >
          Set finish
        </button>
        <button
          onClick={handleClearClick}
          className="bg-gray-500 text-white py-1 px-2"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default GridCanvas;
