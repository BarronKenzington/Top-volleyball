const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const galleryTrackImages = Array.from(document.querySelectorAll('.gallery-item img'));
// The carousel duplicates each photo (for the seamless scroll loop), so
// de-dupe by data-index to get the real, ordered list of unique photos.
const galleryImages = [];
galleryTrackImages.forEach((img) => {
  const idx = Number(img.dataset.index);
  if (!galleryImages[idx]) galleryImages[idx] = img;
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentIndex = 0;

function showImage(index) {
  currentIndex = (index + galleryImages.length) % galleryImages.length;
  const img = galleryImages[currentIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
}

function openLightbox(index) {
  showImage(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}

galleryTrackImages.forEach((img) => {
  img.addEventListener('click', () => openLightbox(Number(img.dataset.index)));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => showImage(currentIndex - 1));
lightboxNext.addEventListener('click', () => showImage(currentIndex + 1));

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
  if (event.key === 'ArrowRight') showImage(currentIndex + 1);
});

// Schools Attending roster. Static list, updated by hand as coaches
// register — edit this array to add/remove schools.
const SCHOOL_NAMES = [
  'St John Fisher University',
  'Muhlenberg College',
  'Keene State College',
  'Western New England University',
  'Western Connecticut',
  'Elmira College',
  'Clarkson University',
  'SUNY Plattsburgh',
  'Russell Sage',
  'Colby Sawyer College',
  'Bryn Mawr College',
  'Oswego State',
  'Springfield College',
  'Nazareth University',
  'Union College',
  'University of Rochester',
  'SUNY Polytechnic Institute',
  'Middlebury College',
  'Rivier University',
  'Skidmore College',
];
const SCHOOLS_SCROLL_PX_PER_SECOND = 45;

function buildSchoolChip(name, isHidden) {
  const chip = document.createElement('div');
  chip.className = 'school-chip';
  chip.textContent = name;
  if (isHidden) chip.setAttribute('aria-hidden', 'true');
  return chip;
}

function renderSchoolsCarousel() {
  const track = document.getElementById('schoolsTrack');
  if (!track) return;

  track.innerHTML = '';
  SCHOOL_NAMES.forEach((name) => track.appendChild(buildSchoolChip(name, false)));
  SCHOOL_NAMES.forEach((name) => track.appendChild(buildSchoolChip(name, true)));

  const halfWidth = track.scrollWidth / 2;
  const duration = Math.max(halfWidth / SCHOOLS_SCROLL_PX_PER_SECOND, 12);
  track.style.animationDuration = duration + 's';
}

renderSchoolsCarousel();
