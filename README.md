# Dhahab Holdings Limited – One-Page Website Preview

Open `index.html` in any modern browser. No build step, server or internet connection is needed.

## Structure
```
index.html          Semantic HTML5, 9 sections in the requested order
style.css           All styles, namespaced "dh-" and scoped to .dh-site
script.js           Vanilla JS (preloader, word reveals, image unveil, parallax,
                    fixed header, mobile menu)
assets/fonts/       Cormorant Garamond + Montserrat, self-hosted (SIL OFL licence)
assets/images/      Logo, favicon and the photo slots listed below
```

## IMPORTANT: photography
The photo files in `assets/images/` (hero, intro, service, audience, approach, closing) are
**tonal gold-and-black placeholders generated for layout review. They are not photographs.**
Real Unsplash/Pexels downloads were not possible in the build environment.
To finish the design, replace each file below with a real photo using the **same filename**
(the layout, crops and parallax need no other changes). Check the licence on each download page.

| File | Size | Suggested search (Unsplash / Pexels) |
|---|---|---|
| hero-gold-mine.jpg | 1920x1080 landscape | "gold mine", "open pit mine sunset", "mining dust golden hour" |
| intro-gold-bars.jpg | 1000x1250 portrait | "gold bars", "gold bullion" |
| service-introductions.jpg | 800x1000 portrait | "gold mining site", "miners at work" |
| service-matching.jpg | 800x1000 portrait | "gold bullion close up", "gold ingots" |
| service-facilitation.jpg | 800x1000 portrait | "mining machinery", "excavator quarry" |
| audience-buyers.jpg | 1400x1400 square | "gold bars dark background", "bullion vault" |
| audience-miners.jpg | 1400x900 landscape | "gold mine landscape", "mining pit aerial" |
| approach-partnership.jpg | 1200x1500 portrait | "gold nuggets hand", "raw gold" |
| closing-contact.jpg | 1920x1080 landscape | "gold dust dark", "mine tunnel light" |

Tips: choose dark, warm, low-key images; export JPG at 75-82% quality, under ~400 KB each.
Update the `alt` text in `index.html` to describe the real photos.

## Logo
`dhahab-logo-original.jpg` is the supplied file, untouched. `dhahab-logo.png` is the same artwork
cropped and with the #1B1B1B background made transparent so it sits cleanly on photography.
`favicon.png` is the gold "H" mark.

## Brand tokens (style.css, section 1)
Gold #D4AF37, Muted Gold #C5A55A, Background #1B1B1B, Ivory #F4F1E8.
Two supporting tones are derived from the background (#151515 deeper, #222120 raised).

## Placeholders to complete
- Footer: email, phone and office address are marked `[ ... ]`.
- Privacy Policy and Compliance links point to `#`.
- Buttons for enquiries scroll to the closing section; "Contact Our Team" scrolls to the footer contact block.
  Wire these to a form or mailto when the real details are available.

## Accessibility and performance
Skip link, visible focus states, ARIA on the menu, `prefers-reduced-motion` disables the preloader,
If JavaScript is disabled, all content is visible.

## WordPress notes
Each section is a self-contained block (`.dh-hero`, `.dh-intro`, `.dh-services`, `.dh-audience`,
`.dh-process`, `.dh-approach`, `.dh-cta`, `.dh-footer`) suitable for Elementor HTML widgets or theme template parts.
Reset rules use `:where()` so they do not out-rank theme styles.

## Revision 2 changes
- Header is fixed and always visible (no hide-on-scroll). Its scrolled background is a pseudo-element, so no
  transform/backdrop-filter sits on the element that contains the mobile drawer (root cause of the menu bug).
- Hamburger menu applies below 1180px so the desktop nav never wraps.
- Full-width layout: the max-width container was removed; side spacing is `--dh-gutter` (style.css, section 1).
- Hero heading is 3 lines at every width; About heading is 2 lines or fewer, with the description aligned to it.
- What We Do cards are equal height with vertically centred text (stacked cards on mobile share equal widths).
- Custom cursor removed (HTML, CSS and JS); the default browser cursor is used.
