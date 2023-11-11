const heartBar = document.getElementById("heart-bar");

function addToheartBar() {
  //z czyszczeniem
  heartBar.innerHTML = "";

  for (let i = 1; i <= SETINGS_maxLives; i++) {
    //zobacz jak dzialaja zwykle petle w js
    var heart = document.createElement("div");
    heartBar.appendChild(heart);
    heart.id = "heart";
    // heart.setAttribute("id", "heart");

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
