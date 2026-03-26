const carousels = document.querySelectorAll(".carousel");

carousels.forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const viewport = carousel.querySelector(".carousel-viewport");
  const prevBtn = carousel.querySelector(".carousel-prev");
  const nextBtn = carousel.querySelector(".carousel-next");

  let currentOffset = 0;

  function getStep() {
    const firstCard = track.children[0];
    const secondCard = track.children[1];

    if (!firstCard) return 0;
    if (!secondCard) return firstCard.offsetWidth;

    return secondCard.offsetLeft - firstCard.offsetLeft;
  }

  function getMaxOffset() {
    return Math.max(0, track.scrollWidth - viewport.clientWidth);
  }

  function updateCarousel() {
    const maxOffset = getMaxOffset();

    if (currentOffset < 0) currentOffset = 0;
    if (currentOffset > maxOffset) currentOffset = maxOffset;

    track.style.transform = `translateX(-${currentOffset}px)`;

    prevBtn.disabled = currentOffset === 0;
    nextBtn.disabled = currentOffset >= maxOffset;

    prevBtn.classList.toggle("opacity-50", currentOffset === 0);
    prevBtn.classList.toggle("cursor-not-allowed", currentOffset === 0);

    nextBtn.classList.toggle("opacity-50", currentOffset >= maxOffset);
    nextBtn.classList.toggle("cursor-not-allowed", currentOffset >= maxOffset);
  }

  nextBtn.addEventListener("click", () => {
    const step = getStep();
    const maxOffset = getMaxOffset();

    currentOffset += step;

    if (currentOffset > maxOffset) {
      currentOffset = maxOffset;
    }

    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    const step = getStep();

    currentOffset -= step;

    if (currentOffset < 0) {
      currentOffset = 0;
    }

    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel);

  updateCarousel();
});

const cartBar = document.getElementById("cart-bar");
const footer = document.getElementById("site-footer");

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      cartBar.classList.add("opacity-0", "translate-y-full", "pointer-events-none");
      cartBar.classList.remove("-translate-x-1/2");
      cartBar.classList.add("-translate-x-1/2");
    } else {
      cartBar.classList.remove("opacity-0", "translate-y-full", "pointer-events-none");
    }
  },
  {
    threshold: 0.1,
  }
);

observer.observe(footer);