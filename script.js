/* javascript */



/* background animation */
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');
let animationFrameId;
let scrollPosition = 0;

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

function drawWave() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.beginPath();

const wavelength = canvas.width;
const frequency = 1.2 * Math.PI / wavelength;
const amplitude = 250 + (scrollPosition / (document.documentElement.scrollHeight - window.innerHeight)) * 50;

for (let x = 0; x <= canvas.width; x++) {
    const y = amplitude * Math.sin(frequency * (x + scrollPosition)) + canvas.height / 2;
    if (x === 0) {
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
    }
}

ctx.lineTo(canvas.width, canvas.height);
ctx.lineTo(0, canvas.height);
ctx.closePath();

const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)'); // Light blue
gradient.addColorStop(1, 'rgba(6, 194, 249, 1)'); // Darker blue

ctx.fillStyle = gradient;
ctx.fill();
}

function animate() {
drawWave();
animationFrameId = requestAnimationFrame(animate);
}

function handleScroll() {
scrollPosition = window.scrollY;
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('scroll', handleScroll);

resizeCanvas();
animate();









/* sideshow code */
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const playBtn = document.querySelector('.play-btn');
let currentSlide = 0;
let isPlaying = true;
let slideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startAutoplay() {
    slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    isPlaying = true;
    playBtn.innerHTML = '⏸';
}

function stopAutoplay() {
    clearInterval(slideInterval);
    isPlaying = false;
    playBtn.innerHTML = '▶';
}

function toggleAutoplay() {
    if (isPlaying) {
        stopAutoplay();
    } else {
        startAutoplay();
    }
}

// Start autoplay when page loads
startAutoplay();

// Event listeners
prevBtn.addEventListener('click', () => {
    prevSlide();
    // Restart the timer when manually changing slides
    if (isPlaying) {
        stopAutoplay();
        startAutoplay();
    }
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    // Restart the timer when manually changing slides
    if (isPlaying) {
        stopAutoplay();
        startAutoplay();
    }
});

playBtn.addEventListener('click', toggleAutoplay);

// Pause autoplay when user hovers over the slider
document.querySelector('.slider-container').addEventListener('mouseenter', () => {
    if (isPlaying) {
        stopAutoplay();
    }
});

// Resume autoplay when user leaves the slider
document.querySelector('.slider-container').addEventListener('mouseleave', () => {
    if (!isPlaying) {
        startAutoplay();
    }
});