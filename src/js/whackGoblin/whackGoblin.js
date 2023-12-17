import createElement from '../createElement/createElement';
import Goblin from '../goblin/goblin';
import ScoreStatus from '../scoreStatus/scoreStatus';

class WhackGoblin {
  constructor(element, rows, columns) {
    this.element = element;
    this.rows = rows;
    this.columns = columns;
    this.score = new ScoreStatus(element);
  }

  start() {
    this.score.init();
    this.create();
    this.goblin.moveStart();
  }

  create() {
    const fieldWrapper = createElement({
      name: 'div',
      classes: ['field'],
    });

    for (let i = 0; i < this.rows; i += 1) {
      const row = createElement({
        name: 'div',
        classes: ['field__row', `field__row_${i + 1}`],
      });
      for (let j = 0; j < this.columns; j += 1) {
        const cell = createElement({
          name: 'div',
          classes: ['field__cell', `field__cell_${i + 1}-${j + 1}`],
        });
        row.appendChild(cell);
      }
      fieldWrapper.appendChild(row);
    }

    this.element.appendChild(fieldWrapper);
    this.goblin = new Goblin(fieldWrapper, this.rows, this.columns, this.score);
  }
}

export default WhackGoblin;
