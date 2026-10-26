# Ostrelio

Static landing page for ostrelio.com.

The previous Next.js site is preserved on the `archive/previous-site` branch.

CSS is built locally, with no Tailwind runtime CDN. After changing HTML, CSS, or JavaScript, run:

```sh
npm ci
npm run build
```

The build also updates content versions on local CSS and JavaScript URLs so browsers fetch matching assets. Commit the generated `assets/utilities.css` and updated `index.html` with the page changes.

Legal notices are at `/privacy/`, `/terms/`, and `/disclaimer/`. They cover this public website and its access form, not a separately provided product. Keep them aligned with the actual data handling and have the text reviewed before publication.

Run `npm test` for the reduced-motion regression checks.
