import { test, expect } from '@playwright/test';
import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync(new URL('../../resources.json', import.meta.url), 'utf8'));
const total = data.resources.length;
const cards = page => page.locator('.resource-card');
async function load(page, query = '') {
  await page.goto('./' + query);
  await expect(page.locator('#stat-total')).toHaveText(String(total));
}

async function applyFacets(page, facets) {
  const mobile = await page.locator('#filters-open').isVisible();
  if (mobile) {
    await page.locator('#filters-open').click();
    const ids = { section: 'mobile-section', topic: 'mobile-topic', lang: 'mobile-language', status: 'mobile-status', tag: 'mobile-tag', sort: 'mobile-sort' };
    for (const [key, value] of Object.entries(facets)) await page.locator('#' + ids[key]).selectOption(value);
    await page.locator('#filters-apply').click();
  } else {
    for (const [key, value] of Object.entries(facets)) {
      if (key === 'section') await page.locator('button.category-button[data-section="' + value + '"]').click();
      else if (key === 'topic') await page.locator('button[data-topic="' + value + '"]').click();
      else await page.locator('#' + ({ lang: 'language', tag: 'tag-filter' }[key] || key)).selectOption(value);
    }
  }
}

test.beforeEach(async ({ page }) => {
  page.on('pageerror', error => { throw error; });
});

