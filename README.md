# Top Volleyball College Showcase — Website

A single-page site for a volleyball college showcase: event info, attending schools, pricing, and registration links for coaches and athletes.

## Structure

- `index.html` — page content/sections
- `css/style.css` — styles
- `js/script.js` — mobile nav toggle, lightbox, and the live Schools Attending fetch (see below)
- `assets/photos/` — hero background photo (not yet uploaded) and gallery photos (10 in place — see "Photos" below)

## What to customize

Event name (Top Series), date, time, location, cost, and both registration
links (Stripe for athletes, Google Form for coaches) are all filled in.
Footer email is set to `mattb@millcityvolleyball.com`.

### Schools Attending (live from the coach-registration sheet)

Instead of a fixed list of school logos, the "Schools Attending" carousel
is populated live, in the visitor's browser, from the **Colleges
Attending** column of the coach-registration Google Sheet (the same sheet
the Google Form coaches fill out feeds into):
`https://docs.google.com/spreadsheets/d/15v9dF4NC7_vXxavY_G7fQtKBKfDA-fmzP0ufJ1prKVY/edit?gid=356780953`

How it works (all in `js/script.js`, `loadSchoolsCarousel()`):

1. On page load (and again every 5 minutes, for anyone who leaves the tab
   open), it fetches the sheet's public CSV export —
   `.../export?format=csv&gid=356780953` — no login or API key, since the
   sheet is shared as "Anyone with the link — Viewer."
2. It finds the **Colleges Attending** column by header name, collects
   every non-blank value, and de-duplicates it (so 3 coaches from the
   same school only show up once), keeping first-seen order.
3. It builds the scrolling chips from that list — same carousel mechanics
   as the gallery (two identical back-to-back sets for a seamless loop,
   `aria-hidden` on the duplicate set), but as text pills (`.school-chip`)
   instead of images. Scroll speed is computed from the list's total
   width so it always feels the same pace regardless of how many schools
   are in it.
4. The section (and its nav link) start `hidden` in the HTML and only get
   un-hidden once real names load — if the sheet is ever made private,
   renamed, or the column header changes, the section just stays hidden
   instead of showing broken/empty.

**If this stops working:**
- Make sure the sheet is still shared as "Anyone with the link — Viewer." If it's switched to private, the fetch will fail and the section will silently stay hidden.
- Make sure the column header in row 1 is still exactly `Colleges Attending` (matching `SCHOOLS_COLUMN_HEADER` in `js/script.js`) — if the form/sheet owner renames that column, update the constant to match.
- If the sheet's URL or tab (`gid`) ever changes, update `SCHOOLS_SHEET_CSV_URL` in `js/script.js` to match.
- Open the browser console on the live site — a failed fetch logs `"Schools carousel: could not load live roster."` with the underlying error.

The old placeholder logo-based carousel markup has been fully replaced,
not just hidden behind a flag — if logos are wanted again later instead
of (or alongside) live names, that's a new build, not a toggle.

Pricing ($100, T-shirt included) is already set in the "Registration Cost" section — edit `.price-includes` list items if what's included changes.

### Photos (hero background + gallery)

Gallery has 10 real photos in place (`assets/photos/gallery-1.jpg` through
`gallery-10.jpg`). The hero background photo (`hero-collage.jpg`) is still
missing — until it's uploaded, the hero falls back to the plain teal
gradient.

**Filenames expected** (drop files into `assets/photos/` with these exact names):

- `hero-collage.jpg` — used as the hero section's background image (not yet uploaded)
- `gallery-1.jpg` through `gallery-10.jpg` — done

**Important — upload straight into `assets/photos/`:** the first batch of
gallery photos landed in the wrong folder (`assets/logos/`, and one in the
repo root) since GitHub's upload UI defaults to whatever folder you last
viewed — double check you're inside `assets/photos/` before clicking
"Add file → Upload files".

**Before uploading, resize/compress** (GitHub's web upload caps at 25MB/file,
and full-resolution photos slow the page down for no visual benefit at web
sizes — the 10 gallery photos came in at 4–21MB each and were resized
down to ~85–230KB with no visible quality loss):

- Hero photo: resize to ~1600–2000px on the long edge, export as JPEG at
  ~80% quality (target under ~1MB)
- Gallery photos: resize to ~1200px on the long edge, JPEG at ~75–80%
  quality (target under ~150–200KB each)

Any photo editor's "export"/"resize" option works, or a free tool like
[Squoosh](https://squoosh.app).

**Gallery display:** like the school logo carousel, the Gallery section is
an auto-scrolling, full-bleed carousel with no visible on-screen heading
(there's a visually-hidden `<h2>Gallery</h2>` for screen readers only).
Click any photo to open it in the lightbox; hovering pauses the scroll.

**Important:** just like the logo carousel, the gallery track is built from
two identical, back-to-back copies of the photo list (marked with an HTML
comment in `index.html`) so the scroll loop is seamless. The duplicate
set's `alt` attributes are intentionally empty (`aria-hidden="true"`) —
screen readers only need each photo once, and the lightbox JS in
`js/script.js` de-dupes by the `data-index` attribute so clicking either
copy of a photo always opens the correct one with its real `alt` text.

**To add more gallery photos later:** upload the next sequential
`gallery-N.jpg`, then in `index.html` add one `.gallery-item` block to
*both* sets (original and duplicate) inside `.gallery-track`, with the next
sequential filename, `alt` text, and `data-index` — matching how the logo
carousel is extended.

**To change the gallery's scroll speed:** edit `animation: scroll-gallery
55s linear infinite;` in `css/style.css` (`.gallery-track`) — a bigger
number scrolls slower.

### Brand styling

Palette and type are pulled from the official "Top Series Showcase" event flyer: a deep teal-black ground (`--ink`/`--ink-dark`), a gold accent (`--gold`/`--gold-dark`/`--gold-deep`), the display font **Anton** (bold condensed headings, matches the flyer's "SHOWCASE" wordmark) and **Kaushan Script** (the "Top Series" script logotype, used via the `.script-name` / `.logo-script` classes). To adjust the palette, edit the tokens at the top of `css/style.css`; to swap fonts, update the Google Fonts `<link>` in `index.html` and the `font-family` values in `css/style.css`.

## Running locally

No build step required — just open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Deploying

Static files only, so this works as-is on GitHub Pages, Netlify, Vercel, or any static host.
