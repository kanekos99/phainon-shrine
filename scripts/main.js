const travel_photo_gallery_name = "#travel_photo_gallery";
const travel_photo_gallery = $(travel_photo_gallery_name);

const merch_photo_gallery_name = "#merch_photo_gallery";
const merch_photo_gallery = $(merch_photo_gallery_name);

const modalImg = document.getElementById("modal-image");
const modalImgCaption = document.getElementById("modal-image-caption");

const sections = ["#extras"];


const imageCategories = [
  {
    categoryArray: travel_photos,
    categoryElementId: travel_photo_gallery,
  },
  {
    categoryArray: merch_photos,
    categoryElementId: merch_photo_gallery,
  },
];

const app = {
  init: function () {
    loadImages();
  },
};

app.init();

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "f") {
    payRespects();
  }
});

function payRespects() {
  //only works on shrine page
  if (main_section.hasClass("active")) {
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

/*--------------extra page-----------------*/

const main_section_name = "#shrine-container";
const main_section = $(main_section_name);

const navLinkText = document.getElementById("nav-link-text");

function viewMore(sectionId) {
  const selectedSection = $(sectionId);

  // hide all active sections
  $(".active").hide().removeClass("active");

  //show selected section
  selectedSection.show();
  selectedSection.addClass("active");
  location.hash = sectionId;

  //show updated link text
  navLinkText.innerHTML = `
        <i class="fa fa-long-arrow-left me-1" aria-hidden="true" id="back-btn"></i>
        back
    `;

  //enable scroll
  document.body.style.overflow = "auto";
  document.body.style.backgroundAttachment = "fixed";
}

function backToMain(backBtn) {
  if (!main_section.hasClass("active")) {
    //extra page behaviour

    //show updated innerhtml
    navLinkText.innerHTML = `
        <i class="fa fa-long-arrow-left me-1" aria-hidden="true" id="back-btn"></i>
        back to home
    `;

    //remove ahref
    backBtn.removeAttribute("href");

    // hide all active sections
    $(".active").hide().removeClass("active");

    //show home section
    main_section.show();
    main_section.addClass("active");
    location.hash = "";

    //hid scroll
    document.body.style.overflow = "none";
    document.body.style.backgroundAttachment = "local";
  } else {
    //default behaviour
    backBtn.setAttribute("href", "https://kanekos.neocities.org/");
  }
}

function handleHashChange() {
  if (sections.includes(window.location.hash)) {
    const selectedSection = window.location.hash;
    viewMore(selectedSection);
  }
}

$(window).on("hashchange", handleHashChange);
window.addEventListener("DOMContentLoaded", () => {
  const currentHash = window.location.hash;
  handleHashChange(currentHash);
});

/*------------------------ for image gallery -------------------------------- */

function loadImages() {
  imageCategories.forEach((category) => {
    category.categoryArray.forEach((image) => {
      let imageSrc = image.photo_url;

      //for neocities
      let externalUrl =
        "https://kanekos99.github.io/gallery" + image.photo_url.substring(1);

      let galleryClass = "gallery-thumbnail";

      const imageThumbnailHTML = `
      <img
        src="${imageSrc}"
        loading="lazy"
        class="${galleryClass} img-fluid"
        onclick="showImage(this)"
        data-caption="${image.photo_text}"
        data-bs-toggle="modal"
        data-bs-target="#galleryModal"
      />`;

      category.categoryElementId.append(imageThumbnailHTML);
    });
  });
}

//Lazy Load Option 2 - no small image placeholder
document.querySelectorAll("img.gallery-thumbnail").forEach((img) => {
  img.style.opacity = 0; // start hidden
  img.addEventListener("load", () => {
    img.style.transition = "opacity 0.7s ease";
    img.style.opacity = 1; // fade in once loaded
  });
});

function showNextOrPrevImg(direction) {
  const visibleImages = $("img:visible")
    .not("#modal-image")
    .not(".about-img")
    .not(".nui-img")
    .toArray();
  const currentSrc = modalImg.src;
  let currentIndex = visibleImages.findIndex((img) => img.src === currentSrc);
  let nextIndex = currentIndex + direction;
  if (direction === 1 && nextIndex >= visibleImages.length) {
    nextIndex = 0;
  } else if (direction === -1 && nextIndex === -1) {
    nextIndex = visibleImages.length - 1;
  }
  showImage(visibleImages[nextIndex]);
}

function showImage(image) {
  modalImg.style.display = "none";
  modalImg.src = image.src;
  modalImgCaption.innerHTML = `<p id="modal-image-caption">${image.getAttribute(
    "data-caption"
  )}</p>`;

  modalImg.onload = function () {
    modalImg.style.display = "block";
  };
}
