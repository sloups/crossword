import { puzzle, GRID_SIZE } from './data.js';
import { generateGrid, validateCell, checkWord, isPuzzleComplete, resetGrid } from './logic.js';

let grid = null;
let selected = { row: 0, col: 0, direction: 'across' };
let clueMap = {};

// Render the crossword grid
export function renderGrid() {
  grid = generateGrid();
  const gridEl = document.getElementById('crossword-grid');
  gridEl.innerHTML = '';
  gridEl.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
  gridEl.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`;
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const cell = grid[r][c];
      const cellDiv = document.createElement('div');
      cellDiv.className = 'crossword-cell' + (cell.isBlack ? ' black' : '');
      cellDiv.tabIndex = cell.isBlack ? -1 : 0;
      cellDiv.dataset.row = r;
      cellDiv.dataset.col = c;
      if (!cell.isBlack) {
        const input = document.createElement('input');
        input.maxLength = 1;
        input.value = cell.userInput;
        input.autocomplete = 'off';
        input.spellcheck = false;
        input.inputMode = 'text';
        input.addEventListener('input', (e) => handleInput(e, r, c));
        input.addEventListener('focus', () => selectCell(r, c));
        cellDiv.appendChild(input);
        if (cell.number) {
          const num = document.createElement('span');
          num.className = 'cell-number';
          num.textContent = cell.number;
          cellDiv.appendChild(num);
        }
        cellDiv.addEventListener('click', () => selectCell(r, c, true));
      }
      gridEl.appendChild(cellDiv);
    }
  }
  highlightSelection();
}

// Render clues
export function renderClues() {
  clueMap = {};
  const acrossEl = document.getElementById('across-clues');
  const downEl = document.getElementById('down-clues');
  acrossEl.innerHTML = '';
  downEl.innerHTML = '';
  puzzle.words.forEach((word, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="clue-number">${word.number}.</span> ${word.clue}`;
    li.dataset.idx = idx;
    li.addEventListener('click', () => selectClue(idx));
    clueMap[idx] = li;
    if (word.direction === 'across') {
      acrossEl.appendChild(li);
    } else {
      downEl.appendChild(li);
    }
  });
}

// Handle input in a cell
function handleInput(e, r, c) {
  selected.row = r;
  selected.col = c;
  const val = e.target.value.toUpperCase().replace(/[^A-Z]/, '');
  grid[r][c].userInput = val;
  e.target.value = val;
  // Find the word that contains this cell and matches the current direction
  let word = puzzle.words.find(w => {
    if (w.direction !== selected.direction) return false;
    if (w.direction === 'across') {
      return w.row === r && c >= w.col && c < w.col + w.answer.length;
    } else {
      return w.col === c && r >= w.row && r < w.row + w.answer.length;
    }
  });
  // If not found, try the other direction
  if (!word) {
    const otherDir = selected.direction === 'across' ? 'down' : 'across';
    word = puzzle.words.find(w => {
      if (w.direction !== otherDir) return false;
      if (w.direction === 'across') {
        return w.row === r && c >= w.col && c < w.col + w.answer.length;
      } else {
        return w.col === c && r >= w.row && r < w.row + w.answer.length;
      }
    });
    if (word) selected.direction = otherDir;
  }
  moveNext(r, c, word);
}

// Select a cell
function selectCell(r, c, toggleDir = false) {
  if (grid[r][c].isBlack) return;
  // Find all words that include this cell
  const wordsHere = puzzle.words.filter(w => {
    if (w.direction === 'across') {
      return w.row === r && c >= w.col && c < w.col + w.answer.length;
    } else {
      return w.col === c && r >= w.row && r < w.row + w.answer.length;
    }
  });
  if (wordsHere.length === 1) {
    selected.direction = wordsHere[0].direction;
  } else if (toggleDir) {
    selected.direction = selected.direction === 'across' ? 'down' : 'across';
  }
  selected.row = r;
  selected.col = c;
  highlightSelection();
  focusCell(r, c);
}

// Select a clue
function selectClue(idx) {
  const word = puzzle.words[idx];
  selected.row = word.row;
  selected.col = word.col;
  selected.direction = word.direction;
  highlightSelection();
  focusCell(selected.row, selected.col);
}

