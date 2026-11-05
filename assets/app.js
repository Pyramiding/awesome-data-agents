import { SECTIONS, TOPICS, STATUSES, DATE_LABELS, TAG_LABELS, DEFAULT_STATE,
  safeUrl, readState, stateSearch, displayDate, prepareResources, selectResources, sectionCounts,
  topicCounts, highlightSegments, readingContext
} from './catalog.js?v=2';

const $ = id => document.getElementById(id);
const NS = 'http://www.w3.org/2000/svg';
const STORAGE_KEY = 'awesome-data-agents:saved:v1';
const VIEW_KEY = 'awesome-data-agents:view:v1';
const THEME_KEY = 'awesome-data-agents:theme:v1';
const PAGE_SIZE = 24;
let state = readState(location.search);
let resources = [], latest = new Set(), saved = readSaved(), visibleCount = PAGE_SIZE;
let searchTimer, toastTimer, activeDialogId = '', isComposing = false, tocFrame;
let view = readPreference(VIEW_KEY, 'grid') === 'list' ? 'list' : 'grid';
let readerItems = [], readerScope = '筛选结果';
const dialog = $('resource-dialog');

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function icon(name, small = false) {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'icon' + (small ? ' small' : ''));
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS(NS, 'use');
  use.setAttribute('href', '#i-' + name);
  svg.append(use);
  return svg;
}

function externalLink(label, url, className = '') {
  const safe = safeUrl(url);
  if (!safe) return element('span', className, label);
  const a = element('a', className, label);
  a.href = safe; a.target = '_blank'; a.rel = 'noopener noreferrer';
  return a;
}

function readPreference(key, fallback) {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
}

function writePreference(key, value) {
  try { localStorage.setItem(key, value); } catch { /* The current session still works. */ }
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  $('theme-toggle').setAttribute('aria-label', theme === 'light' ? '切换到深色主题' : '切换到浅色主题');
  document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#f3f6fc' : '#080e1b';
}

function highlighted(node, text) {
  for (const part of highlightSegments(text, state.q)) {
    node.append(part.match ? element('mark', '', part.text) : document.createTextNode(part.text));
  }
  return node;
}

function toggleSaved(id, fromReader = false) {
  if (saved.has(id)) saved.delete(id); else saved.add(id);
  writeSaved(); render();
  if (fromReader) syncReaderSave();
  else {
    const replacement = document.querySelector('[data-save-id="' + CSS.escape(id) + '"]');
    (replacement || $('results-heading')).focus({ preventScroll: true });
  }
}

function readSaved() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return new Set(Array.isArray(value) ? value.filter(x => typeof x === 'string').slice(0, 2000) : []);
  } catch { return new Set(); }
}

function writeSaved() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved])); return true; }
  catch { toast('当前浏览器无法保存收藏；本次浏览仍可使用。'); return false; }
}

function toast(message) {
  $('toast').textContent = message; $('toast').hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $('toast').hidden = true; }, 3400);
}

function writeUrl(push = false) {
  const url = location.pathname + stateSearch(state) + location.hash;
  if (push) history.pushState(null, '', url);
  else history.replaceState(null, '', url);
}

function change(patch, { focusResults = false } = {}) {
  clearTimeout(searchTimer); searchTimer = null;
  state = { ...state, q: $('search').value.slice(0, 256), ...patch };
  visibleCount = PAGE_SIZE;
  writeUrl(); render();
  if (focusResults) $('results-heading').focus({ preventScroll: true });
}

function resetFilters() { change({ ...DEFAULT_STATE }); }

function makeCategories() {
  const all = $('categories').querySelector('[data-section=""]');
  all.addEventListener('click', () => change({ section: '' }));
  for (const section of SECTIONS) {
    const button = element('button', 'category-button');
    button.type = 'button'; button.dataset.section = section.id;
    button.title = section.description;
    const text = element('span', 'category-text');
    text.append(element('span', '', section.label), element('small', '', section.description));
    button.append(icon(section.icon), text, element('span', 'category-count', '0'));
    button.addEventListener('click', () => change({ section: section.id }));
    $('categories').append(button);
  }
  for (const topic of TOPICS) {
    const button = element('button', 'topic-button');
    button.type = 'button'; button.dataset.topic = topic.id;
    button.title = topic.description; button.setAttribute('aria-pressed', 'false');
    button.append(icon(topic.icon), element('strong', 'topic-count', '0'), element('span', '', topic.label), element('small', '', topic.en));
    button.addEventListener('click', () => change({ topic: state.topic === topic.id ? '' : topic.id }, { focusResults: true }));
    $('topics').append(button);
  }
  for (const [id, status] of Object.entries(STATUSES)) {
    const option = element('option', '', status.label); option.value = id;
    $('status').append(option);
  }
}

