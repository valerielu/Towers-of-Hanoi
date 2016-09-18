/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(2);
	const HanoiView = __webpack_require__(1);

	$( () => {
	  const $rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, $rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	

	var HanoiView = function(game, $rootEl) {
	  this.game = game;
	  this.$rootEl = $rootEl;
	  this.setupTowers();
	  this.render();
	  this.clickTower();
	};

	HanoiView.prototype.setupTowers = function () {
	  for (let i = 0; i < 3; i++) {
	    let $container = $("<ul></ul>");
	    this.$rootEl.append($container);
	    $container.data("id", i);
	    if (i === 0) {
	      for (let j = 0; j < 3; j++) {
	        let $li = $("<li></li>");
	        $container.append($li);
	        $li.addClass(`disk-${j}`);
	      }
	    }
	  }
	};

	HanoiView.prototype.render = function () {
	  $("ul").on("mouseover", event => {
	    let $tower = $(event.currentTarget);
	    $tower.addClass("hover");
	  });

	  $("ul").on("mouseout", event => {
	    let $tower = $(event.currentTarget);
	    $tower.removeClass("hover");
	  });
	};

	HanoiView.prototype.clickTower = function () {
	  let start = true;
	  let startIdx;
	  let endIdx;
	  let $startTower;
	  let $endTower;

	  $("ul").click(event => {
	    let $tower = $(event.currentTarget);
	    if (start) {
	      $tower.addClass("selected");
	      $startTower = $tower;
	      startIdx = $tower.data("id");
	      start = false;
	    }
	    else {
	      $endTower = $tower;
	      endIdx = $tower.data("id");

	      if (this.game.move(startIdx, endIdx)) {
	        let $disk = $startTower.children().first();
	        $startTower.children().first().remove();
	        $endTower.prepend($disk);
	      }
	      else {
	        alert("Invalid move! Try again.");
	      }

	      $startTower.removeClass("selected");
	      start = true;
	    }

	    if (this.game.isWon()) {
	      $('li').css("background", "green");
	      $('ul').css("cursor", "auto");
	      $('ul').off("click");
	      $('ul').off("mouseover");
	      alert('You da best!');
	    }
	  });
	};


	module.exports = HanoiView;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ }
/******/ ]);