import Lenis from 'lenis';

const TOTAL_FRAMES = 300;
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
const loader = document.getElementById('loader');
const loaderText = document.getElementById('loader-text');

// Frame storage
const images = new Array(TOTAL_FRAMES);
let loadedCount = 0;

// Lerp & Frame Tracking
let targetFrame = 0;
let currentFrame = 0;
const LERP_FACTOR = 0.15; // Smooth interpolation factor
// Function to format frame numbers e.g. 1 -> "001"
function getFrameUrl(index) {
  const frameNum = String(index + 1).padStart(3, '0');

  // import.meta.env.BASE_URL automatically adapts:
  // - Local: '/'
  // - GitHub Pages: '/portfolio-website/'
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${baseUrl}phot/ezgif-frame-${frameNum}.jpg`;
}

// Adjust canvas resolution for High DPI displays without quality loss
function resizeCanvas() {
  const dpr = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
  ctx.scale(dpr, dpr);
  renderFrame(Math.round(currentFrame));
}

// Render crisp image sequence frame directly onto canvas with zero blur
function renderFrame(index) {
  const imgIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
  const img = images[imgIndex];

  if (!img || !img.complete || img.naturalWidth === 0) return;

  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  // Clear background and draw dark ambient radial gradient matching central image lighting
  ctx.filter = 'none';
  const radGrad = ctx.createRadialGradient(
    canvasWidth / 2,
    canvasHeight * 0.45,
    0,
    canvasWidth / 2,
    canvasHeight * 0.45,
    Math.max(canvasWidth, canvasHeight) * 0.65
  );
  // Center Glow: Deep Crimson / Neon Magenta with low opacity (#a1124d at 25% opacity)
  radGrad.addColorStop(0, 'rgba(161, 18, 77, 0.28)');
  // Mid-Transition: Very dark moody purple/charcoal (#120610 at 90% opacity)
  radGrad.addColorStop(0.55, 'rgba(18, 6, 16, 0.90)');
  // Outer Edges: Near-black (#050206)
  radGrad.addColorStop(1, '#050206');

  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;
  const imgRatio = imgWidth / imgHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  let drawWidth, drawHeight, offsetX, offsetY;

  if (canvasRatio > imgRatio) {
    // Fit entire height so full body from head to toe is 100% visible
    drawHeight = canvasHeight;
    drawWidth = canvasHeight * imgRatio;
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  } else {
    // Fit width, centered vertically
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgRatio;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  }

  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

// Update scroll target frame based on page scroll position
function updateTargetFrame() {
  const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  const maxScroll = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  ) - window.innerHeight;

  if (maxScroll > 0) {
    const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
    targetFrame = scrollFraction * (TOTAL_FRAMES - 1);
  }
}

// Preload and pre-decode image frames for ultra-crisp playback
function preloadImages() {
  let loaded = 0;

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = getFrameUrl(i);

    const onSingleImageLoad = () => {
      if ('decode' in img) {
        img.decode().catch(() => { }).finally(() => {
          registerLoaded(img, i);
        });
      } else {
        registerLoaded(img, i);
      }
    };

    if (img.complete) {
      onSingleImageLoad();
    } else {
      img.onload = onSingleImageLoad;
      img.onerror = () => registerLoaded(null, i);
    }
  }

  function registerLoaded(loadedImg, index) {
    if (loadedImg) {
      images[index] = loadedImg;
    }
    loaded++;
    loadedCount = loaded;

    const progress = Math.floor((loaded / TOTAL_FRAMES) * 100);
    loaderText.textContent = `Loading ${progress}%`;

    if (index === 0) {
      resizeCanvas();
    }

    if (loaded === TOTAL_FRAMES) {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 200);
    }
  }
}

// Smooth Animation Loop using RequestAnimationFrame + Lerp
let lastRenderedFrame = -1;

function animateLoop() {
  const diff = targetFrame - currentFrame;
  if (Math.abs(diff) > 0.001) {
    currentFrame += diff * LERP_FACTOR;
  } else {
    currentFrame = targetFrame;
  }

  const roundedFrame = Math.round(currentFrame);
  if (roundedFrame !== lastRenderedFrame) {
    renderFrame(roundedFrame);
    lastRenderedFrame = roundedFrame;
  }

  requestAnimationFrame(animateLoop);
}

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 2,
});

lenis.on('scroll', (e) => {
  if (typeof e.progress === 'number') {
    targetFrame = e.progress * (TOTAL_FRAMES - 1);
  } else {
    updateTargetFrame();
  }
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Setup Listeners
window.addEventListener('resize', resizeCanvas);
window.addEventListener('scroll', updateTargetFrame, { passive: true });
window.addEventListener('wheel', updateTargetFrame, { passive: true });
window.addEventListener('touchmove', updateTargetFrame, { passive: true });

// Start
resizeCanvas();
preloadImages();
animateLoop();