function syncControls() {
  if (!isComposing && $('search').value !== state.q) $('search').value = state.q;
  $('language').value = state.lang; $('status').value = state.status; $('sort').value = state.sort;
  $('saved-count').textContent = saved.size;
  $('saved-view').setAttribute('aria-pressed', String(state.saved));
  $('latest-toggle').setAttribute('aria-pressed', String(state.latest));
  $('resource-grid').dataset.view = view;
  for (const button of document.querySelectorAll('[data-view]')) button.setAttribute('aria-pressed', String(button.dataset.view === view));
  const context = selectResources(resources, { ...state, section: '' }, { saved, latest });
  const counts = sectionCounts(context);
  for (const button of $('categories').querySelectorAll('[data-section]')) {
    const selected = button.dataset.section === state.section;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
    button.querySelector('.category-count').textContent = button.dataset.section ? counts[button.dataset.section] : context.length;
  }
  const topicContext = selectResources(resources, { ...state, topic: '' }, { saved, latest });
  const topics = topicCounts(topicContext);
  for (const button of $('topics').querySelectorAll('[data-topic]')) {
    button.setAttribute('aria-pressed', String(button.dataset.topic === state.topic));
    button.querySelector('.topic-count').textContent = topics[button.dataset.topic];
  }
  $('all-topics').setAttribute('aria-pressed', String(!state.topic));
  const section = SECTIONS.find(s => s.id === state.section);
  const topic = TOPICS.find(t => t.id === state.topic);
  $('collection-title').textContent = [state.saved ? '我的收藏' : '', topic?.label, section?.label].filter(Boolean).join(' / ') || '全部资料';
  $('collection-description').textContent = topic?.description || section?.description || '从机制、实现到验证，沿原始资料建立工程判断。';
}

function renderFilterChips() {
  const chips = [];
  if (state.q) chips.push(['q', '搜索：' + state.q]);
  if (state.section) chips.push(['section', SECTIONS.find(s => s.id === state.section).label]);
  if (state.topic) chips.push(['topic', TOPICS.find(t => t.id === state.topic).label]);
  if (state.lang) chips.push(['lang', state.lang === 'zh' ? '中文' : 'English']);
  if (state.status) chips.push(['status', STATUSES[state.status].label]);
  if (state.tag) chips.push(['tag', TAG_LABELS[state.tag] || state.tag]);
  if (state.saved) chips.push(['saved', '我的收藏']);
  if (state.latest) chips.push(['latest', '本轮补录']);
  $('active-filters').replaceChildren();
  for (const [key, label] of chips) {
    const button = element('button', 'filter-chip', label);
    button.type = 'button'; button.setAttribute('aria-label', '移除筛选：' + label);
    button.append(icon('close', true));
    button.addEventListener('click', () => change({ [key]: ['saved', 'latest'].includes(key) ? false : '' }, { focusResults: true }));
    $('active-filters').append(button);
  }
  $('clear-filters').hidden = chips.length === 0;
}

