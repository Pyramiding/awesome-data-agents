import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const link = match[1];
  if (/^https?:\/\//.test(link)) continue;
  if (link.startsWith('#')) { assert(ids.includes(link.slice(1)), 'Missing anchor ' + link); continue; }
  assert(fs.existsSync(path.resolve(root, link.split(/[?#]/)[0])), 'Missing asset ' + link);
}
for (const file of ['assets/catalog.js', 'assets/app.js', 'assets/theme.js']) {
  const checked = spawnSync(process.execPath, ['--check', path.join(root, file)], { encoding: 'utf8' });
  assert.equal(checked.status, 0, checked.stderr);
}
const app = fs.readFileSync(path.join(root, 'assets/app.js'), 'utf8');
for (const match of app.matchAll(/\$\('([^']+)'\)/g)) assert(ids.includes(match[1]), 'Missing application element ' + match[1]);
assert(!/<script(?![^>]*\bsrc=)[^>]*>/i.test(html), 'Keep executable scripts in local files');
assert(html.includes('script-src \'self\''), 'Missing script policy');
assert(fs.existsSync(path.join(root, '.nojekyll')), 'Missing static Pages marker');
console.log('Site checks passed: assets, anchors, unique IDs, module syntax and static Pages entry.');
