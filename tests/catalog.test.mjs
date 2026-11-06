import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { SECTIONS, TOPICS, STATUSES, DEFAULT_STATE, safeUrl, readState, stateSearch, dateKey,
  displayDate, readmeNotes, prepareResources, selectResources, sectionCounts,
  topicCounts, highlightSegments, readingContext, recentHistory, relatedResources
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
  const original = state({ q: '语义层 & "SQL" #1', section: 'architecture', topic: 'context', lang: 'zh', status: 'published', tag: 'context', sort: 'added', latest: true, saved: true, recent: true, resource: 'a/b' });
  assert.deepEqual(readState(stateSearch(original)), original);
  assert.deepEqual(readState('?type=unknown&topic=__proto__&status=__proto__&sort=bad&lang=other'), state({}));
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

test('engineering topics intersect material types and count overlapping resources once per topic', () => {
  assert.deepEqual(selectResources(prepared, state({ topic: 'integration', section: 'talk' })).map(r => r.id), ['agenda']);
  assert.deepEqual(selectResources(prepared, state({ topic: 'execution', lang: 'zh' })).map(r => r.id), ['sandbox']);
  assert.equal(selectResources(prepared, state({ topic: 'context', tag: 'mcp' })).length, 0);
  const overlapping = prepareResources([{ ...fixtures[1], tags: ['mcp', 'api', 'sandbox'] }]);
  const counts = topicCounts(overlapping);
  assert.equal(counts.integration, 1);
  assert.equal(counts.execution, 1);
  assert.equal(counts.context, 0);
  assert.deepEqual(overlapping[0].topics, ['execution', 'integration']);
});

test('highlighting preserves source text, handles overlap and treats query markup literally', () => {
  const text = 'SQL / sql · 语义层 · C++ <img>';
  const parts = highlightSegments(text, 'SQL sql 语义 C++ <img>');
  assert.equal(parts.map(p => p.text).join(''), text);
  assert.deepEqual(parts.filter(p => p.match).map(p => p.text), ['SQL', 'sql', '语义', 'C++', '<img>']);
  assert.deepEqual(highlightSegments('Data Agent', 'data agent Agent'), [{ text: 'Data', match: true }, { text: ' ', match: false }, { text: 'Agent', match: true }]);
  assert.deepEqual(highlightSegments('Data Agent', ''), [{ text: 'Data Agent', match: false }]);
});

test('reader respects filtered order and still opens a shared resource outside current filters', () => {
  const all = selectResources(prepared, state({}));
  const matches = selectResources(prepared, state({ topic: 'integration' }));
  const filtered = readingContext(all, matches, 'sandbox');
  assert.equal(filtered.filtered, true);
  assert.equal(filtered.index, 1);
  assert.deepEqual(filtered.items.map(r => r.id), ['agenda', 'sandbox']);
  const shared = readingContext(all, matches, 'context');
  assert.equal(shared.filtered, false);
  assert.equal(shared.items[shared.index].id, 'context');
  assert.equal(readingContext(all, [], 'missing').index, -1);
});

test('smart search ranks an exact project ahead of a newer incidental mention', () => {
  const records = prepareResources([
    { ...fixtures[0], id: 'project', title: 'WrenAI', date: '2026-01-01' },
    { ...fixtures[1], id: 'article', title: 'Production field notes', summary: 'WrenAI latest production notes', date: '2026-11-06' }
  ]);
  assert.deepEqual(selectResources(records, state({ q: 'WrenAI' })).map(r => r.id), ['project', 'article']);
  assert.deepEqual(selectResources(records, state({ q: 'WrenAI', sort: 'date' })).map(r => r.id), ['article', 'project']);
  assert.equal(readState('?sort=date').sort, 'date');
  assert.equal(readState('?saved=1').saved, true);
});

test('recent browsing is bounded, deduplicated, pruned and ordered independently of source dates', () => {
  assert.deepEqual(recentHistory(['context', 'missing', 'context', null, 'agenda'], new Set(['context', 'agenda'])), ['context', 'agenda']);
  assert.deepEqual(recentHistory({}), []);
  assert.equal(recentHistory(Array.from({ length: 40 }, (_, i) => String(i))).length, 30);
  assert.deepEqual(selectResources(prepared, state({ recent: true }), { recent: ['context', 'agenda'] }).map(r => r.id), ['context', 'agenda']);
  assert.equal(selectResources(prepared, state({ recent: true })).length, 0);
});

test('related resources explain real shared tags and exclude the current or unrelated item', () => {
  const before = JSON.stringify(prepared);
  const related = relatedResources(prepared, prepared[1]);
  assert.deepEqual(related.map(item => item.resource.id), ['agenda']);
  assert.deepEqual(related[0].sharedTags, ['mcp']);
  assert.equal(related[0].sameOrganization, false);
  assert.deepEqual(relatedResources(prepared, prepared[0]), []);
  assert.equal(JSON.stringify(prepared), before);
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
    assert(r.topics.every(id => TOPICS.some(t => t.id === id)));
  }
  assert.equal(Object.values(sectionCounts(records)).reduce((a, b) => a + b, 0), records.length);
  assert.equal(selectResources(records, state({})).length, data.resources.length);
  assert(records.filter(r => r.display_summary).length > records.length * .8, 'README annotations should cover most entries');
  assert(data.refresh_history[0].added_ids.every(id => ids.has(id)));
  for (const count of Object.values(topicCounts(records))) assert(count > 0 && count <= records.length);
});
