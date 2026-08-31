# Top Volleyball College Showcase — Website

A single-page site for a volleyball college showcase: event info, attending schools, pricing, and registration links for coaches and athletes.

## Structure

- `index.html` — page content/sections
- `css/style.css` — styles
- `js/script.js` — mobile nav toggle

## What to customize

All placeholders are in `index.html`, marked with `[BRACKETS]`:

- `[EVENT NAME]` — showcase name (appears in title, hero, and footer)
- `[EVENT DATE]` — event date(s)
- `[EVENT LOCATION]` — venue/city
- `[School Name 1]`–`[School Name 8]` — attending schools grid (add/remove `.school-card` divs as needed)
- Registration buttons (`href="#"`) — replace with your real external registration links, one for athletes and one for coaches. There are two sets: in the hero and in the "Register" section at the bottom.
- Footer email (`info@example.com`) — replace with your contact address.

Pricing ($80, T-shirt included) is already set in the "Registration Cost" section — edit `.price-includes` list items if what's included changes.

## Running locally

No build step required — just open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Deploying

Static files only, so this works as-is on GitHub Pages, Netlify, Vercel, or any static host.
