import WhackGoblin from './whackGoblin/whackGoblin';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const whackGoblin = new WhackGoblin(body, 4, 4);
  whackGoblin.start();
});
