const app = {
  init: function () {
    console.log("Hello world :)");
  },
};

app.init();

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "f") {
    payRespects();
  }
});

function payRespects() {
  const img = document.createElement("img");

  const randomNum = Math.floor(Math.random() * 5) + 1;
  img.src = `./assets/phai${randomNum}.png`;
  img.classList.add("falling-image");

  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 100);
  img.style.left = `${x}px`;
  img.style.top = `${y}px`;

  document.body.appendChild(img);

  createConfetti(x + 30, y + 30);

  //press f text animation
  const pressF = document.getElementById("f-key");
  pressF.style.opacity = "1";

  img.addEventListener("animationend", () => {
    img.remove();
    pressF.style.opacity = "0.5";
  });
}

function createConfetti(x, y) {
  const colors = ["#ff3b3b", "#ffd93b", "#3bff65", "#3bd9ff", "#ff3be2"];
  const numPieces = 20;

  for (let i = 0; i < numPieces; i++) {
    const piece = document.createElement("div");
    piece.classList.add("confetti");
    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
    piece.style.setProperty(
      "--color",
      colors[Math.floor(Math.random() * colors.length)]
    );

    const xMove = (Math.random() - 0.5) * 200 + "px";
    const yMove = (Math.random() - 0.5) * 200 + "px";
    piece.style.setProperty("--x-move", xMove);
    piece.style.setProperty("--y-move", yMove);

    document.body.appendChild(piece);

    piece.addEventListener("animationend", () => piece.remove());
  }
}

/*-----------------------------music--------------------------------*/

const musicBtn = document.getElementById("bg-music-btn");
const bgMusic = document.getElementById("bg-music");

musicBtn.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicBtn.classList.remove("fa-play-circle");
    musicBtn.classList.add("fa-pause-circle");
  } else {
    bgMusic.pause();
    musicBtn.classList.remove("fa-pause-circle");
    musicBtn.classList.add("fa-play-circle");
  }
});