function makeCard(resource) {
  const section = SECTIONS.find(s => s.id === resource.section);
  const li = element('li');
  const card = element('article', 'resource-card');
  card.dataset.id = resource.id;
  const top = element('div', 'card-top');
  const category = element('span', 'category-badge');
  category.dataset.section = resource.section;
  category.append(icon(section.icon, true), document.createTextNode(section.label));
  const save = element('button', 'icon-button save-button');
  save.type = 'button'; save.dataset.saveId = resource.id;
  save.setAttribute('aria-pressed', String(saved.has(resource.id)));
  save.setAttribute('aria-label', (saved.has(resource.id) ? '取消收藏：' : '收藏：') + resource.title);
  save.title = saved.has(resource.id) ? '取消收藏' : '收藏到当前浏览器';
  save.append(icon('bookmark'));
  save.addEventListener('click', () => toggleSaved(resource.id));
  top.append(category, element('span', 'language-badge', resource.language === 'zh' ? '中文' : 'EN'), save); card.append(top);
  const body = element('div', 'card-body');
  if (['agenda', 'archived', 'early'].includes(resource.status)) {
    const status = element('div', 'card-state', STATUSES[resource.status].label);
    status.dataset.status = resource.status; status.title = STATUSES[resource.status].help;
    body.append(status);
  }
  const title = element('h4');
  const titleButton = highlighted(element('button', 'resource-title'), resource.title);
  titleButton.type = 'button'; titleButton.addEventListener('click', () => openResource(resource.id));
  title.append(titleButton); body.append(title);
  const source = element('div', 'source-line');
  const org = resource.organization || new URL(resource.url).hostname;
  source.title = org;
  source.append(element('span', 'source-monogram', org.slice(0, 1).toUpperCase()), element('span', '', org));
  body.append(source);
  const summary = resource.display_summary || SECTIONS.find(s => s.id === resource.section).description + '。打开原文或条目详情继续阅读。';
  body.append(highlighted(element('p', 'card-summary'), summary)); card.append(body);
  const tags = element('div', 'card-tags');
  for (const tag of (resource.tags || []).slice(0, 3)) {
    const button = element('button', 'tag-button', TAG_LABELS[tag] || tag);
    button.type = 'button'; button.title = '筛选主题：' + tag;
    button.addEventListener('click', () => change({ tag }, { focusResults: true }));
    tags.append(button);
  }
  card.append(tags);
  const bottom = element('div', 'card-bottom');
  const date = element('span', 'card-date', DATE_LABELS[resource.date_basis] || '资料日期');
  const time = element('time', '', displayDate(resource.date));
  if (!String(resource.date).includes('/')) time.dateTime = resource.date;
  date.append(time);
  const details = element('button', 'card-detail', '阅读导读');
  details.type = 'button'; details.setAttribute('aria-label', '查看详情：' + resource.title);
  details.append(icon('arrow', true)); details.addEventListener('click', () => openResource(resource.id));
  const links = element('div', 'card-links');
  const original = externalLink('原文', resource.url, 'card-source'); original.append(icon('external', true));
  links.append(original, details); bottom.append(date, links); card.append(bottom); li.append(card);
  return li;
}

function emptyState() {
  const li = element('li', 'empty-state');
  li.append(icon(state.saved ? 'bookmark' : 'search'));
  li.append(element('h4', '', state.saved && saved.size === 0 ? '留住值得再读的资料' : '还没有匹配的资料'));
  li.append(element('p', '', state.saved && saved.size === 0 ? '点击条目右上角的书签，即可保存在当前浏览器。' : '试试更短的关键词，或移除部分筛选条件。'));
  const reset = element('button', 'button secondary', '浏览全部资料'); reset.type = 'button';
  reset.addEventListener('click', resetFilters); li.append(reset);
  return li;
}

function render() {
  // A quick view/save action must not erase a query waiting for its debounce.
  if (searchTimer && !isComposing) {
    clearTimeout(searchTimer); searchTimer = null;
    state.q = $('search').value.slice(0, 256); visibleCount = PAGE_SIZE; writeUrl();
  }
  syncControls(); renderFilterChips();
  const matches = selectResources(resources, state, { saved, latest });
  const visible = matches.slice(0, visibleCount);
  const count = element('strong', '', matches.length);
  $('results-heading').replaceChildren(count, document.createTextNode(state.saved ? '条收藏资料' : '条收录资料'));
  $('shown-count').textContent = visible.length + ' / ' + matches.length;
  $('resource-grid').replaceChildren(...(visible.length ? visible.map(makeCard) : [emptyState()]));
  $('load-more').hidden = visible.length >= matches.length;
  $('remaining-count').textContent = matches.length > visible.length ? '还有 ' + (matches.length - visible.length) + ' 条' : '';
  $('result-announcement').textContent = '找到 ' + matches.length + ' 条资料，当前显示 ' + visible.length + ' 条。';
}

