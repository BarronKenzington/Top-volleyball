# Top Volleyball College Showcase — Website

A single-page site for a volleyball college showcase: event info, attending schools, pricing, and registration links for coaches and athletes.

## Structure

- `index.html` — page content/sections
- `css/style.css` — styles
- `js/script.js` — mobile nav toggle
- `assets/logos/` — school logo images used in the carousel (currently placeholder badges)

## What to customize

Event name (Top Series), date, time, location, and cost are all filled in. What's left in `index.html`:

- "Register as a Coach" / "Coach Registration" buttons (`href="#"`) — replace with your real external coach-registration link. "Register as an Athlete" / "Athlete Registration" already point to the Stripe purchase link ($100, T-shirt included).
- Footer email (`info@example.com`) — replace with your contact address.

### School logos (carousel)

The "Schools Attending" section is an auto-scrolling logo carousel. To use real logos:

1. Drop each school's logo into `assets/logos/` (transparent PNG or SVG works best; roughly square, at least 200×200px so it stays sharp).
2. In `index.html`, find the `.logo-track` div and update each `<img src="assets/logos/school-N.svg" alt="[School Name N]">` — point `src` at your new file and set `alt` to the real school name.
3. **Important:** the carousel is built from two identical, back-to-back copies of the logo list (marked with an HTML comment) so the scroll loop is seamless. Whatever you change in the first set, make the same change in the second (duplicate) set below it — otherwise the loop will jump. The duplicate set's `alt` attributes are intentionally left empty (`aria-hidden="true"`) since screen readers only need the names once.
4. To add or remove schools, add/remove one `.logo-item` in *both* sets, keeping the sets identical.
5. To change scroll speed, edit `animation: scroll-logos 28s linear infinite;` in `css/style.css` (`.logo-track`) — a bigger number scrolls slower. Hovering over the carousel pauses it.

Pricing ($100, T-shirt included) is already set in the "Registration Cost" section — edit `.price-includes` list items if what's included changes.

## Running locally

No build step required — just open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Deploying

Static files only, so this works as-is on GitHub Pages, Netlify, Vercel, or any static host.
