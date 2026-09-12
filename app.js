// ===============================
// FILTER SYSTEM
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Remove active class
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    // Add active class
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    galleryItems.forEach(function (item) {
      const category = item.getAttribute("data-category");

      if (filterValue === "all" || category === filterValue) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
});

// ===============================
// LIGHTBOX
// ===============================

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");

const closeBtn = document.getElementById("closeBtn");

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

const viewButtons = document.querySelectorAll(".view-btn");

let currentIndex = 0;

// ===============================
// OPEN LIGHTBOX
// ===============================

viewButtons.forEach(function (button, index) {
  button.addEventListener("click", function () {
    currentIndex = index;

    showImage(currentIndex);

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
  });
});

// ===============================
// SHOW IMAGE
// ===============================

function showImage(index) {
  const button = viewButtons[index];

  const image = button.getAttribute("data-image");

  const title = button.getAttribute("data-title");

  lightboxImage.src = image;

  lightboxImage.alt = title;

  lightboxTitle.textContent = title;
}

// ===============================
// NEXT IMAGE
// ===============================

nextBtn.addEventListener("click", function () {
  currentIndex++;

  if (currentIndex >= viewButtons.length) {
    currentIndex = 0;
  }

  showImage(currentIndex);
});

// ===============================
// PREVIOUS IMAGE
// ===============================

prevBtn.addEventListener("click", function () {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = viewButtons.length - 1;
  }

  showImage(currentIndex);
});

// ===============================
// CLOSE LIGHTBOX
// ===============================

closeBtn.addEventListener("click", closeLightbox);

function closeLightbox() {
  lightbox.classList.remove("active");

  document.body.style.overflow = "auto";
}

// ===============================
// CLOSE BY CLICKING OUTSIDE
// ===============================

lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// ===============================
// KEYBOARD CONTROLS
// ===============================

document.addEventListener("keydown", function (event) {
  if (!lightbox.classList.contains("active")) {
    return;
  }

  // ESC
  if (event.key === "Escape") {
    closeLightbox();
  }

  // RIGHT ARROW
  if (event.key === "ArrowRight") {
    currentIndex++;

    if (currentIndex >= viewButtons.length) {
      currentIndex = 0;
    }

    showImage(currentIndex);
  }

  // LEFT ARROW
  if (event.key === "ArrowLeft") {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = viewButtons.length - 1;
    }

    showImage(currentIndex);
  }
});
