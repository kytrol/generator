const INVALID_FORMAT_MSG = 'Invalid format for grid.';
const DIMENSION_MISMATCH_MSG = 'Dimension mismatch for grid.';

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
 * Validate basic requirements of grid.
 *
 * @param  {number[][]}  grid    Grid of cells
 * @return {string | undefined}  Array of adjacent cells
 */
function validateGrid(grid) {
  if (!Array.isArray(grid) || !Array.isArray(grid[0])) {
    return INVALID_FORMAT_MSG;
  }

  const rows = grid.length;
  const columns = grid[0].length;
  if (rows !== columns) {
    return DIMENSION_MISMATCH_MSG;
  }
}

module.exports = {
  INVALID_FORMAT_MSG,
  DIMENSION_MISMATCH_MSG,
  deepCopy,
  validateGrid,
};
