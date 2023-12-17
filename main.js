/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/createElement/createElement.js
function createElement(options) {
  const {
    name,
    classes,
    text,
    attributes
  } = options;
  const element = document.createElement(name);
  if (classes) {
    classes.forEach(className => {
      element.classList.add(className);
    });
  }
  if (text) {
    element.textContent = text;
  }
  if (attributes) {
    attributes.forEach(attr => {
      element.setAttribute(attr.name, attr.value);
    });
  }
  return element;
}
/* harmony default export */ const createElement_createElement = (createElement);
;// CONCATENATED MODULE: ./src/js/goblin/img/goblin.png
const goblin_namespaceObject = __webpack_require__.p + "2dbd01ce16c0fa83cb67.png";
;// CONCATENATED MODULE: ./src/js/goblin/goblin.js


class Goblin {
  constructor(field, rows, columns, score) {
    this.field = field;
    this.rows = rows;
    this.columns = columns;
    this.score = score;
    this.hit = 0;
    this.goblinEl = createElement_createElement({
      name: 'img',
      classes: ['goblin'],
      attributes: [{
        name: 'src',
        value: goblin_namespaceObject
      }]
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
          return true;
        }
        clearInterval(this.moveInterval);
        this.init();
        this.moveStart();
        this.hit = this.score.hitsScore;
        return false;
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
/* harmony default export */ const goblin = (Goblin);
;// CONCATENATED MODULE: ./src/js/scoreStatus/scoreStatus.js

class ScoreStatus {
  constructor(parent) {
    if (typeof parent === 'string') {
      this.parent = document.querySelector(parent);
    } else {
      this.parent = parent;
    }
    this.losesScore = 0;
    this.hitsScore = 0;
    this.wrapper = createElement_createElement({
      name: 'div',
      classes: ['score']
    });
  }
  init() {
    const loses = createElement_createElement({
      name: 'div',
      classes: ['score__item', 'score__item_losesScore'],
      text: `Пропущено: ${this.losesScore}`
    });
    const hits = createElement_createElement({
      name: 'div',
      classes: ['score__item', 'score__item_hitsScore'],
      text: `Убито: ${this.hitsScore}`
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
    if (typeof element === 'string') {
      scoreEl = this.wrapper.querySelector(element);
    } else {
      scoreEl = element;
    }
    scoreEl.textContent = score;
  }
  winShow() {
    const winMessage = createElement_createElement({
      name: 'div',
      class: ['winner'],
      text: 'Ты выиграл'
    });
    this.wrapper.remove();
    this.parent.appendChild(winMessage);
  }
  loseShow() {
    const loseMessage = createElement_createElement({
      name: 'div',
      class: ['loser'],
      text: 'Ты проиграл'
    });
    this.wrapper.remove();
    this.parent.appendChild(loseMessage);
  }
}
/* harmony default export */ const scoreStatus = (ScoreStatus);
;// CONCATENATED MODULE: ./src/js/whackGoblin/whackGoblin.js



class WhackGoblin {
  constructor(element, rows, columns) {
    this.element = element;
    this.rows = rows;
    this.columns = columns;
    this.score = new scoreStatus(element);
  }
  start() {
    this.score.init();
    this.create();
    this.goblin.moveStart();
  }
  create() {
    const fieldWrapper = createElement_createElement({
      name: 'div',
      classes: ['field']
    });
    for (let i = 0; i < this.rows; i += 1) {
      const row = createElement_createElement({
        name: 'div',
        classes: ['field__row', `field__row_${i + 1}`]
      });
      for (let j = 0; j < this.columns; j += 1) {
        const cell = createElement_createElement({
          name: 'div',
          classes: ['field__cell', `field__cell_${i + 1}-${j + 1}`]
        });
        row.appendChild(cell);
      }
      fieldWrapper.appendChild(row);
    }
    this.element.appendChild(fieldWrapper);
    this.goblin = new goblin(fieldWrapper, this.rows, this.columns, this.score);
  }
}
/* harmony default export */ const whackGoblin_whackGoblin = (WhackGoblin);
;// CONCATENATED MODULE: ./src/js/app.js

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const whackGoblin = new whackGoblin_whackGoblin(body, 4, 4);
  whackGoblin.start();
});
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;