const scoreDisplay = document.getElementById("score");

function setDisplayedScore(num) {
  const intAsString = num.toString().padStart(5, "0");
  scoreDisplay.textContent = intAsString;
  if (num < 0) {
    scoreDisplay.textContent = "00000";
  }
}

function addToScore(a) {
  GLOBAL_gameScore = GLOBAL_gameScore + a;
  if (a > 0) {
    GLOBAL_maxScore = GLOBAL_gameScore;
  }

  setDisplayedScore(GLOBAL_gameScore);
}

function possitiveScore() {
  return GLOBAL_gameScore > SETINGS_minPointsToPlay;
}
