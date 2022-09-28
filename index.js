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

// const Age = {
//   EMPTY: 0,
//   NEWBORN: 1,
//   ADULT: 2,
//   SENIOR: 3
// };

nextGeneration(TEST_INPUT);

/**
 * Create a new generation from a grid of cells.
 *
 * @param  {number[][]}  grid   Grid of cells to use for next generation
 * @return {undefined}
 */
function nextGeneration(grid) {
  if (!Array.isArray(grid) || !Array.isArray(grid[0])) {
    console.error('Invalid format for grid.');
    return;
  }

  const rows = grid.length;
  const columns = grid[0].length;
  if (rows !== columns) {
    console.error('Dimension mismatch for grid.');
    return;
  }

  const neighbors = getNeighbors(0, 0, grid);
  console.log('neighbors', neighbors);
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

      // If value is within grid, it is a valid neighbor
      const row = grid[i];
      if (row !== undefined && row[j] !== undefined) {
        neighbors.push(row[j]);
      }
    }
  }

  return neighbors;
}
