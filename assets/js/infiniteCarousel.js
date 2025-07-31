const carousel = document.querySelector(".infiniteCarousel");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    carousel.setAttribute("data-animated", true);
}