test('catalog loads, pagination repeats safely and source links remain usable', async ({ page }) => {
  await load(page);
  await expect(page.locator('#results-heading strong')).toHaveText(String(total));
  await expect(cards(page)).toHaveCount(24);
  await page.locator('#load-more').click();
  await expect(cards(page)).toHaveCount(48);
  await page.locator('#load-more').click();
  await expect(cards(page)).toHaveCount(72);
  const ids = await cards(page).evaluateAll(nodes => nodes.map(n => n.dataset.id));
  expect(new Set(ids).size).toBe(ids.length);
  const link = cards(page).first().locator('.card-source');
  await expect(link).toHaveAttribute('href', /^https?:\/\//);
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});

test('search and crossed filters survive reload, then recover from zero results', async ({ page }) => {
  await load(page);
  await page.locator('#search').fill('WrenAI');
  await applyFacets(page, { section: 'open-source', lang: 'en', status: 'active-project', sort: 'name' });
  await expect(cards(page)).toHaveCount(1);
  await expect(cards(page).first()).toHaveAttribute('data-id', 'wrenai');
  await expect(page).toHaveURL(/q=WrenAI.*type=open-source.*lang=en.*status=active-project.*sort=name/);
  await page.reload();
  await expect(cards(page)).toHaveCount(1);
  await expect(page.locator('#search')).toHaveValue('WrenAI');
  await applyFacets(page, { lang: 'zh' });
  await expect(page.locator('.empty-state')).toContainText('还没有匹配的资料');
  await page.locator('.empty-state button').click();
  await expect(page.locator('#results-heading strong')).toHaveText(String(total));
  await expect(page.locator('#search')).toHaveValue('');
});

test('topic/type intersection and latest-added batch have working clear controls', async ({ page }) => {
  await load(page);
  await applyFacets(page, { topic: 'integration', section: 'open-source' });
  await expect(page).toHaveURL(/type=open-source.*topic=integration/);
  expect(await cards(page).count()).toBeGreaterThan(0);
  const visibleIds = await cards(page).evaluateAll(nodes => nodes.map(n => n.dataset.id));
  expect(visibleIds.every(id => data.resources.find(r => r.id === id).section === 'open-source')).toBe(true);
  await page.locator('#clear-filters').click();
  const latest = data.refresh_history.find(h => h.added_ids?.length)?.added_ids || [];
  if (latest.length) {
    await page.locator('#latest-toggle').click();
    await expect(page.locator('#results-heading strong')).toHaveText(String(latest.length));
    const ids = await cards(page).evaluateAll(nodes => nodes.map(n => n.dataset.id));
    expect(ids.every(id => latest.includes(id))).toBe(true);
    await page.locator('#latest-toggle').click();
    await expect(page.locator('#results-heading strong')).toHaveText(String(total));
  }
});

test('quick view changes and IME composition do not erase an in-flight search', async ({ page }) => {
  await load(page);
  await page.locator('#search').fill('WrenAI');
  await page.locator('button[data-view="list"]').click();
  await expect(cards(page)).toHaveCount(1);
  await expect(page.locator('#search')).toHaveValue('WrenAI');
  await page.locator('#search').dispatchEvent('compositionstart');
  await page.locator('#search').fill('语义');
  await page.locator('button[data-view="grid"]').click();
  await expect(page.locator('#search')).toHaveValue('语义');
  await page.locator('#search').dispatchEvent('compositionend');
  await expect.poll(() => new URL(page.url()).searchParams.get('q')).toBe('语义');
  expect(await cards(page).count()).toBeGreaterThan(0);
});

test('reader next/previous, close, Back and Forward preserve filters and focus', async ({ page }) => {
  await load(page, '?type=open-source');
  const first = cards(page).first();
  const firstId = await first.getAttribute('data-id');
  await first.locator('.resource-title').click();
  await expect(page.locator('#resource-dialog')).toBeVisible();
  await expect(page.locator('#reader-prev')).toBeDisabled();
  await page.locator('#reader-next').click();
  await expect.poll(() => new URL(page.url()).searchParams.get('resource')).not.toBe(firstId);
  await page.locator('#reader-prev').click();
  await expect.poll(() => new URL(page.url()).searchParams.get('resource')).toBe(firstId);
  await page.goBack();
  await expect(page.locator('#resource-dialog')).not.toBeVisible();
  await expect(page.locator('body')).not.toHaveClass(/dialog-open/);
  await expect(page).toHaveURL(/\?type=open-source$/);
  await page.goForward();
  await expect(page.locator('#resource-dialog')).toBeVisible();
  await page.locator('#close-dialog').click();
  await expect(page.locator('#resource-dialog')).not.toBeVisible();
  await expect(page).toHaveURL(/\?type=open-source$/);
  await expect(page.locator('.resource-card[data-id="' + firstId + '"] .resource-title')).toBeFocused();
  // Reopen and dismiss again to catch stale close events and history state.
  await cards(page).first().locator('.resource-title').click();
  await page.keyboard.press('Escape');
  await expect(page.locator('#resource-dialog')).not.toBeVisible();
  await expect(page).toHaveURL(/\?type=open-source$/);
});

test('a shared detail outside the filters opens, reloads, and closes to the original query', async ({ page }) => {
  await load(page, '?q=not-a-real-resource&resource=wrenai');
  await expect(page.locator('#detail-title')).toContainText('WrenAI');
  await expect(page.locator('#reader-position')).toContainText('全部资料');
  await expect(page.locator('#detail-body')).toContainText('许可证与范围');
  await expect(page.locator('#detail-body')).toContainText('本仓核验日期');
  await page.reload();
  await expect(page.locator('#resource-dialog')).toBeVisible();
  await page.locator('#close-dialog').click();
  await expect(page.locator('.empty-state')).toContainText('还没有匹配的资料');
  await expect(page.locator('#search')).toHaveValue('not-a-real-resource');
  await expect(page).toHaveURL(/\?q=not-a-real-resource$/);
});

test('favorites, theme and list preference survive reload and unsaving updates the view', async ({ page }) => {
  await load(page, '?q=WrenAI');
  await cards(page).first().locator('.save-button').click();
  await expect(page.locator('#saved-count')).toHaveText('1');
  await page.locator('button[data-view="list"]').click();
  await page.locator('#theme-toggle').click();
  const theme = await page.locator('html').getAttribute('data-theme');
  await page.locator('#saved-view').click();
  await page.reload();
  await expect(cards(page)).toHaveCount(1);
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
  await expect(page.locator('#resource-grid')).toHaveAttribute('data-view', 'list');
  await cards(page).first().locator('.resource-title').click();
  await page.locator('#detail-save').click();
  await expect(page.locator('#detail-save')).toHaveAttribute('aria-pressed', 'false');
  await page.locator('#close-dialog').click();
  await expect(page.locator('#saved-count')).toHaveText('0');
  await expect(page.locator('.empty-state')).toContainText('留住值得再读的资料');
});

test('blocked browser storage leaves search and session favorites usable', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException('Blocked', 'SecurityError'); };
    Storage.prototype.setItem = () => { throw new DOMException('Blocked', 'SecurityError'); };
  });
  await load(page, '?q=WrenAI');
  await expect(cards(page)).toHaveCount(1);
  await cards(page).first().locator('.save-button').click();
  await expect(page.locator('#toast')).toContainText('本次浏览仍可使用');
  await page.locator('#saved-view').click();
  await expect(cards(page)).toHaveCount(1);
});

test('failed index load offers a working retry', async ({ page }) => {
  let failed = false;
  await page.route('**/resources.json', async route => {
    if (!failed) { failed = true; await route.fulfill({ status: 503, body: 'Unavailable' }); }
    else await route.continue();
  });
  await page.goto('./');
  await expect(page.locator('.empty-state')).toContainText('资料库暂时未能加载');
  await page.getByRole('button', { name: '重新加载', exact: true }).click();
  await expect(page.locator('#stat-total')).toHaveText(String(total));
  await expect(cards(page)).toHaveCount(24);
});

test('README failure is nonfatal, and markup-like search stays inert', async ({ page }) => {
  await page.route('**/README.md', route => route.fulfill({ status: 503, body: '' }));
  await load(page);
  await expect(cards(page)).toHaveCount(24);
  await page.locator('#search').fill('<img src=x onerror=alert(1)>');
  await expect(page.locator('.empty-state')).toBeVisible();
  await expect(page.locator('#active-filters img')).toHaveCount(0);
  await expect(page.locator('#active-filters')).toContainText('<img src=x onerror=alert(1)>');
});

