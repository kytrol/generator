const { validateGrid, INVALID_FORMAT_MSG, DIMENSION_MISMATCH_MSG } = require('../modules/util');

test('validating a column that is not an array', () => {
  expect(validateGrid({ invalidColumn: [0, 3, 5, 5] })).toBe(INVALID_FORMAT_MSG);
});

test('validating a row that is not an array', () => {
  expect(validateGrid([{ invalidRow: [1, 5, 9, 8] }])).toBe(INVALID_FORMAT_MSG);
});

test('validating a grid that has unequal dimensions', () => {
  expect(validateGrid([[0, 2]])).toBe(DIMENSION_MISMATCH_MSG);
});
