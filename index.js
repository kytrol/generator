// const INPUT = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
//   [0, 0, 0, 1, 2, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
//   [0, 2, 1, 0, 0, 0, 0, 0, 0, 0],
//   [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ];

const TEST_INPUT = [
  [0, 0, 1, 0, 0],
  [0, 0, 1, 1, 0],
  [0, 2, 2, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0]
];

const Age = {
  EMPTY: 0,
  NEWBORN: 1,
  ADULT: 2,
  SENIOR: 3
};

const mutationRules = {
  [Age.EMPTY]: neighbors => {
    const adultNeighbors = neighbors.filter(neighbor => neighbor === Age.ADULT).length;
    return adultNeighbors === 2 ? Age.NEWBORN : Age.EMPTY;
  },
  [Age.NEWBORN]: neighbors => {
    return neighbors.length >= 5 || neighbors.length <= 1 ? Age.EMPTY : Age.ADULT;
  },
  [Age.ADULT]: neighbors => {
    return neighbors.length === 0 || neighbors.length >= 3 ? Age.EMPTY: Age.SENIOR;
  },
  [Age.SENIOR]: () => Age.EMPTY
};

nextGeneration(TEST_INPUT);

/**
 * Create a new generation from a grid of cells.
 *
 * @param  {number[][]}  grid   Grid of cells to use for next generation
 * @return {undefined}
 */
function nextGeneration(grid) {
  const errMsg = validateGrid(grid);
  if (errMsg) {
    console.error(errMsg);
    return;
  }

  const newGeneration = deepCopy(grid);

  grid.forEach((row, i) => {
    row.forEach((column, j) => {
      // For each cell, get neighbors
      const neighbors = getNeighbors(i, j, grid);

      const currentValue = grid[i][j];
      const mutateCell = mutationRules[currentValue];

      // Determine cell value based on neighbor rules
      if (mutateCell) {
        newGeneration[i][j] = mutateCell(neighbors);
      }
    });
  });

  console.table(newGeneration);
}

/**
 * Deep copy an object.
 * https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
 *
 * @param  {object}   obj  Object to copy
 * @return {object}        Copied object
 */
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Get all valid neighbors of a specific cell.
 *
 * @param  {number}      rowIndex      Index of row
 * @param  {number}      columnIndex   Index of column
 * @param  {number[][]}  grid          Grid of cells
 * @return {number[]}                  Array of adjacent cells
 */
function getNeighbors(rowIndex, columnIndex, grid) {
  const neighbors = [];
  for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
    for (let j = columnIndex - 1; j <= columnIndex + 1; j++) {
      // Skip over the cell that was passed in
      if (i === rowIndex && j === columnIndex) {
        continue;
      }

      // If value is within grid and not empty, it is a valid neighbor
      const row = grid[i];
      if (row !== undefined && row[j]) {
        neighbors.push(row[j]);
      }
    }
  }

  return neighbors;
}

/**
 * Validate basic requirements of grid.
 *
 * @param  {number[][]}  grid    Grid of cells
 * @return {string | undefined}  Array of adjacent cells
 */
function validateGrid(grid) {
  if (!Array.isArray(grid) || !Array.isArray(grid[0])) {
    return 'Invalid format for grid.';
  }

  const rows = grid.length;
  const columns = grid[0].length;
  if (rows !== columns) {
    return 'Dimension mismatch for grid.';
  }
}
