/* Initialize Lucide Icons */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

/* Remove Loading Screen after page load (Extended Duration) */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.classList.add('hidden');
    }
  }, 3000); // Set to 3 seconds for a smooth intro delay
});

/* ==========================================================================
   Envelope Unfolding Toggle Logic
   ========================================================================== */
function toggleEnvelope() {
  const envelope = document.getElementById('envelope');
  if (envelope) {
    envelope.classList.toggle('open');
  }
}

/* ==========================================================================
   Secret Note Modal Logic
   ========================================================================== */
function openSecretModal() {
  const modal = document.getElementById('secretModal');
  const loading = document.getElementById('secretLoading');
  const content = document.getElementById('secretContent');

  if (modal && loading && content) {
    // Reset to loading state
    loading.style.display = 'block';
    content.classList.add('hidden');
    modal.classList.add('active');

    // Secret message loading delay (2.5 seconds)
    setTimeout(() => {
      loading.style.display = 'none';
      content.classList.remove('hidden');
    }, 2500);
  }
}

function closeSecretModal(event) {
  if (!event || event.target.id === 'secretModal') {
    const modal = document.getElementById('secretModal');
    if (modal) modal.classList.remove('active');
  }
}

function closeSecretModalForce() {
  const modal = document.getElementById('secretModal');
  if (modal) modal.classList.remove('active');
}

/* ==========================================================================
   Falling Petals Canvas Animation
   ========================================================================== */
const canvas = document.getElementById('petalCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Petal {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height - height;
      this.size = Math.random() * 12 + 8;
      this.speed = Math.random() * 1.5 + 0.8;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 2;
      this.oscillation = Math.random() * 0.02;
      this.color = `rgba(${216 + Math.floor(Math.random() * 30)}, ${
        112 + Math.floor(Math.random() * 40)
      }, ${147 + Math.floor(Math.random() * 30)}, ${Math.random() * 0.4 + 0.4})`;
    }

    update() {
      this.y += this.speed;
      this.x += Math.sin(this.y * this.oscillation);
      this.rotation += this.rotSpeed;

      if (this.y > height + 20) {
        this.y = -20;
        this.x = Math.random() * width;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
      ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  const petals = Array.from({ length: 35 }, () => new Petal());

  function animatePetals() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach((petal) => {
      petal.update();
      petal.draw();
    });
    requestAnimationFrame(animatePetals);
  }

  animatePetals();
}

/* ==========================================================================
   Gallery & Lightbox Functionality
   ========================================================================== */
const galleryImages = [
  'ummi (1).jpeg',
  'ummi (4).jpeg',
  'ummi (2).jpeg',
  'ummi (3).jpeg',
  'ummi (5).jpeg',
  'ummi (6).jpeg'
];

let currentImgIdx = 0;

function openLightbox(index) {
  currentImgIdx = index;
  const imgElem = document.getElementById('lightboxImg');
  const lightbox = document.getElementById('lightbox');
  
  if (imgElem && lightbox) {
    imgElem.src = galleryImages[currentImgIdx];
    lightbox.classList.add('active');
  }
}

function closeLightbox(event) {
  if (!event || event.target.id === 'lightbox') {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.remove('active');
  }
}

function closeLightboxForce() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) lightbox.classList.remove('active');
}

function changeLightboxImg(step, event) {
  if (event) event.stopPropagation();
  currentImgIdx = (currentImgIdx + step + galleryImages.length) % galleryImages.length;
  const imgElem = document.getElementById('lightboxImg');
  if (imgElem) {
    imgElem.src = galleryImages[currentImgIdx];
  }
}

// Keyboard shortcuts for Lightbox & Modal
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  const secretModal = document.getElementById('secretModal');

  if (e.key === 'Escape') {
    if (lightbox && lightbox.classList.contains('active')) closeLightboxForce();
    if (secretModal && secretModal.classList.contains('active')) closeSecretModalForce();
  }

  if (lightbox && lightbox.classList.contains('active')) {
    if (e.key === 'ArrowLeft') changeLightboxImg(-1);
    if (e.key === 'ArrowRight') changeLightboxImg(1);
  }
});