const images = [
    "/Medical/images/varix/01.png",
    "/Medical/images/varix/02.png",
    "/Medical/images/varix/03.png",
    "/Medical/images/varix/04.png",
    "/Medical/images/varix/05.png",
];
let currentSlide = 0;
function showSlide() {
    document.getElementById("slideImage").src =
        images[currentSlide];
    document.getElementById("slideNumber").textContent =
        (currentSlide + 1) + " / " + images.length;
}
function nextSlide() {
    currentSlide++;
    if (currentSlide >= images.length) {
        currentSlide = 0;
    }
    showSlide();
}
function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = images.length - 1;
    }
    showSlide();
}