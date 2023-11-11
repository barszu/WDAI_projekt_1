var GLOBAL_isGameRunning = false;
var GLOBAL_gameScore = 0;
var GLOBAL_maxScore = 0;
var GLOBAL_lives = 0;

function randomRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRandFloat(min, max) {
  return Math.random() * (max - min) + min;
}
