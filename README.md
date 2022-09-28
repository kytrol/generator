# Technical Assessment
The program will find all generations up to a max based on a given set of rules.

## Installation

Install a compatible version of Node.js and npm (recommended Node v16.17.1, npm v8.15.0).

Run `npm install` to install necessary dependencies.

## Project Structure
The main program is contained in `index.js`.

Basic tests for are contained in `test/`.

`modules/generation.js` - Functions for creating generations.

`modules/util.js` - Utility functions.

## Execution
Run with `npm start`.

Lint with `npm run lint`.

Test with `npm run test`.

## Assumptions

#### Cell Value
Assuming that the "empty" cells for an input grid all have a value of 0.

#### Grid Format
Other than the basic validation for a grid, assuming that an input grid has a valid format with equal dimensions.
