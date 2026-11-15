# Dhrubajyoti Sharma — Cinematic Portfolio

A static site (HTML, CSS, vanilla JS). No build step, no dependencies, no paid services.

## 1. Install dependencies
None. Only needed for local preview: Node.js or Python.

## 2. Run locally
    python3 -m http.server 8080      # then open http://localhost:8080
(or `npx serve .`). Opening index.html directly also works, but use a server to test properly.

## 3. Replace your photograph
Overwrite `assets/profile/dhrubajyoti.png` (square, at least 800×800 px works best). Keep the same name, or change the `src` in `index.html` and the `og:image` tag.

## 4. Replace company logos
Overwrite `assets/logos/webli.png`, `pageexplorer.png`, `studytracker.png`. Logos display on a white tile, so light or white-background logos look best.

## 5. Add or edit projects
Open `js/config.js`, find `projects`, and copy one entry. Put the screenshot in `assets/projects/` (e.g. `project-01.png`), then set `hasImage: true` on that project. Fill `tech: []` only with technologies you have verified.

## 6. Update personal information
All text content lives in `js/config.js`: email, social links (empty = "soon"), phone (hidden unless `showPhone: true`), skills, companies and projects. The hero, About and Vision wording is in `index.html`.

## 7. Contact form
Create a Formspree (or Web3Forms) endpoint and paste its URL into `formEndpoint` in `js/config.js`. Until then the form honestly shows "not connected".

## 8. Deploy: GitHub + Cloudflare Pages
1. Create a GitHub repo and push this folder (`git init && git add . && git commit -m "portfolio" && git push`).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Framework preset: **None**. Build command: *(leave empty)*. Build output directory: `/`.
4. Save and Deploy. `404.html` is used automatically for missing pages.
5. Update the `og:image` URL in `index.html` to your full domain once live, e.g. `https://yourdomain.com/assets/profile/dhrubajyoti.png`.

## Controls
The site opens as a full-page slideshow that auto-advances from the first page to the last, then switches to normal scrolling. Scroll, swipe, arrow keys or ↑/↓ also change slides. Use ❚❚/▶ to pause or replay, "Skip intro" to finish the typing, and "Free scroll" to leave the slideshow at any time. Reduced-motion settings are respected.