function appendTextSection(container, label, value, className = '') {
  if (typeof value !== 'string' || !value.trim()) return;
  const section = element('section', 'detail-section' + (className ? ' ' + className : ''));
  section.append(element('h3', '', label), element('p', '', value)); container.append(section);
  return section;
}

function appendLinkSection(container, label, entries) {
  const valid = entries.filter(p => p && safeUrl(p.url));
  if (!valid.length) return;
  const section = element('section', 'detail-section'); section.append(element('h3', '', label));
  const ul = element('ul', 'detail-links');
  const seen = new Set();
  for (const entry of valid) {
    if (seen.has(entry.url)) continue; seen.add(entry.url);
    const li = element('li'); const link = externalLink(entry.title || new URL(entry.url).hostname, entry.url);
    link.append(icon('external', true)); li.append(link);
    const note = [entry.focus || entry.note, entry.date].filter(Boolean).join(' · ');
    if (note) li.append(element('p', '', note));
    ul.append(li);
  }
  section.append(ul); container.append(section);
}

function showResource(resource) {
  const section = SECTIONS.find(s => s.id === resource.section);
  $('detail-category').textContent = section.en.toUpperCase() + ' / ' + section.label;
  $('detail-title').textContent = resource.title;
  const status = element('span', 'state-badge', STATUSES[resource.status]?.label || resource.status);
  status.dataset.status = resource.status; status.title = STATUSES[resource.status]?.help || '';
  $('detail-meta').replaceChildren(status, element('span', '', resource.organization));
  const time = element('time', '', (DATE_LABELS[resource.date_basis] || '日期') + ' · ' + displayDate(resource.date));
  $('detail-meta').append(time, element('span', '', resource.language === 'zh' ? '中文' : 'English'));
  const body = $('detail-body'); body.replaceChildren();
  if (resource.display_summary) {
    const overview = appendTextSection(body, '导读摘要', resource.display_summary, 'detail-overview');
    if (resource.summary_source === 'readme') overview.append(element('p', 'detail-small', '本仓导读 · 摘自 README'));
  }
  appendTextSection(body, '实现机制', resource.mechanism);
  appendTextSection(body, '适合研究什么', resource.use_case);
  const caveats = [resource.caveat, resource.status === 'agenda' ? STATUSES.agenda.help : '', resource.material_review?.note].filter(Boolean);
  if (caveats.length) appendTextSection(body, '使用与证据边界', [...new Set(caveats)].join('\n\n'), 'detail-caveat');
  appendTextSection(body, '补充说明', resource.notes);
  const technical = [...(resource.reading_path || [])];
  if (resource.materials_url) technical.push({ title: '公开讲义 / 材料', url: resource.materials_url });
  if (resource.technical_material_url) technical.push({ title: '官方技术资料', url: resource.technical_material_url });
  appendLinkSection(body, resource.reading_path?.length ? '建议阅读路线' : '技术与公开材料', technical);
  const related = [...(resource.related_materials || [])];
  for (const item of resource.supporting_urls || []) related.push(typeof item === 'string' ? { url: item } : item);
  appendLinkSection(body, '相关原始资料', related);
  if (resource.license) {
    const licenseSection = element('section', 'detail-section');
    licenseSection.append(element('h3', '', '许可证与范围'));
    licenseSection.append(externalLink(resource.license, resource.license_url || resource.url, 'text-link'));
    if (resource.license_note) licenseSection.append(element('p', 'detail-small', resource.license_note));
    body.append(licenseSection);
  }
  appendTextSection(body, '日期依据', resource.date_evidence);
  if (resource.evidence_url) appendLinkSection(body, '核验出处', [{ title: '查看原始日期 / 版本证据', url: resource.evidence_url }]);
  if (resource.last_verified) appendTextSection(body, '本仓核验日期', resource.last_verified);
  if (resource.release_updates?.length) {
    const versions = element('details', 'detail-versions');
    versions.append(element('summary', '', resource.release_updates.length + ' 个版本证据'));
    appendLinkSection(versions, '已收录的版本记录', resource.release_updates.map(r => ({ title: r.version, url: r.url, note: r.published_at })));
    body.append(versions);
  }
  const tags = element('div', 'detail-tags');
  for (const tag of resource.tags || []) tags.append(element('span', '', TAG_LABELS[tag] || tag));
  body.append(tags);
  const source = safeUrl(resource.url);
  if (source) { $('detail-source').href = source; $('detail-source').hidden = false; }
  else { $('detail-source').removeAttribute('href'); $('detail-source').hidden = true; }
  buildToc(); syncReaderSave();
}

