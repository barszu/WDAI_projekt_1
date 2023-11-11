const container = document.getElementById("main-box");
const crosshairImage = document.getElementById("crosshair");
const CROSSHAIR_OFFSET = crosshairImage.offsetHeight / 2;

container.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  crosshairImage.style.left = x - CROSSHAIR_OFFSET + "px";
  crosshairImage.style.top = y - CROSSHAIR_OFFSET + "px";
});
