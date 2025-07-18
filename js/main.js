import { renderGrid, renderClues, checkAnswers, reset } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  renderGrid();
  renderClues();
  document.getElementById('check-answers').addEventListener('click', checkAnswers);
  document.getElementById('reset-grid').addEventListener('click', () => {
    reset();
    renderClues();
  });
}); 