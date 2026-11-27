const images = [
    "/Medical/images/antibiotics/01.png",
    "/Medical/images/antibiotics/02.png",
    "/Medical/images/antibiotics/03.png",
    "/Medical/images/antibiotics/04.png",
    "/Medical/images/antibiotics/05.png",
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
// スワイプ操作
const slideContainer = document.getElementById("slideContainer");
let touchStartX = 0;
let touchStartY = 0;
slideContainer.addEventListener("touchstart", function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });
slideContainer.addEventListener("touchend", function(e) {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    // 横方向に十分スライドした場合のみ切り替え
    if (Math.abs(diffX) > 50 &&
        Math.abs(diffX) > Math.abs(diffY)) {

        if (diffX < 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
});
// マウス操作
let mouseStartX = 0;
let isDragging = false;

slideContainer.addEventListener("mousedown", function(e) {
    mouseStartX = e.clientX;
    isDragging = true;
});

slideContainer.addEventListener("mouseup", function(e) {
    if (!isDragging) return;

    const diffX = e.clientX - mouseStartX;

    if (Math.abs(diffX) > 50) {
        if (diffX < 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
    isDragging = false;
});
slideContainer.addEventListener("mouseleave", function() {
    isDragging = false;
});

function calcCCr(){
    const age = parseFloat(document.getElementById("age2").value);
    const weight = parseFloat(document.getElementById("weightCCr").value);
    const cr = parseFloat(document.getElementById("cr2").value);
    const sex = document.getElementById("sex2").value;
    let ccr = ((140-age)*weight)/(72*cr);
    if(sex==="female"){
        ccr *= 0.85;
    }
    document.getElementById("ccrResult").textContent =
        "CCr = " + ccr.toFixed(1) + " mL/min";
}