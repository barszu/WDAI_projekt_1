function spawnZombie() {
  const zombie = document.createElement("div");
  playground.appendChild(zombie);
  zombie.className = "zombie";
  zombie.id = "zombie";

  var y_pos = Math.random() * playground.clientHeight; //- 200; //position on y axis
  var speed = randomRandInt(SETINGS_maxZombieSpeed, SETINGS_minZombieSpeed); // [?]
  var scale = randomRandFloat(SETINGS_minZombieScale, SETINGS_maxZombieScale);

  zombie.style.bottom = y_pos * 0.3 + "px";
  zombie.style.transform = "scale(" + scale + ")";
  zombie.style.left = playground.clientWidth + "px";
  zombie.style.zIndex = Math.floor(
    playground.clientHeight - y_pos + 0.5 * zombie.clientHeight
  );

  function moveZombie() {
    const pos = parseFloat(zombie.style.left) || 0;
    const newPos = pos - speed;

    if (!document.contains(zombie)) {
      return;
    }

    if (newPos < 0) {
      decreaceHearts();
      zombie.remove();
      return;
    }

    zombie.style.left = newPos + "px";
    requestAnimationFrame(moveZombie);
  }

  requestAnimationFrame(moveZombie);
}
