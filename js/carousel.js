const track = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let autoTimer;

function goToSlide(index) {
    currentIndex = index;
    track.style.transform = 'translateX(-' + (index * 20) + '%)';
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
}

function nextSlide() {
    goToSlide((currentIndex + 1) % dots.length);
}

function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(nextSlide, 2000);
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', function () {
        goToSlide(i);
        resetAuto();
    });
});

goToSlide(0);
autoTimer = setInterval(nextSlide, 2000);