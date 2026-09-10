# Top Volleyball College Showcase — Website

A single-page site for a volleyball college showcase: event info, attending schools, pricing, and registration links for coaches and athletes.

## Structure

- `index.html` — page content/sections
- `css/style.css` — styles
- `js/script.js` — mobile nav toggle
- `assets/logos/` — school logo images used in the carousel (currently placeholder badges)
- `assets/photos/` — hero background photo and gallery photos (not yet uploaded — see "Photos" below)

## What to customize

Event name (Top Series), date, time, location, and cost are all filled in. What's left in `index.html`:

- "Register as a Coach" / "Coach Registration" buttons (`href="#"`) — replace with your real external coach-registration link. "Register as an Athlete" / "Athlete Registration" already point to the Stripe purchase link ($100, T-shirt included).
- Footer email (`info@example.com`) — replace with your contact address.

### School logos (carousel)

**Currently disabled** — the "Schools Attending" section only had placeholder
logos, so it's hidden for now (both the section and its nav link are
commented out / marked `hidden` in `index.html`, not deleted). To turn it
back on once you have real logos:

1. In `index.html`, remove the `hidden` attribute from
   `<section class="schools" id="schools" hidden>`, and uncomment the nav
   link (`<!-- <a href="#schools">Schools</a> -->`).
2. Then follow the steps below to swap in real logos.

The "Schools Attending" section is an auto-scrolling logo carousel. To use real logos:

1. Drop each school's logo into `assets/logos/` (transparent PNG or SVG works best; roughly square, at least 200×200px so it stays sharp).
2. In `index.html`, find the `.logo-track` div and update each `<img src="assets/logos/school-N.svg" alt="[School Name N]">` — point `src` at your new file and set `alt` to the real school name.
3. **Important:** the carousel is built from two identical, back-to-back copies of the logo list (marked with an HTML comment) so the scroll loop is seamless. Whatever you change in the first set, make the same change in the second (duplicate) set below it — otherwise the loop will jump. The duplicate set's `alt` attributes are intentionally left empty (`aria-hidden="true"`) since screen readers only need the names once.
4. To add or remove schools, add/remove one `.logo-item` in *both* sets, keeping the sets identical.
5. To change scroll speed, edit `animation: scroll-logos 28s linear infinite;` in `css/style.css` (`.logo-track`) — a bigger number scrolls slower. Hovering over the carousel pauses it.

Pricing ($100, T-shirt included) is already set in the "Registration Cost" section — edit `.price-includes` list items if what's included changes.

### Photos (hero background + gallery)

The hero background and the "Gallery" section both expect real photo files
that aren't in the repo yet — until they're uploaded, the hero falls back
to the plain teal gradient and gallery tiles show as empty tinted boxes.

**Filenames expected** (drop files into `assets/photos/` with these exact names):

- `hero-collage.jpg` — used as the hero section's background image
- `gallery-1.jpg` through `gallery-12.jpg` — the 12 tiles in the Gallery section

**Before uploading, resize/compress** (GitHub's web upload caps at 25MB/file,
and full-resolution photos slow the page down for no visual benefit at web
sizes):

- Hero photo: resize to ~1600–2000px on the long edge, export as JPEG at
  ~80% quality (target under ~1MB)
- Gallery photos: resize to ~1200px on the long edge, JPEG at ~75–80%
  quality (target under ~400–500KB each — with 12 photos that keeps total
  page weight reasonable)

Any photo editor's "export"/"resize" option works, or a free tool like
[Squoosh](https://squoosh.app).

**To add more gallery photos later:** upload the next sequential
`gallery-N.jpg`, then in `index.html` duplicate one `.gallery-item` block
inside `.gallery-grid`, bumping the filename, `alt` text, and `data-index`
(next sequential number) to match.

### Brand styling

Palette and type are pulled from the official "Top Series Showcase" event flyer: a deep teal-black ground (`--ink`/`--ink-dark`), a gold accent (`--gold`/`--gold-dark`/`--gold-deep`), the display font **Anton** (bold condensed headings, matches the flyer's "SHOWCASE" wordmark) and **Kaushan Script** (the "Top Series" script logotype, used via the `.script-name` / `.logo-script` classes). To adjust the palette, edit the tokens at the top of `css/style.css`; to swap fonts, update the Google Fonts `<link>` in `index.html` and the `font-family` values in `css/style.css`.

## Running locally

No build step required — just open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Deploying

Static files only, so this works as-is on GitHub Pages, Netlify, Vercel, or any static host.
