export const SECTIONS = [
  { id: 'architecture', label: '架构与实践', en: 'Architecture', icon: 'layers', description: '上下文、规划、执行与生产工程' },
  { id: 'open-source', label: '公开实现', en: 'Implementations', icon: 'code', description: '完整 Agent、工具、工作区与评测环境' },
  { id: 'living-doc', label: '技术文档', en: 'Documentation', icon: 'file', description: '官方参考、接入指南与持续文档' },
  { id: 'talk', label: '分享与讲义', en: 'Talks & slides', icon: 'play', description: '实录、幻灯片、视频入口与议程' },
  { id: 'research', label: '论文研究', en: 'Research', icon: 'flask', description: '研究方法、数据系统与学术基准' },
  { id: 'evaluation', label: '评测与质量', en: 'Evaluation', icon: 'check', description: '回归、可观测性、证据与验收' }
];

export const STATUSES = {
  published: { label: '公开材料', help: '材料已公开，不表示其中的产品能力均已正式发布。' },
  'living-doc': { label: '持续文档', help: '原始文档可能继续变化，请结合条目的日期与版本阅读。' },
  'active-project': { label: '维护中项目', help: '在核验时有重要更新，不等于已通过生产环境验收。' },
  agenda: { label: '仅有议程', help: '仅核验到议题大纲，尚未确认完整讲义或回放。' },
  early: { label: '早期 / EAP', help: '研究、实验或早期实现，采用前需核对实际能力。' },
  archived: { label: '已归档', help: '保留作架构研究，不作为活跃维护项目。' }
};

export const DATE_LABELS = {
  published: '发布', updated: '更新', event: '场次', released: '版本', repo_created: '创建'
};

export const TAG_LABELS = {
  context: '上下文', 'context-graph': '上下文图谱', 'semantic-layer': '语义层', ontology: '本体',
  mcp: 'MCP', a2a: 'A2A', 'multi-agent': '多智能体', sandbox: '沙箱', governance: '治理',
  evaluation: '评测', benchmark: '基准', verification: '验证', memory: '记忆', skills: 'Skills',
  'data-engineering': '数据工程', 'data-science': '数据科学', 'text-to-sql': 'Text-to-SQL',
  'human-in-the-loop': '人工介入', observability: '可观测性', trace: '轨迹', lineage: '血缘',
  regression: '回归', visualization: '可视化', 'data-quality': '数据质量', metrics: '指标',
  'task-planning': '任务规划', planning: '规划', execution: '执行', identity: '身份',
  'cost-control': '成本控制', 'read-only': '只读', 'context-as-code': '上下文即代码',
  'self-hosted': '自托管', 'metric-contract': '指标契约', multimodal: '多模态', slides: '讲义',
  transcript: '实录', video: '视频', 'video-page': '视频入口', api: 'API', chatbi: 'ChatBI'
};

// Editorial navigation lenses. A resource can belong to more than one topic.
export const TOPICS = [
  { id: 'context', label: '语义与上下文', en: 'CONTEXT', icon: 'layers', description: '指标、本体、元数据与记忆，先让 Agent 理解业务。', tags: ['semantic-layer', 'ontology', 'context', 'context-graph', 'memory', 'context-as-code', 'semantic-model', 'semantic-catalog', 'semantic-view', 'knowledge-graph', 'enterprise-context', 'context-model', 'catalog', 'metrics', 'metric-contract', 'retrieval', 'rag', 'schema', 'knowledge-engineering'] },
  { id: 'analysis', label: '问数与分析', en: 'ANALYSIS', icon: 'chart', description: '从自然语言问数到 SQL、分析、图表与报告交付。', tags: ['text-to-sql', 'sql', 'analytics', 'chatbi', 'data-science', 'visualization', 'report', 'reporting', 'notebook', 'dashboard', 'insight-discovery', 'root-cause-analysis', 'data-assistant', 'qsql', 'semantic-sql', 'data-apps'] },
  { id: 'execution', label: '执行与编排', en: 'RUNTIME', icon: 'code', description: '任务规划、工具执行、隔离环境与失败恢复。', tags: ['execution', 'planning', 'task-planning', 'workflow', 'multi-agent', 'sandbox', 'skills', 'data-engineering', 'python', 'harness', 'agent-loop', 'orchestration', 'orchestrator', 'runtime', 'automation', 'recovery', 'dag', 'typed-dag', 'pipeline', 'supervisor', 'tool-routing'] },
  { id: 'integration', label: 'MCP 与接入', en: 'CONNECT', icon: 'link', description: '工具协议、API、SDK 与数据平台的连接方式。', tags: ['mcp', 'a2a', 'api', 'sdk', 'plugin', 'integration', 'tools', 'tool-design', 'tool-selection', 'data-platform', 'multi-database', 'multi-source', 'acp', 'database', 'warehouse', 'multi-engine'] },
  { id: 'evaluation', label: '评测与验证', en: 'EVALUATE', icon: 'flask', description: '基准、轨迹、回归与证据，判断结果能否交付。', tags: ['evaluation', 'benchmark', 'verification', 'observability', 'validation', 'regression', 'trace', 'traces', 'evidence', 'data-quality', 'lineage', 'determinism', 'testing', 'reproducibility', 'llm-as-judge', 'llm-judge', 'evaluator', 'verifiable', 'ground-truth', 'failure-analysis', 'calibration', 'citations', 'rubrics', 'rubric', 'semantic-validation'] },
  { id: 'governance', label: '权限与治理', en: 'GOVERN', icon: 'check', description: '身份、权限、审批与成本，明确谁能做什么。', tags: ['governance', 'identity', 'human-in-the-loop', 'security', 'authentication', 'permissions', 'iam', 'oauth', 'rbac', 'audit', 'cost-control', 'read-only', 'policy', 'runtime-policy', 'guardrails', 'masking', 'workspace-isolation', 'multi-tenant', 'threat-model', 'impersonation', 'agent-management'] }
];

