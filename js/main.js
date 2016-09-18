const HanoiGame = require('../solution/game.js');
const HanoiView = require('./js/tower-view.js');

$( () => {
  const $rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, $rootEl);
});
