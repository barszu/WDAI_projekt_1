var kernelID;
const mainBox = document.getElementById("main-box");

document.addEventListener("DOMContentLoaded", function () {
  //if pages loads game started bootstrap page
  initGame();
  kernelID = setInterval(kernel, SETINGS_kernelRefreshTime);
});

//w glowna petla while True
function kernel() {
  checkGame();

  if (!GLOBAL_isGameRunning) {
    // console.log("zatrzymywanie...");
    clearInterval(kernelID);
    mainBox.removeEventListener("click", trackClick);
    stopZombies();
    displaySummaryScreen();
    return;
  }

  spawnZombie();
}

function checkGame() {
  if (!(possitiveScore() && GLOBAL_lives > 0)) {
    GLOBAL_isGameRunning = false;
    GLOBAL_gameScore = 0;

    // console.log("checkgame -> stop <0 points");
  }
  // if (hearts <= 0 )
}

function initGame() {
  GLOBAL_isGameRunning = true;
  addToScore(SETINGS_startPoints);
  GLOBAL_lives = SETINGS_maxLives;

  mainBox.addEventListener("click", trackClick);
}

function trackClick(event) {
  const crosshair = document.getElementById("crosshair");
  // crosshair.classList.toggle("crosshair-animate");
  crosshair.style.animation = "none";
  void crosshair.offsetWidth;
  crosshair.style.animation = "powiekszanie 0.2s forwards";

  if (event.target.classList.contains("zombie")) {
    console.log("Kliknięto na zombie!");
    addToScore(SETINGS_zombieShotAndDead);
    event.target.remove();
  } else {
    console.log("Kliknięto na tło!");
    addToScore(SETINGS_missedShot);
  }
  // const x = event.clientX;
  // const y = event.clientY;
  // console.log("Współrzędne kliknięcia: X=" + x + ", Y=" + y);
  // crosshair.classList.remove("crosshair-animate");
}

function stopZombies() {
  // wywal animacje z zombie.js ? usun wszystkie zombie
  const zombieElements = document.querySelectorAll("[id='zombie']");

  // Iteracja po znalezionych elementach i usuwanie ich
  zombieElements.forEach((zombie) => {
    zombie.remove();
  });
}

function displaySummaryScreen() {
  const SummaryScreen = document.getElementById("death-page");
  SummaryScreen.style.display = "flex";

  const SummaryScore = document.getElementById("score-span");
  SummaryScore.innerText = GLOBAL_maxScore;

  const reloadButton = document.getElementById("reload-button");
  reloadButton.addEventListener("click", function () {
    window.location.reload();
  });
}
