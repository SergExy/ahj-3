import createElement from '../createElement/createElement';

class ScoreStatus {
  constructor(parent) {
    if (typeof (parent) === 'string') {
      this.parent = document.querySelector(parent);
    } else {
      this.parent = parent;
    }
    this.losesScore = 0;
    this.hitsScore = 0;
    this.wrapper = createElement({
      name: 'div',
      classes: ['score'],
    });
  }

  init() {
    const loses = createElement({
      name: 'div',
      classes: ['score__item', 'score__item_losesScore'],
      text: `Пропущено: ${this.losesScore}`,
    });
    const hits = createElement({
      name: 'div',
      classes: ['score__item', 'score__item_hitsScore'],
      text: `Убито: ${this.hitsScore}`,
    });

    this.wrapper.appendChild(loses);
    this.wrapper.appendChild(hits);

    this.parent.appendChild(this.wrapper);
  }

  losesUp() {
    this.losesScore += 1;
    this.scoreUp('.score__item_losesScore', `Пропущено: ${this.losesScore}`);
  }

  hitsUp() {
    this.hitsScore += 1;
    this.scoreUp('.score__item_hitsScore', `Убито: ${this.hitsScore}`);
  }

  scoreUp(element, score) {
    let scoreEl;
    if (typeof (element) === 'string') {
      scoreEl = this.wrapper.querySelector(element);
    } else {
      scoreEl = element;
    }
    scoreEl.textContent = score;
  }

  winShow() {
    const winMessage = createElement({
      name: 'div',
      class: ['winner'],
      text: 'Ты выиграл',
    });
    this.wrapper.remove();
    this.parent.appendChild(winMessage);
  }

  loseShow() {
    const loseMessage = createElement({
      name: 'div',
      class: ['loser'],
      text: 'Ты проиграл',
    });
    this.wrapper.remove();
    this.parent.appendChild(loseMessage);
  }
}

export default ScoreStatus;
