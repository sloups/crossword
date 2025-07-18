import { puzzle, GRID_SIZE } from './data.js';

// Generate grid structure from puzzle data
export function generateGrid() {
  // 2D array: { letter, number, isBlack, userInput, cellRefs: [word indices] }
  const grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
  // Place words and numbers
  puzzle.words.forEach((word, idx) => {
    let { row, col, direction, answer, number } = word;
    for (let i = 0; i < answer.length; i++) {
      let r = row + (direction === 'down' ? i : 0);
      let c = col + (direction === 'across' ? i : 0);
      if (!grid[r][c]) {
        grid[r][c] = {
          letter: answer[i],
          number: i === 0 ? number : null,
          isBlack: false,
          userInput: '',
          cellRefs: [idx],
        };
      } else {
        // Intersection: add reference
        grid[r][c].cellRefs.push(idx);
        if (i === 0 && !grid[r][c].number) grid[r][c].number = number;
      }
    }
  });
  // Fill empty cells with black squares if not used
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!grid[r][c]) {
        grid[r][c] = { isBlack: true };
      }
    }
  }
  return grid;
}

// Validate a single cell's input
export function validateCell(grid, r, c) {
  const cell = grid[r][c];
  if (cell.isBlack) return null;
  return cell.userInput.toUpperCase() === cell.letter;
}

// Check if a word is fully and correctly filled
export function checkWord(grid, word) {
  let { row, col, direction, answer } = word;
  for (let i = 0; i < answer.length; i++) {
    let r = row + (direction === 'down' ? i : 0);
    let c = col + (direction === 'across' ? i : 0);
    if (grid[r][c].userInput.toUpperCase() !== answer[i]) return false;
  }
  return true;
}

// Check if the whole puzzle is complete and correct
export function isPuzzleComplete(grid) {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const cell = grid[r][c];
      if (!cell.isBlack && cell.userInput.toUpperCase() !== cell.letter) {
        return false;
      }
    }
  }
  return true;
}

// Reset all user input in the grid
export function resetGrid(grid) {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!grid[r][c].isBlack) {
        grid[r][c].userInput = '';
      }
    }
  }
} 