export const DEFAULT_STATE = Object.freeze({
  q: '', section: '', topic: '', lang: '', status: '', tag: '', sort: 'smart', saved: false, latest: false, recent: false, resource: ''
});
const sorts = new Set(['smart', 'date', 'added', 'name']);
const collator = new Intl.Collator('zh-Hans-CN', { sensitivity: 'base', numeric: true });

export function safeUrl(value) {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value.trim());
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

export function readState(search = '') {
  const p = new URLSearchParams(search);
  const section = p.get('type') || '';
  const status = p.get('status') || '';
  return {
    q: (p.get('q') || '').slice(0, 256).trim(),
    section: SECTIONS.some(s => s.id === section) ? section : '',
    topic: TOPICS.some(t => t.id === p.get('topic')) ? p.get('topic') : '',
    lang: ['zh', 'en'].includes(p.get('lang')) ? p.get('lang') : '',
    status: Object.hasOwn(STATUSES, status) ? status : '',
    tag: (p.get('tag') || '').slice(0, 80).trim(),
    sort: sorts.has(p.get('sort')) ? p.get('sort') : 'smart',
    saved: p.get('saved') === '1', latest: p.get('latest') === '1',
    recent: p.get('recent') === '1',
    resource: (p.get('resource') || '').slice(0, 160)
  };
}

export function stateSearch(state) {
  const p = new URLSearchParams();
  if (state.q) p.set('q', state.q);
  if (state.section) p.set('type', state.section);
  if (state.topic) p.set('topic', state.topic);
  if (state.lang) p.set('lang', state.lang);
  if (state.status) p.set('status', state.status);
  if (state.tag) p.set('tag', state.tag);
  if (state.sort && state.sort !== 'smart') p.set('sort', state.sort);
  if (state.saved) p.set('saved', '1');
  if (state.latest) p.set('latest', '1');
  if (state.recent) p.set('recent', '1');
  if (state.resource) p.set('resource', state.resource);
  return p.size ? '?' + p.toString() : '';
}

export function dateKey(date) {
  const first = String(date || '').split('/')[0];
  const match = first.match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/);
  return match ? Number(match[1] + (match[2] || '01') + (match[3] || '01')) : 0;
}

export function displayDate(date) {
  return String(date || '日期未注明').split('/').join(' — ');
}

