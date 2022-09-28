const { nextGeneration } = require('../modules/generation');

const TEST_INPUT = [
  [0, 0, 1, 0, 0],
  [0, 0, 1, 1, 0],
  [0, 2, 2, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0]
];

const TEST_OUTPUT = [
  [0, 0, 2, 0, 0],
  [0, 1, 0, 2, 0],
  [0, 3, 0, 2, 0],
  [0, 1, 1, 2, 0],
  [0, 0, 0, 0, 0]
];

test('creating a valid generation from a base set', () => {
  expect(nextGeneration(TEST_INPUT)).toStrictEqual(TEST_OUTPUT);
});
