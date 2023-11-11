const heartBar = document.getElementById("heart-bar");

function addToheartBar() {
  //z czyszczeniem
  heartBar.innerHTML = "";

  for (let i = 1; i <= SETINGS_maxLives; i++) {
    var heart = document.createElement("div");
    heartBar.appendChild(heart);
    heart.id = "heart";

    if (i <= GLOBAL_lives) {
      heart.classList.add("heart-full");
    } else {
      heart.classList.add("heart-blank");
    }
  }
}

function decreaceHearts() {
  GLOBAL_lives += -1;
  addToheartBar();
}
