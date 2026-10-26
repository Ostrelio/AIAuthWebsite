import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const pages = {
  'index.html': ['assets/utilities.css', 'styles.css', 'main.js'],
  'privacy/index.html': ['legal.css'],
  'terms/index.html': ['legal.css'],
  'disclaimer/index.html': ['legal.css'],
};

// Keep each page and its styles/controller together across cached reloads.
for (const [page, assets] of Object.entries(pages)) {
  let html = readFileSync(page, 'utf8');
  for (const file of assets) {
    const hash = createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 12);
    const escaped = file.replaceAll('.', '\\.');
    const reference = new RegExp(`((?:href|src)="(?:/|\\./)?${escaped})(?:\\?v=[^"\\s]*)?"`, 'g');
    assert.equal([...html.matchAll(reference)].length, 1, `Expected one reference to ${file} in ${page}`);
    html = html.replace(reference, `$1?v=${hash}"`);
  }
  writeFileSync(page, html);
}
