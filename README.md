# Canvas Print

A premium, bilingual (English / বাংলা) marketing website for a printing service company in Sunamganj, Bangladesh. Built with **plain HTML, CSS, and JavaScript** — PHP is used **only** for form submissions.

## Stack

- **HTML** — static pages, one file per route.
- **CSS** — hand-written design system (`assets/css/styles.css` + `components.css`). Big Shoulders Text + Inter, light/dark themes via `[data-theme]`.
- **JavaScript** — vanilla, no framework:
  - `assets/js/i18n.js` — EN/BN translation dictionary + helpers.
  - `assets/js/data.js` — site content/data (services, portfolio, pricing, etc.).
  - `assets/js/artwork.js` — inline SVG icons and generated print mockups.
  - `assets/js/main.js` — loads shared header/footer, renders sections, applies translations, wires up all interactions (menu, theme, language, reveal-on-scroll, counters, carousel, accordion, portfolio filter, lightbox, multi-step quote form, AJAX form submit).
- **PHP** — only inside `forms/` for handling submissions via `mail()`.

## Project structure

```
/                     index.html and all page .html files
/partials/            header.html, footer.html (injected client-side)
/assets/css/          styles.css, components.css
/assets/js/           i18n.js, data.js, artwork.js, main.js
/assets/img/          favicon.svg, og.svg
/forms/               contact.php, quote.php, newsletter.php, _lib.php
.htaccess             pretty URLs, 404, caching, security headers
robots.txt, sitemap.xml
```

## How it works

- **Shared header/footer**: each page has `<div data-include="/partials/header.html"></div>`; `main.js` fetches and injects them, so there's a single source to edit.
- **Language toggle (EN/বাংলা)**: client-side. Selection is stored in `localStorage`. All static text uses `data-i18n="key"`; dynamic lists are re-rendered from `data.js` on switch.
- **Theme toggle (light/dark)**: stored in `localStorage`, applied before paint to avoid flashes.
- **Forms**: submitted via `fetch` to the PHP handlers, which validate input and email the submission. On success the UI swaps to a confirmation panel.

## Configure before deploying

1. **Email recipient** — edit `MAIL_TO` (and `MAIL_FROM`) in `forms/_lib.php`.
2. **Business details** — phone, email, address, socials live in `assets/js/data.js` (`window.SITE`).
3. **Domain** — update canonical/OG URLs in each page `<head>` and in `sitemap.xml` / `robots.txt`.

## Running locally

Any PHP-capable server works. For a quick local preview:

```bash
php -S 127.0.0.1:8000
```

Then open <http://127.0.0.1:8000>. (Forms need PHP; `mail()` won't actually send without a configured MTA, but the success flow still works for testing.)

## Deploying

Upload the project to any PHP-enabled host (shared hosting, cPanel, etc.). No build step required.
