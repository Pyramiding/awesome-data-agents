import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { SECTIONS, STATUSES, DATE_LABELS } from '../assets/catalog.js';

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const isText = value => typeof value === 'string' && value.trim().length > 0;
const isUrl = value => {
  if (!isText(value) || value !== value.trim()) return false;
  try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) && !u.username && !u.password; }
  catch { return false; }
};
const validTimestamp = value => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)) return false;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) && date.toISOString().replace('.000Z', 'Z') === value;
};

// Do not let Date's rollover turn February 30 into a valid March date.
export function validDate(value, { partial = false, range = false } = {}) {
  if (typeof value !== 'string') return false;
  if (range && value.includes('/')) {
    const parts = value.split('/');
    return parts.length === 2 && parts.every(v => validDate(v)) && parts[0] <= parts[1];
  }
  if (partial && /^\d{4}-(0[1-9]|1[0-2])$/.test(value)) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + 'T00:00:00Z');
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function validateCatalog(data, { readme, methodology, today = new Date().toISOString().slice(0, 10) } = {}) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  if (!isObject(data)) return ['catalog must be an object'];
  require(data.schema_version === '1.1', 'unsupported schema_version');
  require(validDate(data.as_of), 'as_of must be a real YYYY-MM-DD date');
  require(data.as_of <= today, 'as_of cannot be in the future');
  require(data.timezone === 'Asia/Shanghai', 'timezone must be Asia/Shanghai');
  require(isText(data.scope), 'scope is required');
  if (!Array.isArray(data.resources) || !data.resources.length) return [...errors, 'resources must be a nonempty array'];
  const ids = new Set(), urls = new Set();
  const counts = Object.fromEntries(SECTIONS.map(s => [s.id, 0]));
  const requiredText = ['id', 'title', 'organization', 'url', 'date', 'date_basis', 'section', 'language', 'status'];
  const optionalText = ['summary', 'date_evidence', 'license', 'license_note', 'component_type', 'mechanism', 'use_case', 'caveat', 'notes', 'material_access', 'verification_scope'];
  const dateFields = ['added_on', 'last_verified', 'archived_date'];
  function checkLinks(value, location) {
    if (Array.isArray(value)) return value.forEach((item, i) => checkLinks(item, `${location}[${i}]`));
    if (!isObject(value)) return;
    for (const [key, item] of Object.entries(value)) {
      if (key === 'url' || key.endsWith('_url')) require(isUrl(item), `${location}.${key} must be an absolute HTTP(S) URL without credentials`);
      if (key === 'supporting_urls' && Array.isArray(item)) item.forEach((link, i) => {
        if (typeof link === 'string') require(isUrl(link), `${location}.${key}[${i}] must be an HTTP(S) URL`);
      });
      checkLinks(item, `${location}.${key}`);
    }
  }
  data.resources.forEach((r, i) => {
    const at = `resources[${i}] (${r?.id || 'missing ID'})`;
    if (!isObject(r)) { errors.push(`${at} must be an object`); return; }
    requiredText.forEach(key => require(isText(r[key]), `${at}.${key} is required`));
    optionalText.forEach(key => { if (key in r) require(isText(r[key]), `${at}.${key} must be nonempty text`); });
    require(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.id || ''), `${at}.id must be a stable lowercase slug`);
    require(!ids.has(r.id), `${at}: duplicate ID`); ids.add(r.id);
    if (isUrl(r.url)) {
      const canonical = new URL(r.url); canonical.hash = '';
      const key = canonical.href.replace(/\/$/, '');
      require(!urls.has(key), `${at}: duplicate canonical URL`); urls.add(key);
    }
    require(Object.hasOwn(counts, r.section), `${at}: unsupported section`);
    if (Object.hasOwn(counts, r.section)) counts[r.section]++;
    require(Object.hasOwn(STATUSES, r.status), `${at}: unsupported status`);
    require(Object.hasOwn(DATE_LABELS, r.date_basis), `${at}: unsupported date_basis`);
    require(['zh', 'en'].includes(r.language), `${at}: unsupported language`);
    require(validDate(r.date, { partial: true, range: r.date_basis === 'event' }), `${at}.date is invalid`);
    require(Array.isArray(r.tags) && r.tags.length > 0 && r.tags.every(isText) && new Set(r.tags).size === r.tags.length, `${at}.tags must be nonempty, unique strings`);
    if ('material_type' in r) require(Array.isArray(r.material_type) && r.material_type.length > 0 && r.material_type.every(isText), `${at}.material_type must be a nonempty array of strings`);
    dateFields.forEach(key => { if (key in r) {
      require(validDate(r[key]), `${at}.${key} is invalid`);
      require(r[key] <= today, `${at}.${key} cannot be in the future`);
    } });
    if (r.last_verified && r.added_on) require(r.last_verified >= r.added_on, `${at}: verification predates inclusion`);
    if (r.license || r.license_url) require(isText(r.license) && isUrl(r.license_url), `${at}: license label and source must be paired`);
    if (r.license_note) require(isText(r.license), `${at}: license_note needs a license`);
    if (r.date_evidence || r.evidence_url) require(isText(r.date_evidence) && isUrl(r.evidence_url), `${at}: date evidence and source must be paired`);
    if (r.archived === true) require(r.status === 'archived', `${at}: archived flag/status disagree`);
    if ('archived' in r) require(typeof r.archived === 'boolean', `${at}.archived must be boolean`);
    for (const key of ['reading_path', 'related_materials']) if (key in r) {
      require(Array.isArray(r[key]) && r[key].length > 0, `${at}.${key} must be a nonempty array`);
      if (Array.isArray(r[key])) r[key].forEach((item, j) => {
        require(isObject(item) && isText(item.title) && isUrl(item.url), `${at}.${key}[${j}] needs title and URL`);
        if (key === 'reading_path') require(isText(item?.focus), `${at}.${key}[${j}] needs reading focus`);
        if (item?.date) require(validDate(item.date, { partial: true, range: true }), `${at}.${key}[${j}].date is invalid`);
      });
    }
    if ('release_updates' in r) {
      require(Array.isArray(r.release_updates) && r.release_updates.length > 0, `${at}.release_updates must be a nonempty array`);
      const versions = new Set();
      if (Array.isArray(r.release_updates)) r.release_updates.forEach((release, j) => {
        const where = `${at}.release_updates[${j}]`;
        if (!isObject(release)) { errors.push(`${where} must be an object`); return; }
        require(isText(release.version) && !versions.has(release.version), `${where}: version must be nonempty and unique`); versions.add(release.version);
        require(isUrl(release.url), `${where}: release URL is required`);
        require(validTimestamp(release.published_at), `${where}: published_at must be a valid UTC timestamp`);
        if ('prerelease' in release) require(typeof release.prerelease === 'boolean', `${where}.prerelease must be boolean`);
      });
    }
    if (r.material_review) {
      require(isObject(r.material_review), `${at}.material_review must be an object`);
      require(validDate(r.material_review.checked_on) && r.material_review.checked_on <= today, `${at}.material_review.checked_on is invalid`);
      require(isText(r.material_review.status) && isText(r.material_review.note), `${at}.material_review needs status and note`);
    }
    checkLinks(r, at);
  });
  require(Array.isArray(data.refresh_history) && data.refresh_history.length > 0, 'refresh_history must be a nonempty array');
  if (Array.isArray(data.refresh_history)) data.refresh_history.forEach((h, i) => {
    const at = `refresh_history[${i}]`;
    if (!isObject(h)) { errors.push(`${at} must be an object`); return; }
    for (const key of ['as_of', 'window_start', 'previous_as_of']) require(validDate(h[key]), `${at}.${key} is invalid`);
    require(h.as_of <= data.as_of && h.window_start <= h.as_of && h.previous_as_of <= h.as_of, `${at}: invalid review window`);
    require(/^[0-9a-f]{40}$/.test(h.base_commit || ''), `${at}.base_commit must be a full Git SHA`);
    require(Number.isInteger(h.previous_total) && h.previous_total >= 0, `${at}.previous_total must be a nonnegative integer`);
    for (const kind of ['added', 'updated', 'corrected', 'agenda_reviewed']) {
      const list = h[kind + '_ids'];
      if (list === undefined && !['added', 'updated'].includes(kind)) continue;
      require(Array.isArray(list), `${at}.${kind}_ids must be an array`);
      if (!Array.isArray(list)) continue;
      require(list.every(id => ids.has(id)) && new Set(list).size === list.length, `${at}.${kind}_ids has unknown or duplicate IDs`);
      const total = h[kind + '_total'];
      if (total !== undefined || ['added', 'updated'].includes(kind)) require(total === list.length, `${at}.${kind}_total does not match IDs`);
    }
    if (Array.isArray(h.added_ids) && Array.isArray(h.updated_ids)) require(!h.added_ids.some(id => h.updated_ids.includes(id)), `${at}: added and updated IDs overlap`);
    if (i === 0) require(h.previous_total + h.added_total === data.resources.length, `${at}: latest totals disagree with catalog`);
    if (i > 0 && isObject(data.refresh_history[i - 1])) {
      require(h.as_of <= data.refresh_history[i - 1].as_of, `${at}: history must be newest first`);
      require(h.previous_total + h.added_total === data.refresh_history[i - 1].previous_total, `${at}: refresh totals do not form a continuous history`);
    }
  });
  if (readme !== undefined) {
    const headline = readme.match(/^\*\*(\d+) 条资料\*\*.*$/m)?.[0];
    require(Boolean(headline), 'README resource-count headline missing');
    require(Number(headline?.match(/\*\*(\d+)/)?.[1]) === data.resources.length, 'README total disagrees with catalog');
    for (const [id, label] of Object.entries({ architecture: '架构与实践', 'open-source': '公开实现', talk: '分享与议程', research: '研究', 'living-doc': '持续文档', evaluation: '评测' })) {
      require(headline?.includes('`' + counts[id] + '` ' + label), `README ${id} count disagrees with catalog`);
    }
    require(readme.includes(`**资料截止：${data.as_of}（${data.timezone}）**`), 'README cutoff disagrees with catalog');
    for (const r of data.resources) require(readme.includes(`](${r.url})`), `README is missing canonical source for ${r.id}`);
  }
  if (methodology !== undefined) require(methodology.includes(`Snapshot date: **${data.as_of} (${data.timezone})**`), 'METHODOLOGY cutoff disagrees with catalog');
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const read = file => fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8');
  const data = JSON.parse(read('resources.json'));
  // Compare civil dates in the catalog timezone, not the CI runner's timezone.
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const errors = validateCatalog(data, { readme: read('README.md'), methodology: read('METHODOLOGY.md'), today });
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log(`Catalog validation passed: ${data.resources.length} records, nested evidence, dates, history and documentation counts. Source truth and remote link availability still require review.`);
}
