

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
