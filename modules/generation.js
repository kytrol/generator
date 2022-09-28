const { deepCopy, validateGrid } = require('./util');

const Age = {
  EMPTY: 0,
  NEWBORN: 1,
  ADULT: 2,
  SENIOR: 3
};

// Functions for returning the appropriate value for a specific age based on the given neighbors
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

const MAX_GENERATION = 20;

/**
 * List all generations up to the specified max.
 *
 * @param  {number[][]}  grid   Grid of cells
 * @return {undefined}
 */
function findMaxGeneration(grid) {
  let generation = deepCopy(grid);

  let generationCount = 1;
  logGeneration(generationCount, generation);
  for (let generationIndex = ++generationCount; generationIndex <= MAX_GENERATION; generationIndex++) {
    generation = nextGeneration(generation);
    logGeneration(generationIndex, generation);
  }
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
 * Get all valid neighbors of a specific cell.
 *
 * @param  {number}      generationCount  Current generation number
 * @param  {number[][]}  grid             Grid of cells
 * @return {undefined}
 */
function logGeneration(generationCount, grid) {
  console.log(`Generation ${generationCount}`);
  console.table(grid);
}

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

  return newGeneration;
}

module.exports = {
  findMaxGeneration
};
