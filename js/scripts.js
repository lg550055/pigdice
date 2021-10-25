// Business logic
function Game() {
  this.players = {};
}

Game.prototype.addPlayer = function(player) {
  this.players[player.name] = player;
};

Game.prototype.roll = function(player) {
  let r = Math.floor(Math.random()*6) + 1;
  if (r === 1) {
    player.turntot = 0;
    return r
  } else {
    player.turntot += r;
    return r
  }
};

function Player(name) {
  this.name = name;
  this.turntot = 0;
  this.score = 0;
}

// User Interface logic
let game = new Game();

$(document).ready(function() {

  $("#play").submit(function() {
    event.preventDefault();
    let p1 = new Player($('#name1').val());
    let p2 = new Player($('#name2').val());
    game.addPlayer(p1);
    game.addPlayer(p2);
    $('#p1name').text(p1.name);
    $('#p2name').text(p2.name);
    $('#p1turn').text(p1.turntot);
    $('#p2turn').text(p2.turntot);
    $('#p1score').text(p1.score);
    $('#p2score').text(p2.score);
    $('#play').trigger('reset');
  });

  $('#p1roll').click(function() {
    const player = game.players[$('#p1name').text()];
    let r = game.roll(player);
    $('#p1die').text(r);
    $('#p1turn').text(player.turntot);
    if (r === 1) {
      $('#p1roll').prop('disabled', true);
      $('#p2roll').prop('disabled', false);
    }
  })

  $('#p1hold').click(function() {
    const player = game.players[$('#p1name').text()];
    player.score += player.turntot;
    player.turntot = 0;
    $('#p1turn').text(player.turntot);
    $('#p1score').text(player.score);
    $('#p1roll').prop('disabled', true);
    $('#p2roll').prop('disabled', false);
  })

  $('#p2roll').click(function() {
    const player = game.players[$('#p2name').text()];
    let r = game.roll(player);
    $('#p2die').text(r);
    $('#p2turn').text(player.turntot);
    if (r === 1) {
      $('#p2roll').prop('disabled', true);
      $('#p1roll').prop('disabled', false);
    }
  })

  $('#p2hold').click(function() {
    const player = game.players[$('#p2name').text()];
    player.score += player.turntot;
    player.turntot = 0;
    $('#p2turn').text(player.turntot);
    $('#p2score').text(player.score);
    $('#p2roll').prop('disabled', true);
    $('#p1roll').prop('disabled', false);
  })
});