// Highlight current word and cell
function highlightSelection() {
  const gridEl = document.getElementById('crossword-grid');
  Array.from(gridEl.children).forEach(cell => {
    cell.classList.remove('selected', 'highlighted');
  });
  // Highlight word
  const word = getSelectedWord();
  if (!word) return;
  for (let i = 0; i < word.answer.length; i++) {
    let r = word.row + (word.direction === 'down' ? i : 0);
    let c = word.col + (word.direction === 'across' ? i : 0);
    const idx = r * GRID_SIZE + c;
    const cell = gridEl.children[idx];
    if (cell) cell.classList.add('highlighted');
  }
  // Highlight selected cell
  const idx = selected.row * GRID_SIZE + selected.col;
  const cell = gridEl.children[idx];
  if (cell) cell.classList.add('selected');
  // Highlight clue
  Object.values(clueMap).forEach(li => li.classList.remove('selected'));
  const wordIdx = puzzle.words.findIndex(w => w.row === word.row && w.col === word.col && w.direction === word.direction);
  if (clueMap[wordIdx]) clueMap[wordIdx].classList.add('selected');
}

// Focus input of a cell
function focusCell(r, c) {
  const gridEl = document.getElementById('crossword-grid');
  const idx = r * GRID_SIZE + c;
  const cell = gridEl.children[idx];
  if (cell && cell.querySelector('input')) {
    cell.querySelector('input').focus();
  }
}

// Get the currently selected word
function getSelectedWord() {
  return puzzle.words.find(w =>
    w.direction === selected.direction &&
    w.row <= selected.row &&
    w.col <= selected.col &&
    (selected.direction === 'across'
      ? w.row === selected.row && w.col + w.answer.length > selected.col
      : w.col === selected.col && w.row + w.answer.length > selected.row)
  );
}

// Move to next cell after input
function moveNext(r, c, word) {
  if (!word) return;
  let i = word.direction === 'across' ? c - word.col : r - word.row;
  if (i < word.answer.length - 1) {
    if (word.direction === 'across') setTimeout(() => selectCell(r, c + 1), 0);
    else setTimeout(() => selectCell(r + 1, c), 0);
  }
}

// Keyboard navigation
function handleKeyDown(e) {
  let { row, col } = selected;
  if (e.key === 'ArrowUp') selectCell(Math.max(0, row - 1), col);
  else if (e.key === 'ArrowDown') selectCell(Math.min(GRID_SIZE - 1, row + 1), col);
  else if (e.key === 'ArrowLeft') selectCell(row, Math.max(0, col - 1));
  else if (e.key === 'ArrowRight') selectCell(row, Math.min(GRID_SIZE - 1, col + 1));
  else if (e.key === 'Tab') {
    e.preventDefault();
    // Move to next word
    const idx = puzzle.words.findIndex(w => w.row === selected.row && w.col === selected.col && w.direction === selected.direction);
    let nextIdx = (idx + 1) % puzzle.words.length;
    selectClue(nextIdx);
  }
}

document.addEventListener('keydown', handleKeyDown);

// Check answers
export function checkAnswers() {
  puzzle.words.forEach(word => {
    let correct = checkWord(grid, word);
    let filled = true;
    for (let i = 0; i < word.answer.length; i++) {
      let r = word.row + (word.direction === 'down' ? i : 0);
      let c = word.col + (word.direction === 'across' ? i : 0);
      if (!grid[r][c].userInput) filled = false;
    }
    for (let i = 0; i < word.answer.length; i++) {
      let r = word.row + (word.direction === 'down' ? i : 0);
      let c = word.col + (word.direction === 'across' ? i : 0);
      const gridEl = document.getElementById('crossword-grid');
      const idx = r * GRID_SIZE + c;
      const cell = gridEl.children[idx];
      cell.classList.remove('correct', 'incorrect');
      if (filled) {
        if (correct) cell.classList.add('correct');
        else cell.classList.add('incorrect');
      }
    }
  });
  if (isPuzzleComplete(grid)) {
    setTimeout(() => alert('Quelle rapidité !'), 100);
  }
}

// Reset grid
export function reset() {
  resetGrid(grid);
  renderGrid();
  highlightSelection();
} 