export function plainMarkdown(text) {
  return String(text || '')
    .replace(/!?\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/[*`]/g, '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

// Reuse authored README annotations where the original index has no summary.
export function readmeNotes(markdown, resources) {
  const known = new Set(resources.map(r => r.url));
  const notes = new Map();
  for (const line of String(markdown || '').split('\n')) {
    if (!/^(?:- |\d+\. )\*\*/.test(line)) continue;
    const separator = line.indexOf(' — ');
    if (separator < 0) continue;
    const note = plainMarkdown(line.slice(separator + 3));
    if (!note) continue;
    for (const match of line.slice(0, separator).matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      if (known.has(match[1]) && !notes.has(match[1])) notes.set(match[1], note);
    }
  }
  return notes;
}

export function prepareResources(resources, markdown = '') {
  const notes = readmeNotes(markdown, resources);
  return resources.map(resource => {
    const r = { ...resource };
    r.display_summary = r.summary || notes.get(r.url) || r.mechanism || '';
    r.summary_source = r.summary ? 'index' : notes.has(r.url) ? 'readme' : r.mechanism ? 'index' : '';
    r.topics = TOPICS.filter(topic => topic.tags.some(tag => (r.tags || []).includes(tag))).map(topic => topic.id);
    r.search_text = [r.title, r.organization, r.display_summary, r.mechanism, r.use_case, r.caveat,
      r.license, r.date, SECTIONS.find(s => s.id === r.section)?.label,
      ...(r.tags || []).flatMap(tag => [tag, TAG_LABELS[tag] || '']),
      ...(r.reading_path || []).flatMap(p => [p.title, p.focus])
    ].filter(Boolean).join(' ').toLocaleLowerCase();
    return r;
  });
}

export function searchScore(resource, query) {
  const text = String(query || '').trim().toLocaleLowerCase();
  if (!text) return 0;
  const title = resource.title.toLocaleLowerCase();
  const organization = (resource.organization || '').toLocaleLowerCase();
  const tags = (resource.tags || []).flatMap(tag => [tag, TAG_LABELS[tag] || '']).join(' ').toLocaleLowerCase();
  let score = title === text ? 120 : title.includes(text) ? 40 : 0;
  for (const word of text.split(/\s+/)) {
    if (title.includes(word)) score += 20;
    if (organization.includes(word)) score += 12;
    if (tags.includes(word)) score += 8;
  }
  return score;
}

export function selectResources(resources, state, { saved = new Set(), latest = new Set(), recent = [] } = {}) {
  const words = String(state.q || '').toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const recency = new Map(recent.map((id, index) => [id, index]));
  const selected = resources.filter(r =>
    (!state.section || r.section === state.section) &&
    (!state.topic || (r.topics || []).includes(state.topic)) &&
    (!state.lang || r.language === state.lang) &&
    (!state.status || r.status === state.status) &&
    (!state.tag || (r.tags || []).includes(state.tag)) &&
    (!state.saved || saved.has(r.id)) &&
    (!state.latest || latest.has(r.id)) &&
    (!state.recent || recency.has(r.id)) &&
    words.every(word => (r.search_text || '').includes(word))
  );
  return selected.sort((a, b) => {
    if (state.sort === 'smart') {
      const relevance = words.length ? searchScore(b, state.q) - searchScore(a, state.q) : 0;
      if (relevance) return relevance;
      if (state.recent) return recency.get(a.id) - recency.get(b.id);
    }
    if (state.sort === 'name') return collator.compare(a.title, b.title);
    if (state.sort === 'added') {
      const delta = dateKey(b.added_on) - dateKey(a.added_on);
      if (delta) return delta;
    }
    return dateKey(b.date) - dateKey(a.date) || collator.compare(a.title, b.title);
  });
}

export function sectionCounts(resources) {
  const counts = Object.fromEntries(SECTIONS.map(s => [s.id, 0]));
  for (const r of resources) if (Object.hasOwn(counts, r.section)) counts[r.section]++;
  return counts;
}

export function topicCounts(resources) {
  return Object.fromEntries(TOPICS.map(topic => [topic.id, resources.filter(r => (r.topics || []).includes(topic.id)).length]));
}

// Return text fragments instead of HTML so queries are always rendered as text.
export function highlightSegments(text, query) {
  const value = String(text || '');
  const words = [...new Set(String(query || '').toLocaleLowerCase().split(/\s+/).filter(Boolean))].slice(0, 12);
  const lower = value.toLocaleLowerCase();
  const ranges = [];
  for (const word of words) {
    let from = 0, position;
    while ((position = lower.indexOf(word, from)) !== -1) {
      ranges.push([position, position + word.length]); from = position + word.length;
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const range of ranges) {
    const last = merged.at(-1);
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([...range]);
  }
  const segments = []; let cursor = 0;
  for (const [start, end] of merged) {
    if (start > cursor) segments.push({ text: value.slice(cursor, start), match: false });
    segments.push({ text: value.slice(start, end), match: true }); cursor = end;
  }
  if (cursor < value.length || !segments.length) segments.push({ text: value.slice(cursor), match: false });
  return segments;
}

export function readingContext(resources, matches, id) {
  const filteredIndex = matches.findIndex(r => r.id === id);
  const items = filteredIndex >= 0 ? matches : resources;
  const index = filteredIndex >= 0 ? filteredIndex : items.findIndex(r => r.id === id);
  return { items, index, filtered: filteredIndex >= 0 };
}

export function recentHistory(value, knownIds) {
  const ids = Array.isArray(value) ? value : [];
  return [...new Set(ids.filter(id => typeof id === 'string' && (!knownIds || knownIds.has(id))))].slice(0, 30);
}

export function relatedResources(resources, current, limit = 3) {
  const navigationTags = new Set(['agenda', 'slides', 'video', 'video-page', 'transcript', 'recap', 'mit', 'mit-0', 'apache-2.0', 'no-license', 'multi-license', 'mixed-license', 'modified-gpl']);
  const tags = new Set((current.tags || []).filter(tag => !navigationTags.has(tag)));
  return resources.filter(r => r.id !== current.id).map(resource => {
    const sharedTags = (resource.tags || []).filter(tag => tags.has(tag));
    const sameOrganization = Boolean(current.organization && resource.organization === current.organization);
    return { resource, sharedTags, sameOrganization, score: sharedTags.length * 3 + (sameOrganization ? 4 : 0) };
  }).filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || dateKey(b.resource.date) - dateKey(a.resource.date) || collator.compare(a.resource.title, b.resource.title))
    .slice(0, limit);
}
