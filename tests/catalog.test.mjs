import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { SECTIONS, STATUSES, DEFAULT_STATE, safeUrl, readState, stateSearch, dateKey,
  displayDate, readmeNotes, prepareResources, selectResources, sectionCounts
} from '../assets/catalog.js';

const fixtures = [
  { id: 'context', title: 'Context engine', organization: 'Team A', url: 'https://example.com/a', section: 'architecture', language: 'en', status: 'published', date: '2026-06', tags: ['context'], added_on: '2026-11-05' },
  { id: 'sandbox', title: 'Sandbox 数据分析', organization: 'Team B', url: 'https://example.com/b', section: 'open-source', language: 'zh', status: 'early', date: '2026-10-20', tags: ['sandbox', 'mcp'], summary: '原始导读', added_on: '2026-10-22' },
  { id: 'agenda', title: 'Data Agent conference', organization: 'Team C', url: 'https://example.com/c', section: 'talk', language: 'en', status: 'agenda', date: '2026-10-22/2026-10-24', tags: ['mcp'] }
];
const state = patch => ({ ...DEFAULT_STATE, ...patch });
const prepared = prepareResources(fixtures);

test('external links only allow absolute HTTP(S) URLs', () => {
  assert.equal(safeUrl('https://example.com/a?q=x'), 'https://example.com/a?q=x');
  assert.equal(safeUrl('http://example.com'), 'http://example.com/');
  for (const url of ['javascript:alert(1)', 'data:text/html,<script>', '//example.com', 'ftp://example.com', '/relative', null]) assert.equal(safeUrl(url), null);
});

test('date ordering respects month precision and event ranges', () => {
  assert.equal(dateKey('2026-06'), 20260601);
  assert.equal(dateKey('2026-10-22/2026-10-24'), 20261022);
  assert.equal(dateKey(''), 0);
  assert.equal(displayDate('2026-10-22/2026-10-24'), '2026-10-22 — 2026-10-24');
  assert.equal(displayDate('2026-06'), '2026-06');
});

test('shared URLs preserve Unicode, punctuation and combined filters', () => {
  const original = state({ q: '语义层 & "SQL" #1', section: 'architecture', lang: 'zh', status: 'published', tag: 'context', sort: 'added', latest: true, saved: true, resource: 'a/b' });
  assert.deepEqual(readState(stateSearch(original)), original);
  assert.deepEqual(readState('?type=unknown&status=__proto__&sort=bad&lang=other'), state({}));
  assert.equal(readState('?q=' + 'x'.repeat(300)).q.length, 256);
});

test('README fallback reuses authored notes and never changes original records', () => {
  const markdown = '- **[Context engine](https://example.com/a)** — 有来源的 **上下文** 导读。\n- **[Sandbox](https://example.com/b)** — 不应覆盖原摘要。';
  const before = JSON.stringify(fixtures);
  const next = prepareResources(fixtures, markdown);
  assert.equal(next[0].display_summary, '有来源的 上下文 导读。');
  assert.equal(next[0].summary_source, 'readme');
  assert.equal(next[1].display_summary, '原始导读');
  assert.equal(JSON.stringify(fixtures), before);
  assert.equal(readmeNotes('Unstructured prose https://example.com/a', fixtures).size, 0);
});

test('search combines terms and recognizes Chinese topic labels', () => {
  assert.deepEqual(selectResources(prepared, state({ q: '沙箱 MCP' })).map(r => r.id), ['sandbox']);
  assert.deepEqual(selectResources(prepared, state({ q: 'Team B', lang: 'zh', status: 'early', section: 'open-source' })).map(r => r.id), ['sandbox']);
  assert.equal(selectResources(prepared, state({ q: '不存在的关键词' })).length, 0);
  assert.equal(selectResources(prepared, state({ q: 'Team B', lang: 'en' })).length, 0);
});

test('status and category filters keep agenda distinct from published material', () => {
  assert.deepEqual(selectResources(prepared, state({ status: 'agenda' })).map(r => r.id), ['agenda']);
  assert.deepEqual(selectResources(prepared, state({ status: 'published' })).map(r => r.id), ['context']);
  assert.equal(selectResources(prepared, state({ tag: 'mcp' })).length, 2);
});

test('favorites and latest batch use exact stable IDs, including empty collections', () => {
  assert.equal(selectResources(prepared, state({ saved: true })).length, 0);
  assert.deepEqual(selectResources(prepared, state({ saved: true }), { saved: new Set(['context']) }).map(r => r.id), ['context']);
  assert.deepEqual(selectResources(prepared, state({ latest: true }), { latest: new Set(['sandbox']) }).map(r => r.id), ['sandbox']);
});

test('sort by source date and discovery date are independent', () => {
  assert.deepEqual(selectResources(prepared, state({ sort: 'date' })).map(r => r.id), ['agenda', 'sandbox', 'context']);
  assert.deepEqual(selectResources(prepared, state({ sort: 'added' })).map(r => r.id), ['context', 'sandbox', 'agenda']);
  assert.deepEqual(prepared.map(r => r.id), ['context', 'sandbox', 'agenda']);
});

test('real catalog has unique IDs, safe sources, supported facets and exact counts', () => {
  const data = JSON.parse(fs.readFileSync(new URL('../resources.json', import.meta.url), 'utf8'));
  const markdown = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');
  const records = prepareResources(data.resources, markdown);
  const ids = new Set();
  for (const r of records) {
    assert(!ids.has(r.id), 'Duplicate ID: ' + r.id); ids.add(r.id);
    assert(safeUrl(r.url), 'Unsafe source: ' + r.id);
    assert(SECTIONS.some(s => s.id === r.section), 'Unsupported category: ' + r.id);
    assert(Object.hasOwn(STATUSES, r.status), 'Unsupported status: ' + r.id);
    assert(['zh', 'en'].includes(r.language), 'Unsupported language: ' + r.id);
  }
  assert.equal(Object.values(sectionCounts(records)).reduce((a, b) => a + b, 0), records.length);
  assert.equal(selectResources(records, state({})).length, data.resources.length);
  assert(records.filter(r => r.display_summary).length > records.length * .8, 'README annotations should cover most entries');
  assert(data.refresh_history[0].added_ids.every(id => ids.has(id)));
});
