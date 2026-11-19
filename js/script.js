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

// Live "Schools Attending" roster, pulled from the coach-registration
// Google Sheet. The sheet must stay shared as "Anyone with the link —
// Viewer" for this public CSV export to work with no login.
const SCHOOLS_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/15v9dF4NC7_vXxavY_G7fQtKBKfDA-fmzP0ufJ1prKVY/export?format=csv&gid=356780953';
const SCHOOLS_COLUMN_HEADER = 'Colleges Attending';
const SCHOOLS_REFRESH_MS = 5 * 60 * 1000;
const SCHOOLS_SCROLL_PX_PER_SECOND = 45;

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (char !== '\r') {
      field += char;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function buildSchoolChip(name, isHidden) {
  const chip = document.createElement('div');
  chip.className = 'school-chip';
  chip.textContent = name;
  if (isHidden) chip.setAttribute('aria-hidden', 'true');
  return chip;
}

async function loadSchoolsCarousel() {
  const section = document.getElementById('schools');
  const track = document.getElementById('schoolsTrack');
  if (!section || !track) return;

  try {
    const response = await fetch(SCHOOLS_SHEET_CSV_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error('Sheet fetch failed: ' + response.status);
    const rows = parseCsv(await response.text());
    if (rows.length < 2) throw new Error('No data rows in sheet');

    const headers = rows[0].map((h) => h.trim());
    const columnIndex = headers.indexOf(SCHOOLS_COLUMN_HEADER);
    if (columnIndex === -1) {
      throw new Error('Column "' + SCHOOLS_COLUMN_HEADER + '" not found');
    }

    const seen = new Set();
    const names = [];
    for (let i = 1; i < rows.length; i++) {
      const raw = (rows[i][columnIndex] || '').trim();
      if (raw && !seen.has(raw)) {
        seen.add(raw);
        names.push(raw);
      }
    }
    if (names.length === 0) throw new Error('No college names found');

    track.innerHTML = '';
    names.forEach((name) => track.appendChild(buildSchoolChip(name, false)));
    names.forEach((name) => track.appendChild(buildSchoolChip(name, true)));

    const halfWidth = track.scrollWidth / 2;
    const duration = Math.max(halfWidth / SCHOOLS_SCROLL_PX_PER_SECOND, 12);
    track.style.animationDuration = duration + 's';

    section.hidden = false;
    const navLink = document.querySelector('.nav a[href="#schools"]');
    if (navLink) navLink.hidden = false;
  } catch (err) {
    console.warn('Schools carousel: could not load live roster.', err);
    section.hidden = true;
    const navLink = document.querySelector('.nav a[href="#schools"]');
    if (navLink) navLink.hidden = true;
  }
}

loadSchoolsCarousel();
setInterval(loadSchoolsCarousel, SCHOOLS_REFRESH_MS);
