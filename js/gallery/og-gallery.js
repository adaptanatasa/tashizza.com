/* js/gallery/og-gallery.js */

/*
  Univerzalna OG galerija za TASHIZZA biblioteke.
  Svaka og-galerija.html strana definiše svoj window.ogGalleryConfig.
*/

document.addEventListener("DOMContentLoaded", function () {
  const config = window.ogGalleryConfig;

  if (!config || !config.folder || !Array.isArray(config.images)) {
    console.error("OG gallery config nije pravilno podešen.");
    return;
  }

  const folder = config.folder;
  const images = config.images;

  const params = new URLSearchParams(window.location.search);
  const requestedImage = params.get("img");

  let currentIndex = images.indexOf(requestedImage);
  if (currentIndex === -1) {
    currentIndex = 0;
  }

  const galleryImage = document.getElementById("gallery-image");
  const prevBtn = document.getElementById("prev-image");
  const nextBtn = document.getElementById("next-image");
  const closeBtn = document.getElementById("close-gallery");

  if (!galleryImage || !prevBtn || !nextBtn || !closeBtn) {
    console.error("OG gallery HTML elementi nisu pronađeni.");
    return;
  }

  function showImage() {
    galleryImage.src = folder + images[currentIndex];
    galleryImage.alt = images[currentIndex];
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  }

  function closeGallery() {
    window.close();
  }

  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);
  closeBtn.addEventListener("click", closeGallery);

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      showPrev();
    }

    if (event.key === "ArrowRight") {
      showNext();
    }

    if (event.key === "Escape") {
      closeGallery();
    }
  });

  showImage();
});
