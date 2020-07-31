import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "../App.css";

// helper functions -- utils
import { clearGrid, userGridUpdate, customGridSize } from "../utils";

const Game = () => {
  let [rowBase, setRowBase] = useState(25);
  let [columnBase, setColumnBase] = useState(25);

  const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];

  const [grid, setGrid] = useState(clearGrid(rowBase, columnBase));

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const [generation, setGeneration] = useState(0);

  const genRef = useRef(generation);
  genRef.current = generation;

  const rowBaseRef = useRef(rowBase);
  rowBaseRef.current = rowBase;

  const columnBaseRef = useRef(columnBase);
  columnBaseRef.current = columnBase;

  const customGridSize = (num) => {
    setRowBase(num);
    setColumnBase(num);
    setGrid(userGridUpdate(num));
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGeneration(genRef.current + 1);

    setGrid((lastGen) => {
      return produce(lastGen, (gridCopy) => {
        for (let i = 0; i < rowBaseRef.current; i++) {
          for (let j = 0; j < columnBaseRef.current; j++) {
            let countNeighbors = 0;

            operations.forEach(([x, y]) => {
              const r = i + x;
              const c = j + y;

              if (
                r >= 0 &&
                r < rowBaseRef.current &&
                c >= 0 &&
                c < columnBaseRef.current
              ) {
                countNeighbors += lastGen[r][c];
              }
            });

            if (countNeighbors < 2 || countNeighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (lastGen[i][j] === 0 && countNeighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    }, []);

    setTimeout(() => {
      runSimulation();
    }, 100);
  }, []);
  return (
    <div className="game" style={{ marginLeft: "30%" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columnBase}, 23px)`,
        }}
      >
        {/* Allows user to see grid and toggle on touch*/}
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
                console.log(i, j, grid[i][j]);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? "white" : "black",
                border: "solid 1px grey",
              }}
            />
          ))
        )}
      </div>
      <div className="gameButtons" style={{ display: "flex" }}>
        <div>
          <div style={{ fontSize: 15 }}>{`Generation: ${generation}`}</div>
          <button
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                runSimulation();
              }
            }}
          >
            {running ? "Stop Game" : "Start Game"}
          </button>
          <button
            onClick={() => {
              const rows = [];
              for (let i = 0; i < rowBase; i++) {
                rows.push(
                  Array.from(Array(columnBase), () =>
                    Math.random() > 0.7 ? 1 : 0
                  )
                );
              }

              setGrid(rows);
            }}
          >
            Randomize
          </button>
          <input type="range" min="1000" max="500" value="750" />
          <button
            onClick={() => {
              setGrid(clearGrid(rowBase, columnBase));
              setGeneration(0);
            }}
          >
            Clear Grid
          </button>
        </div>
        <div>
          <p style={{ fontSize: 15 }}>Custom Grid Size</p>
          <button onClick={() => customGridSize(15)}>15x15</button>
          <button onClick={() => customGridSize(25)}>Default (25x25)</button>
          <button onClick={() => customGridSize(30)}>30x30</button>
        </div>
      </div>
    </div>
  );
};

export default Game;