test('layout and reader fit the viewport, including long metadata and keyboard dismissal', async ({ page }) => {
  await load(page, '?resource=wrenai');
  await expect(page.locator('#resource-dialog')).toBeVisible();
  const widths = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth, dialog: document.querySelector('#resource-dialog').getBoundingClientRect().width }));
  expect(widths.page).toBeLessThanOrEqual(widths.viewport + 1);
  expect(widths.dialog).toBeLessThanOrEqual(widths.viewport);
  await page.keyboard.press('Escape');
  await expect(page.locator('#resource-dialog')).not.toBeVisible();
  await page.keyboard.press('/');
  await expect(page.locator('#search')).toBeFocused();
});

test('global command search crosses filters and keeps the original collection on close', async ({ page }) => {
  await load(page, '?type=research');
  await page.keyboard.press('Control+k');
  await expect(page.locator('#command-search')).toBeFocused();
  await page.locator('#command-search').fill('WrenAI');
  await expect(page.locator('.command-result')).toHaveCount(1);
  await expect(page.locator('.command-result strong')).toHaveText('WrenAI');
  await page.locator('#command-search').press('Enter');
  await expect(page.locator('#command-dialog')).not.toBeVisible();
  await expect(page.locator('#detail-title')).toHaveText('WrenAI');
  await expect(page.locator('#reader-position')).toContainText('全部资料');
  await page.locator('#close-dialog').click();
  await expect(page).toHaveURL(/\?type=research$/);
  await expect(page.locator('body')).not.toHaveClass(/dialog-open/);
});

test('command results support arrow selection, empty states and viewing all matches', async ({ page }) => {
  await load(page);
  await page.locator('#command-trigger').click();
  await page.locator('#command-search').fill('MCP');
  await expect(page.locator('.command-result')).toHaveCount(8);
  const secondTitle = await page.locator('.command-result strong').nth(1).innerText();
  await page.locator('#command-search').press('ArrowDown');
  await expect(page.locator('.command-result').nth(1)).toHaveAttribute('aria-selected', 'true');
  await page.locator('#command-search').press('Enter');
  await expect(page.locator('#detail-title')).toHaveText(secondTitle);
  await page.locator('#close-dialog').click();
  await page.locator('#command-trigger').click();
  await page.locator('#command-search').fill('<img src=x onerror=alert(1)>');
  await expect(page.locator('#command-empty')).toBeVisible();
  await expect(page.locator('#command-results img')).toHaveCount(0);
  await page.locator('#command-search').fill('MCP');
  await page.locator('#command-all').click();
  await expect(page.locator('#command-dialog')).not.toBeVisible();
  await expect(page.locator('#search')).toHaveValue('MCP');
  await expect(page).toHaveURL(/q=MCP/);
  expect(await cards(page).count()).toBeGreaterThan(0);
});

test('recent browsing, reader size and related resources continue the reading journey', async ({ page }) => {
  await load(page, '?q=WrenAI');
  await cards(page).first().locator('.resource-title').click();
  await page.locator('#reader-size').click();
  await expect(page.locator('#resource-dialog')).toHaveAttribute('data-reading-size', 'large');
  await expect(page.locator('.related-resource')).toHaveCount(3);
  const relatedTitle = await page.locator('.related-resource > span').first().innerText();
  await page.locator('.related-resource').first().click();
  await expect(page.locator('#detail-title')).toHaveText(relatedTitle);
  await page.locator('#close-dialog').click();
  await expect(page.locator('#recent-count')).toHaveText('2');
  await page.locator('#clear-filters').click();
  await page.locator('#recent-view').click();
  await expect(cards(page)).toHaveCount(2);
  await page.reload();
  await expect(cards(page)).toHaveCount(2);
  await cards(page).first().locator('.resource-title').click();
  await expect(page.locator('#resource-dialog')).toHaveAttribute('data-reading-size', 'large');
});

test('tag facets and the mobile filter sheet preserve their values and fit the screen', async ({ page }) => {
  await load(page, '?q=WrenAI');
  await applyFacets(page, { section: 'open-source', topic: 'context', lang: 'en', status: 'active-project', tag: 'semantic-layer' });
  await expect(cards(page)).toHaveCount(1);
  await expect(cards(page).first()).toHaveAttribute('data-id', 'wrenai');
  await expect(page).toHaveURL(/tag=semantic-layer/);
  if (await page.locator('#filters-open').isVisible()) {
    await page.locator('#filters-open').click();
    await expect(page.locator('#mobile-section')).toHaveValue('open-source');
    await expect(page.locator('#mobile-topic')).toHaveValue('context');
    const widths = await page.evaluate(() => ({ viewport: innerWidth, width: document.querySelector('#filter-dialog').getBoundingClientRect().width }));
    expect(widths.width).toBeLessThanOrEqual(widths.viewport);
    await page.locator('#filters-reset').click();
    await expect(page.locator('#mobile-tag')).toHaveValue('');
    await page.locator('#filters-apply').click();
    await expect(page.locator('#search')).toHaveValue('WrenAI');
  } else await expect(page.locator('#tag-filter')).toHaveValue('semantic-layer');
});
