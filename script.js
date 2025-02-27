/* javascript */

/* background animation */
const canvas = document.getElementById("waveCanvas1");
const ctx = canvas.getContext("2d");
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
  const frequency = (1.2 * Math.PI) / wavelength;
  const amplitude =
    250 +
    (scrollPosition /
      (document.documentElement.scrollHeight - window.innerHeight)) *
      50;

  for (let x = 0; x <= canvas.width; x++) {
    const y =
      amplitude * Math.sin(frequency * (x + scrollPosition)) +
      canvas.height / 2;
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
  gradient.addColorStop(0, "rgba(59, 130, 246, 0.8)"); // Light blue
  gradient.addColorStop(1, "rgba(6, 194, 249, 1)"); // Darker blue

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

window.addEventListener("resize", resizeCanvas);
window.addEventListener("scroll", handleScroll);

resizeCanvas();
animate();















/* slider-section js code */
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const playBtn = document.querySelector(".play-btn");
let currentSlide = 0;
let isPlaying = true;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
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
  playBtn.textContent = "||";
}

function stopAutoplay() {
  clearInterval(slideInterval);
  isPlaying = false;
  playBtn.textContent = "▶";
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
prevBtn.addEventListener("click", () => {
  prevSlide();
  // Restart the timer when manually changing slides
  if (isPlaying) {
    stopAutoplay();
    startAutoplay();
  }
});

nextBtn.addEventListener("click", () => {
  nextSlide();
  // Restart the timer when manually changing slides
  if (isPlaying) {
    stopAutoplay();
    startAutoplay();
  }
});

playBtn.addEventListener("click", toggleAutoplay);

// Pause autoplay when user hovers over the slider
document
  .querySelector(".slider-container")
  .addEventListener("mouseenter", () => {
    if (isPlaying) {
      stopAutoplay();
    }
  });

// Resume autoplay when user leaves the slider
document
  .querySelector(".slider-container")
  .addEventListener("mouseleave", () => {
    if (!isPlaying) {
      startAutoplay();
    }
  });











/* carousel-section js code */
const games = [
  {
    title: "Sneaky Sasquatch",
    category: "Adventure",
    image: "./assets/images/NBA-game-baner.jpg",
  },
  {
    title: "NBA 2K22",
    category: "Sports",
    image: "./assets/images/GTA-baner.jpeg",
  },
  {
    title: "Angry Birds",
    category: "Action",
    image: "./assets/images/CALLOFDUTY-baner.jpeg",
  },
  {
    title: "LEGO Star",
    category: "Strategy",
    image: "./assets/images/CALLOFDUTY-baner.jpeg",
  },
  {
    title: "Crossy Road",
    category: "Action",
    image: "./assets/images/GTA-baner.jpeg",
  },
];

function createGameCard(game) {
  return `
        <div class="game-card">
        <div class="game-image-container">
        <img src="${game.image}" alt="${game.title}" class="game-image">
        <div class="game-info">
        <div class="game-category">${game.category}</div>
        <div class="game-title">${game.title}</div>
        </div>
        <button class="game-button">دریافت اپلیکیشن</button>
        </div>
        </div>
        
        `;
}

function initializeTrack(trackId, isReverse = false) {
  const track = document.getElementById(trackId);
  const content = [...games, ...games, ...games]
    .map((game) => createGameCard(game))
    .join("");
  track.innerHTML = content;
  if (isReverse) {
    track.style.right = "0";
    track.style.left = "auto";
  }
  return track;
}

function animateTrack(track, isReverse = false) {
  const cardWidth = 316; // card width (250px) + margin-right (16px)
  const totalWidth = cardWidth * games.length;
  let position = 0;
  let isHovered = false;

  function moveTrack() {
    if (!isHovered) {
      position += 1;
      if (position >= totalWidth) {
        position = 0;
      }
      const translateValue = isReverse ? position : -position;
      track.style.transform = `translateX(${translateValue}px)`;
    }
  }

  const interval = setInterval(moveTrack, 50); // Smoother animation

  // Add event listeners for hover
  track.addEventListener("mouseenter", () => {
    isHovered = true;
  });

  track.addEventListener("mouseleave", () => {
    isHovered = false;
  });

  // Return the interval ID so it can be cleared if needed
  return interval;
}

// Initialize and animate all tracks
const track1 = initializeTrack("track1");
const track2 = initializeTrack("track2", true);
const track3 = initializeTrack("track3");
const track4 = initializeTrack("track4", true);
animateTrack(track1);
animateTrack(track2, true);
animateTrack(track3);
animateTrack(track4,true);