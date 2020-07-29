const canvasSize = 500;
const cellsInRow = 25;
const gameSpeed = 5;

// Initializes grid with random cell state (i.e. dead or alive)
const initialize = () => {
  // main grid varialble
  const grid = new Array(cellsInRow);

  // loop thru the main array grid and input empty arrays to serve as rows
  for (let x = 0; x < grid.length; x++) {
    grid[x] = new Array(cellsInRow);
    // loop thru the rows inside the main grid and input random state
    for (let y = 0; y < grid.length; y++) {
      grid[x][y] = Math.floor(Math.random() * 2);
    }
  }
  // return main grid
  return grid;
};

// Initializes grid with random cell state (i.e. dead or alive)
const nextGeneration = (grid) => {
  // new grid based on initialized grid
  const nextGrid = new Array(grid.length);

  // loop thru the main array grid and input empty arrays to serve as rows
  for (let x = 0; x < grid.length; x++) {
    nextGrid[x] = new Array(grid.length);

    // loop thru the rows inside and based on conways game of life rules
    for (let y = 0; y < nextGrid[x].length; y++) {
      const value = grid[x][y];

      const neighbors = countNeighbors(grid, x, y);

      // if cell is dead and has 3 neighbors
      if (value === 0 && neighbors === 3) {
        // then comes to life
        nextGrid[x][y] = 1;
        // if cell is alive and has 2 or 3 neighbors
      } else if (value === 1 && (neighbors === 2 || neighbors === 3)) {
        // then it remains alive
        nextGrid[x][y] = 1;
      } else {
        //else cells dies
        nextGrid[x][y] = 0;
      }
    }
  }
  return nextGrid;
};

const countNeighbors = (grid, x, y) => {
  let sum = 0;
  const numberOfRows = grid.length;
  const numberOfColumns = grid[0].length;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const row = (i + x + numberOfRows) % numberOfRows;
      const column = (j + y + numberOfColumns) % numberOfColumns;
      sum += grid[row][column];
    }
  }
  sum -= grid[x][y];
  return sum;
};

const gridColor = "grey";
const cellSize = canvasSize / cellsInRow;

const makeGrid = (context, grid) => {
  context.strokeStyle = gridColor;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      const value = grid[i][j];
      if (value) {
        context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
      context.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
};

const generation = (context, grid) => {
  // clear grid but keep size
  context.clearRect(0, 0, canvasSize, canvasSize);
  makeGrid(context, grid);
  const gridOfNextGeneration = nextGeneration(grid);
  setTimeout(() => {
    requestAnimationFrame(() => generation(context, gridOfNextGeneration));
  }, 1000 / gameSpeed);
};

window.onload = () => {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const grid = initialize();
  generation(context, grid);
};
