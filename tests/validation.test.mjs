import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validDate, validateCatalog } from '../scripts/validate-catalog.mjs';

const read = name => fs.readFileSync(new URL('../' + name, import.meta.url), 'utf8');
const catalog = JSON.parse(read('resources.json'));
const docs = { readme: read('README.md'), methodology: read('METHODOLOGY.md'), today: '2099-12-31' };
function invalid(change, pattern) {
  const data = structuredClone(catalog);
  change(data);
  assert(validateCatalog(data, docs).some(error => pattern.test(error)), `Expected validation failure: ${pattern}`);
}

test('real catalog and published documentation agree', () => assert.deepEqual(validateCatalog(catalog, docs), []));
test('calendar validation rejects rollover, reversed ranges and malformed precision', () => {
  for (const date of ['2026-02-29', '2026-02-30', '2026-13-01', '2026-1-1', '2026', '', null]) assert.equal(validDate(date), false);
  assert(validDate('2024-02-29'));
  assert(validDate('2026-05', { partial: true }));
  assert(validDate('2026-10-22/2026-10-24', { range: true }));
  assert(!validDate('2026-10-24/2026-10-22', { range: true }));
  assert(!validDate('2026-10/2026-11', { range: true }));
});
test('duplicate IDs, canonical URLs and missing required fields fail', () => {
  invalid(d => { d.resources[1].id = d.resources[0].id; }, /duplicate ID/);
  invalid(d => { d.resources[1].url = d.resources[0].url + '#other'; }, /duplicate canonical URL/);
  invalid(d => { delete d.resources[0].title; }, /title is required/);
  invalid(d => { d.resources[0].section = '__proto__'; }, /unsupported section/);
  invalid(d => { d.resources[0].status = 'latest'; }, /unsupported status/);
  invalid(d => { d.resources[0].date_basis = 'crawled'; }, /unsupported date_basis/);
  invalid(d => { d.resources[0].tags = ['sql', 'sql']; }, /tags must/);
});
test('evidence requires paired labels, valid nested links and honest dates', () => {
  invalid(d => { d.resources[0].license = 'MIT'; }, /license label and source/);
  invalid(d => { d.resources[0].evidence_url = 'https://example.org'; }, /date evidence and source/);
  invalid(d => { d.resources[0].reading_path = [{ title: 'Unsafe', focus: 'SQL', url: 'javascript:alert(1)' }]; }, /HTTP\(S\)/);
  invalid(d => { d.resources[0].supporting_urls = ['https://user:password@example.org']; }, /HTTP\(S\)/);
  invalid(d => { d.resources[0].last_verified = '2026-02-30'; }, /last_verified is invalid/);
  invalid(d => { d.resources[0].last_verified = '2100-01-01'; }, /cannot be in the future/);
  invalid(d => { d.resources[0].archived = true; }, /archived flag\/status/);
  invalid(d => { d.resources[0].release_updates = [{ version: 'v1', published_at: '2026-02-30T12:00:00Z', url: 'https://example.org/release' }]; }, /valid UTC timestamp/);
  invalid(d => { d.resources[0].release_updates = [{ version: 'v1', published_at: '2026-02-20T24:00:00Z', url: 'https://example.org/release' }]; }, /valid UTC timestamp/);
});
test('refresh history rejects unknown IDs, duplicate IDs and invented totals', () => {
  invalid(d => { d.refresh_history[0].updated_ids.push('missing-resource'); }, /unknown or duplicate IDs/);
  invalid(d => { d.refresh_history[0].added_total++; }, /added_total does not match/);
  invalid(d => { d.refresh_history[0].previous_total++; }, /latest totals disagree/);
  invalid(d => { d.refresh_history[1].as_of = '2099-12-31'; }, /invalid review window|newest first/);
  invalid(d => { d.refresh_history[0].base_commit = 'main'; }, /full Git SHA/);
  invalid(d => { d.refresh_history[0].added_ids = 'wrong'; }, /added_ids must be an array/);
});
test('README totals, section counts, cutoff and source coverage are checked', () => {
  const broken = docs.readme.replace(/\*\*\d+ 条资料\*\*/, '**999 条资料**').replace(/`\d+` 公开实现/, '`999` 公开实现').replace('**资料截止：', '**历史截止：');
  const errors = validateCatalog(catalog, { ...docs, readme: broken });
  for (const message of ['README total', 'README open-source count', 'README cutoff']) assert(errors.some(error => error.startsWith(message)));
  assert(validateCatalog(catalog, { ...docs, readme: docs.readme.replaceAll(catalog.resources[0].url, 'https://example.org') }).some(error => error.includes('missing canonical source')));
  assert(validateCatalog(catalog, { ...docs, methodology: '' }).some(error => error.includes('METHODOLOGY cutoff')));
});