function syncReaderSave() {
  const isSaved = saved.has(activeDialogId);
  $('detail-save').setAttribute('aria-pressed', String(isSaved));
  $('detail-save').querySelector('span').textContent = isSaved ? '已收藏' : '加入收藏';
}

function buildToc() {
  $('detail-toc').replaceChildren();
  const sections = $('detail-body').querySelectorAll(':scope > .detail-section');
  sections.forEach((section, index) => {
    section.id = 'reader-section-' + index;
    const button = element('button', '', section.querySelector('h3').textContent);
    button.type = 'button'; button.dataset.target = section.id;
    button.addEventListener('click', () => {
      const scroll = $('reader-scroll');
      const top = scroll.scrollTop + section.getBoundingClientRect().top - scroll.getBoundingClientRect().top - 24;
      scroll.scrollTo({ top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
    $('detail-toc').append(button);
  });
  updateToc();
}

function updateToc() {
  const top = $('reader-scroll').getBoundingClientRect().top + 130;
  const sections = [...$('detail-body').querySelectorAll(':scope > .detail-section')];
  const active = sections.filter(section => section.getBoundingClientRect().top <= top).at(-1) || sections[0];
  for (const button of $('detail-toc').querySelectorAll('button')) {
    if (button.dataset.target === active?.id) button.setAttribute('aria-current', 'location');
    else button.removeAttribute('aria-current');
  }
}

function syncReaderNavigation() {
  const index = readerItems.findIndex(r => r.id === activeDialogId);
  $('reader-position').textContent = readerScope + ' · ' + (index + 1) + ' / ' + readerItems.length;
  $('reader-prev').disabled = index <= 0;
  $('reader-next').disabled = index < 0 || index >= readerItems.length - 1;
}

function openResource(id, push = true, keepQueue = false) {
  const resource = resources.find(r => r.id === id); if (!resource) return;
  if (!keepQueue) {
    const all = selectResources(resources, { ...DEFAULT_STATE, sort: state.sort });
    const matches = selectResources(resources, state, { saved, latest });
    const context = readingContext(all, matches, id);
    readerItems = context.items; readerScope = context.filtered ? '筛选结果' : '全部资料';
  }
  state.resource = id; activeDialogId = id; showResource(resource);
  syncReaderNavigation();
  if (push) writeUrl(true);
  document.body.classList.add('dialog-open');
  if (!dialog.open) dialog.showModal();
  $('reader-scroll').scrollTop = 0; updateToc();
}

function navigateReader(offset) {
  const index = readerItems.findIndex(r => r.id === activeDialogId);
  const next = readerItems[index + offset];
  if (!next || index < 0) return;
  openResource(next.id, false, true); writeUrl();
}

function syncDialog() {
  if (state.resource && resources.some(r => r.id === state.resource)) openResource(state.resource, false);
  else if (dialog.open) {
    activeDialogId = ''; dialog.close(); document.body.classList.remove('dialog-open');
  }
}

makeCategories();
setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
$('theme-toggle').addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next); writePreference(THEME_KEY, next);
});
$('all-topics').addEventListener('click', () => change({ topic: '' }, { focusResults: true }));
for (const button of document.querySelectorAll('[data-view]')) button.addEventListener('click', () => {
  view = button.dataset.view; writePreference(VIEW_KEY, view); render();
});
$('search').value = state.q;
function queueSearch() {
  clearTimeout(searchTimer); searchTimer = null;
  if (!isComposing) searchTimer = setTimeout(() => { searchTimer = null; change({ q: $('search').value.slice(0, 256) }); }, 180);
}
$('search').addEventListener('compositionstart', () => { isComposing = true; clearTimeout(searchTimer); searchTimer = null; });
$('search').addEventListener('compositionend', () => { isComposing = false; queueSearch(); });
$('search').addEventListener('input', queueSearch);
$('language').addEventListener('change', event => change({ lang: event.target.value }));
$('status').addEventListener('change', event => change({ status: event.target.value }));
$('sort').addEventListener('change', event => change({ sort: event.target.value }));
$('clear-filters').addEventListener('click', resetFilters);
$('saved-view').addEventListener('click', () => { change({ saved: !state.saved }); $('library').scrollIntoView({ behavior: 'smooth' }); });
$('latest-toggle').addEventListener('click', () => change({ latest: !state.latest }));
$('load-more').addEventListener('click', () => { visibleCount += PAGE_SIZE; render(); });
$('reader-prev').addEventListener('click', () => navigateReader(-1));
$('reader-next').addEventListener('click', () => navigateReader(1));
$('detail-save').addEventListener('click', () => { if (activeDialogId) toggleSaved(activeDialogId, true); });
$('reader-scroll').addEventListener('scroll', () => {
  if (!tocFrame) tocFrame = requestAnimationFrame(() => { updateToc(); tocFrame = null; });
}, { passive: true });
$('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  if (dialog.open) return;
  document.body.classList.remove('dialog-open');
  if (state.resource === activeDialogId) { state.resource = ''; writeUrl(); }
  activeDialogId = '';
});
$('copy-link').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(location.href); toast('条目链接已复制，可直接分享。'); }
  catch { toast('无法自动复制，请从浏览器地址栏复制当前链接。'); }
});
window.addEventListener('popstate', () => { clearTimeout(searchTimer); searchTimer = null; state = readState(location.search); visibleCount = PAGE_SIZE; if (resources.length) { render(); syncDialog(); } });
window.addEventListener('storage', event => {
  if (event.key === STORAGE_KEY) { saved = readSaved(); if (resources.length) render(); if (dialog.open) syncReaderSave(); }
  if (event.key === THEME_KEY) setTheme(event.newValue === 'light' ? 'light' : 'dark');
  if (event.key === VIEW_KEY) { view = event.newValue === 'list' ? 'list' : 'grid'; if (resources.length) render(); }
});
document.addEventListener('keydown', event => {
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '') || document.activeElement?.isContentEditable;
  if (!dialog.open && !typing && (event.key === '/' || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k'))) { event.preventDefault(); $('search').focus(); }
  if (dialog.open && !typing && !event.altKey && !event.ctrlKey && !event.metaKey && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault(); navigateReader(event.key === 'ArrowRight' ? 1 : -1);
  }
});

try {
  const [response, markdown] = await Promise.all([
    fetch('./resources.json', { cache: 'no-cache' }),
    fetch('./README.md', { cache: 'no-cache' }).then(r => r.ok ? r.text() : '').catch(() => '')
  ]);
  if (!response.ok) throw new Error('Index request failed');
  const data = await response.json();
  if (!Array.isArray(data.resources) || !data.resources.length) throw new Error('Empty index');
  resources = prepareResources(data.resources, markdown);
  const validIds = new Set(resources.map(r => r.id));
  saved = new Set([...saved].filter(id => validIds.has(id)));
  latest = new Set((data.refresh_history?.[0]?.added_ids || []).filter(id => validIds.has(id)));
  const counts = sectionCounts(resources);
  $('stat-total').textContent = resources.length;
  $('stat-projects').textContent = counts['open-source'];
  $('stat-talks').textContent = counts.talk;
  $('as-of').textContent = String(data.as_of || '').replaceAll('-', '.');
  $('latest-count').textContent = latest.size;
  $('latest-toggle').hidden = latest.size === 0;
  render(); syncDialog();
} catch (error) {
  const li = element('li', 'empty-state');
  li.append(icon('file'), element('h4', '', '资料库暂时未能加载'), element('p', '', '请稍后重试，或直接到 GitHub 阅读完整索引。'));
  const retry = element('button', 'button secondary', '重新加载'); retry.type = 'button'; retry.addEventListener('click', () => location.reload());
  li.append(retry, externalLink('前往 GitHub', 'https://github.com/Pyramiding/awesome-data-agents', 'button primary'));
  $('resource-grid').replaceChildren(li); $('results-heading').textContent = '加载未完成';
  $('result-announcement').textContent = '资料库未能加载，请重新加载或到 GitHub 阅读。';
  console.error('Unable to load the resource index:', error);
}
