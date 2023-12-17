import createElement from '../createElement/createElement';
import goblinImg from './img/goblin.png';

class Goblin {
  constructor(field, rows, columns, score) {
    this.field = field;
    this.rows = rows;
    this.columns = columns;
    this.score = score;
    this.hit = 0;
    this.goblinEl = createElement({
      name: 'img',
      classes: ['goblin'],
      attributes: [{ name: 'src', value: goblinImg }],
    });
  }

  moveStart() {
    this.moveInterval = setInterval(() => {
      if (this.score.losesScore >= 5) {
        this.remove();
        this.score.loseShow();
        return false;
      }
      if (this.hit === this.score.hitsScore) {
        this.score.losesUp();
      }
      this.hit = this.score.hitsScore;
      this.init();
      return true;
    }, 1000);
  }

  init() {
    let goblinEl = this.field.querySelector('.goblin');
    let row;
    let cell;

    if (goblinEl) {
      const parent = goblinEl.parentNode;
      const currCell = parent.className.match(/[\d]/g);

      do {
        row = Math.floor(Math.random() * (this.rows - 1 + 1)) + 1;
        cell = Math.floor(Math.random() * (this.columns - 1 + 1)) + 1;
      } while (+currCell[0] === row && +currCell[1] === cell);
    } else {
      row = Math.floor(Math.random() * (this.rows - 1 + 1)) + 1;
      cell = Math.floor(Math.random() * (this.columns - 1 + 1)) + 1;

      goblinEl = this.goblinEl;

      goblinEl.addEventListener('click', () => {
        this.score.hitsUp();
        if (this.score.hitsScore >= 5) {
          this.remove();
          this.score.winShow();
        }
      });
    }
    const cellEl = this.field.querySelector(`.field__cell_${row}-${cell}`);
    cellEl.appendChild(goblinEl);
  }

  remove() {
    this.goblinEl.remove();
    clearInterval(this.moveInterval);
  }
}

export default Goblin;
