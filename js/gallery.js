const images = [
    "2026-08-18_09.30.39.jpg",
    "2026-08-18_09.31.03.jpg",
    "2026-08-18_09.31.16.jpg",
    "2026-08-18_09.31.30.jpg",
    "2026-08-18_09.31.56.jpg",
    "2026-08-18_09.32.35.jpg",
    "2026-08-18_09.33.01.jpg",
    "2026-08-18_09.33.20.jpg",
    "2026-08-18_09.34.14.jpg",
    "2026-08-18_09.34.44.jpg",
    "2026-08-18_09.35.11.jpg",
    "2026-08-18_09.35.41.jpg",
    "2026-08-18_09.36.22.jpg",
    "2026-08-18_09.37.13.jpg",
    "2026-08-18_09.38.08.jpg",
    "2026-08-18_09.43.41.jpg",
    "2026-08-18_09.44.24.jpg",
    "2026-08-18_09.45.03.jpg",
    "2026-08-18_09.45.43.jpg",
    "2026-08-18_09.46.19.jpg",
    "2026-08-18_09.46.56.jpg",
    "2026-08-18_09.47.18.jpg",
    "2026-08-18_09.47.54.jpg",
    "2026-08-18_09.48.38.jpg",
    "2026-08-18_09.49.37.jpg",
    "2026-08-18_09.50.24.jpg",
    "2026-08-18_09.56.40.jpg",
    "2026-08-18_09.56.51.jpg",
    "2026-08-18_09.57.30.jpg",
    "2026-08-18_09.57.57.jpg",
    "2026-08-18_09.58.34.jpg",
    "2026-08-18_09.59.40.jpg",
    "2026-08-18_10.00.15.jpg",
    "2026-08-18_10.00.51.jpg",
    "2026-08-18_10.04.48.jpg",
    "2026-08-18_10.06.03.jpg",
    "2026-08-18_10.06.23.jpg",
    "2026-08-19_15.51.34.jpg",
    "2026-08-19_15.52.04.jpg",
    "2026-08-19_15.53.29.jpg"
];

const imgEl = document.getElementById('galleryImg');
const counterEl = document.getElementById('galleryCounter');
const captionEl = document.getElementById('galleryCaption');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('galleryDots');
let currentIndex = 0;
let loadedImages = {};
let captions = {};

// 加载图片注释
fetch('../json/pic.json')
    .then(res => res.json())
    .then(data => { captions = data; updateCaption(); })
    .catch(() => {});

function updateCaption() {
    const name = images[currentIndex];
    captionEl.textContent = captions[name] || '';
}

// 创建圆形数字按钮
images.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.textContent = i + 1;
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('.dot');

function loadImage(index) {
    const path = '../img/' + images[index];
    if (loadedImages[index]) {
        imgEl.src = path;
        return;
    }
    imgEl.src = '';
    imgEl.classList.remove('loaded');
    const temp = new Image();
    temp.onload = function () {
        loadedImages[index] = true;
        imgEl.src = path;
        requestAnimationFrame(() => {
            imgEl.classList.add('loaded');
        });
    };
    temp.src = path;
}

function goTo(index) {
    if (index < 0 || index >= images.length) return;
    currentIndex = index;
    loadImage(currentIndex);
    counterEl.textContent = (currentIndex + 1) + ' / ' + images.length;
    updateCaption();
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === images.length - 1;
    dots.forEach(d => d.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
});

goTo(0);