import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const siteRoot = __dirname;
const sourceRoot = path.resolve(siteRoot, '../ontology-kb');
const pagesRoot = path.join(siteRoot, 'pages');

const SITE_TITLE = 'Ontology 知识库';
const SITE_TAGLINE = '把 ontology 的概念、方法、语义和案例整理成可读、可导航、可落地的静态知识站。';

const SECTION_ORDER = ['总览', '基础文档', '应用案例', '3PL 仓储案例包', '术语表'];

const STYLE = `
  :root {
    --bg: #ffffff;
    --bg-soft: #f6f3ee;
    --line: #e9e2d8;
    --line-strong: #d6cdbc;
    --text: #111111;
    --muted: #666666;
    --accent: #0b7285;
    --accent-2: #0f5f73;
    --max: 1060px;
    --serif: "Iowan Old Style", "Songti SC", "Noto Serif SC", Georgia, serif;
    --sans: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; background: var(--bg-soft); }
  body {
    margin: 0;
    color: var(--text);
    font-family: var(--sans);
    line-height: 1.7;
    background: var(--bg);
  }
  a { color: inherit; text-decoration: none; }
  button, input { font: inherit; }
  img { max-width: 100%; }

  .site { min-height: 100vh; display: grid; grid-template-rows: auto auto 1fr auto; }
  .topbar {
    position: sticky;
    top: 0;
    z-index: 20;
    border-bottom: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
  }
  .topbar-inner {
    max-width: var(--max);
    margin: 0 auto;
    padding: 8px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
  }
  .brand {
    font-family: var(--serif);
    font-size: 1.08rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .menu {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    align-items: center;
    justify-content: center;
    color: var(--muted);
    font-size: 0.92rem;
  }
  .menu a {
    position: relative;
    padding-bottom: 2px;
  }
  .menu a:hover,
  .menu a:focus-visible,
  .menu a[aria-current="true"] {
    color: var(--text);
  }
  .count {
    color: var(--muted);
    font-size: 0.78rem;
  }
  .archive {
    max-width: var(--max);
    margin: 0 auto;
    padding: 0 20px 28px;
  }
  .archive-list {
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 1px solid var(--line);
  }
  .section-divider {
    padding-top: 18px;
    margin-top: 18px;
    border-top: 1px solid var(--line);
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 10px;
  }
  .section-divider h3 {
    margin: 0;
    font-family: var(--serif);
    font-size: 1.05rem;
    letter-spacing: -0.03em;
  }
  .section-divider p {
    margin: 0;
    color: var(--muted);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .post {
    display: grid;
    grid-template-columns: 46px minmax(0, 1fr);
    gap: 18px;
    padding: 16px 0;
    border-bottom: 1px solid var(--line);
    align-items: start;
  }
  .post-index {
    color: var(--muted);
    font-family: var(--serif);
    font-size: 1.2rem;
    line-height: 1;
    padding-top: 2px;
  }
  .post-main { min-width: 0; }
  .post-meta {
    margin: 0 0 6px;
    color: var(--muted);
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .post h3 {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.15;
    letter-spacing: -0.03em;
  }
  .post h3 a:hover,
  .post h3 a:focus-visible { color: var(--accent-2); }
  .post-summary {
    margin: 8px 0 0;
    color: var(--muted);
    max-width: 64ch;
  }
  .article-wrap {
    max-width: 860px;
    margin: 0 auto;
    padding: 28px 20px 32px;
  }
  .breadcrumbs {
    color: var(--muted);
    font-size: 0.88rem;
    margin: 0 0 14px;
  }
  .breadcrumbs a {
    color: inherit;
  }
  .breadcrumbs a:hover,
  .breadcrumbs a:focus-visible { color: var(--text); }
  .article-head {
    padding-bottom: 18px;
    border-bottom: 1px solid var(--line);
    margin-bottom: 18px;
  }
  .article-kicker {
    color: var(--accent);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-size: 0.78rem;
    font-weight: 700;
    margin: 0 0 10px;
  }
  .article-head h1 {
    margin: 0;
    font-family: var(--serif);
    font-size: clamp(2.2rem, 4.5vw, 4.2rem);
    line-height: 1;
    letter-spacing: -0.05em;
  }
  .article-summary {
    margin: 14px 0 0;
    max-width: 70ch;
    color: var(--muted);
    font-size: 1rem;
  }
  .article-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
  }
  .toc {
    margin: 0 0 22px;
    border: 1px solid var(--line);
    background: var(--bg-soft);
    border-radius: 18px;
    padding: 16px 18px;
  }
  .toc h2 {
    margin: 0 0 10px;
    font-family: var(--serif);
    font-size: 1.1rem;
  }
  .toc ol {
    margin: 0;
    padding-left: 18px;
    color: var(--muted);
  }
  .toc li { margin: 6px 0; }
  .toc a:hover,
  .toc a:focus-visible { color: var(--text); }
  .article-body {
    font-size: 1.02rem;
  }
  .article-body h2,
  .article-body h3,
  .article-body h4 {
    font-family: var(--serif);
    letter-spacing: -0.03em;
    line-height: 1.2;
    margin-top: 2.1em;
    margin-bottom: 0.6em;
  }
  .article-body h2 { font-size: 1.8rem; }
  .article-body h3 { font-size: 1.4rem; }
  .article-body h4 { font-size: 1.15rem; }
  .article-body p,
  .article-body ul,
  .article-body ol,
  .article-body blockquote,
  .article-body table,
  .article-body pre {
    margin: 0 0 1.1em;
  }
  .article-body ul,
  .article-body ol { padding-left: 1.4em; }
  .article-body li { margin: 0.35em 0; }
  .article-body code {
    background: #f3efe8;
    border: 1px solid var(--line);
    padding: 0.12em 0.35em;
    border-radius: 6px;
    font-size: 0.94em;
  }
  .article-body pre {
    overflow: auto;
    padding: 14px 16px;
    border-radius: 16px;
    border: 1px solid var(--line);
    background: #f7f4ef;
  }
  .article-body pre code {
    background: transparent;
    border: 0;
    padding: 0;
  }
  .article-body table {
    width: 100%;
    border-collapse: collapse;
    overflow: hidden;
    border-radius: 14px;
    border: 1px solid var(--line);
  }
  .article-body th,
  .article-body td {
    border-bottom: 1px solid var(--line);
    padding: 10px 12px;
    vertical-align: top;
    text-align: left;
  }
  .article-body th {
    background: #faf7f2;
  }
  .article-body blockquote {
    margin-left: 0;
    padding-left: 16px;
    border-left: 3px solid var(--line-strong);
    color: var(--muted);
  }
  .page-nav {
    margin-top: 28px;
    padding-top: 18px;
    border-top: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .page-nav a {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 8px 12px;
    background: #fff;
  }
  .page-nav a:hover,
  .page-nav a:focus-visible {
    border-color: var(--line-strong);
  }
  .footer {
    border-top: 1px solid var(--line);
    background: #fff;
  }
  .footer-inner {
    max-width: var(--max);
    margin: 0 auto;
    padding: 18px 20px 28px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: space-between;
    color: var(--muted);
    font-size: 0.9rem;
  }
  .empty { padding: 18px 0 8px; color: var(--muted); }

  @media (max-width: 800px) {
    .topbar-inner { flex-direction: column; align-items: flex-start; }
    .menu { justify-content: flex-start; }
    .post { grid-template-columns: 34px minmax(0, 1fr); }
    .post-side { grid-column: 2; justify-items: start; text-align: left; }
  }
`;

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';
}

function countTokens(text) {
  const tokens = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .match(/[A-Za-z0-9_]+|[\u4e00-\u9fff]/g);
  return tokens ? tokens.length : 0;
}

function formatDate(date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function groupForDoc(relPath) {
  if (relPath === 'README.md') return '总览';
  if (relPath === 'applications/README.md') return '应用案例';
  if (relPath.startsWith('applications/3pl-warehouse/')) return '3PL 仓储案例包';
  if (relPath === 'glossary.md') return '术语表';
  return '基础文档';
}

function resolveMarkdownLink(href, currentSourceRel, currentOutputRel) {
  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith('#') || /^(https?:|mailto:|tel:|\/)/i.test(trimmed)) {
    return trimmed;
  }

  const hashIndex = trimmed.indexOf('#');
  const rawPath = hashIndex >= 0 ? trimmed.slice(0, hashIndex) : trimmed;
  const hash = hashIndex >= 0 ? trimmed.slice(hashIndex) : '';
  if (!rawPath.endsWith('.md')) {
    return trimmed;
  }

  const sourceDir = path.posix.dirname(currentSourceRel);
  const resolvedSource = path.posix.normalize(path.posix.join(sourceDir, rawPath));
  const targetOutput = resolvedSource.replace(/\.md$/, '.html');
  const fromDir = path.posix.dirname(currentOutputRel);
  const relative = path.posix.relative(fromDir, targetOutput) || path.posix.basename(targetOutput);
  return `${relative}${hash}`;
}

function renderInline(text, currentSourceRel, currentOutputRel) {
  const placeholders = [];
  const withCode = text.replace(/`([^`]+)`/g, (_, code) => {
    const token = `@@CODE${placeholders.length}@@`;
    placeholders.push(`<code>${escapeHtml(code)}</code>`);
    return token;
  });

  const withLinks = withCode.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const resolved = resolveMarkdownLink(href, currentSourceRel, currentOutputRel);
    const safeHref = escapeHtml(resolved);
    return `<a href="${safeHref}">${renderInline(label, currentSourceRel, currentOutputRel)}</a>`;
  });

  const withStrong = withLinks.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  const withEm = withStrong.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>');

  return withEm.replace(/@@CODE(\d+)@@/g, (_, index) => placeholders[Number(index)]);
}

function extractParagraphText(lines) {
  const parts = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (parts.length) break;
      continue;
    }
    if (/^#{1,6}\s+/.test(trimmed) || /^```/.test(trimmed) || /^>\s?/.test(trimmed)) {
      continue;
    }
    if (/^(\s*)([-*+]|(\d+\.))\s+/.test(line)) {
      continue;
    }
    if (/^\|.*\|$/.test(trimmed)) {
      continue;
    }
    parts.push(trimmed);
    if (parts.join(' ').length > 220) break;
  }
  return parts.join(' ');
}

function renderList(lines, startIndex, currentSourceRel, currentOutputRel, baseIndent = null) {
  const matchAt = (line) => {
    const matched = line.match(/^(\s*)([-*+]|(\d+\.))\s+(.*)$/);
    if (!matched) return null;
    return {
      indent: matched[1].length,
      type: matched[3] ? 'ol' : 'ul',
      text: matched[4],
    };
  };

  const first = matchAt(lines[startIndex]);
  const indent = baseIndent ?? first.indent;
  const type = first.type;
  const items = [];
  let i = startIndex;

  while (i < lines.length) {
    const match = matchAt(lines[i]);
    if (!match || match.indent < indent || match.type !== type) break;
    if (match.indent > indent) {
      const nested = renderList(lines, i, currentSourceRel, currentOutputRel, match.indent);
      if (items.length) {
        items[items.length - 1].nested.push(nested.html);
      }
      i = nested.nextIndex;
      continue;
    }

    const item = { text: match.text, nested: [] };
    i++;
    while (i < lines.length && lines[i].trim() === '') i++;
    if (i < lines.length) {
      const next = matchAt(lines[i]);
      if (next && next.indent > indent) {
        const nested = renderList(lines, i, currentSourceRel, currentOutputRel, next.indent);
        item.nested.push(nested.html);
        i = nested.nextIndex;
      }
    }
    items.push(item);
  }

  const html = `<${type}>${items
    .map((item) => `<li>${renderInline(item.text, currentSourceRel, currentOutputRel)}${item.nested.join('')}</li>`)
    .join('')}</${type}>`;
  return { html, nextIndex: i };
}

function renderTable(lines, startIndex, currentSourceRel, currentOutputRel) {
  const rows = [];
  let i = startIndex;
  while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) {
    rows.push(lines[i]);
    i++;
  }
  const splitRow = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
  const body = rows.slice(2).map(splitRow);
  const head = splitRow(rows[0]);
  const header = `<thead><tr>${head.map((cell) => `<th>${renderInline(cell, currentSourceRel, currentOutputRel)}</th>`).join('')}</tr></thead>`;
  const tbody = `<tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell, currentSourceRel, currentOutputRel)}</td>`).join('')}</tr>`).join('')}</tbody>`;
  return { html: `<table>${header}${tbody}</table>`, nextIndex: i };
}

function renderMarkdown(markdown, currentSourceRel, currentOutputRel) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  const toc = [];
  const slugCounts = new Map();
  let title = '';
  let excerpt = '';
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    if (/^```/.test(trimmed)) {
      const language = trimmed.slice(3).trim();
      const code = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        code.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(`<pre><code${language ? ` class="language-${escapeHtml(language)}"` : ''}>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      const base = slugify(text);
      const nextCount = (slugCounts.get(base) || 0) + 1;
      slugCounts.set(base, nextCount);
      const id = nextCount === 1 ? base : `${base}-${nextCount}`;
      if (level > 1) {
        toc.push({ level, text, id });
      }
      if (!title && level === 1) {
        title = text;
      }
      blocks.push(`<h${level} id="${id}">${renderInline(text, currentSourceRel, currentOutputRel)}</h${level}>`);
      i++;
      continue;
    }

    if (/^\s*\|.*\|\s*$/.test(trimmed) && i + 1 < lines.length && /^\s*\|?[\s:-]+\|[\s|:-]*\s*$/.test(lines[i + 1].trim())) {
      const table = renderTable(lines, i, currentSourceRel, currentOutputRel);
      blocks.push(table.html);
      i = table.nextIndex;
      continue;
    }

    if (/^(\s*)([-*+]|(\d+\.))\s+/.test(line)) {
      const list = renderList(lines, i, currentSourceRel, currentOutputRel);
      blocks.push(list.html);
      i = list.nextIndex;
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i].trim())) {
        quote.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      blocks.push(`<blockquote><p>${renderInline(quote.join(' '), currentSourceRel, currentOutputRel)}</p></blockquote>`);
      continue;
    }

    const paragraph = [];
    while (i < lines.length) {
      const current = lines[i];
      const currentTrimmed = current.trim();
      if (!currentTrimmed) break;
      if (/^#{1,6}\s+/.test(currentTrimmed) || /^```/.test(currentTrimmed) || /^>\s?/.test(currentTrimmed)) break;
      if (/^(\s*)([-*+]|(\d+\.))\s+/.test(current)) break;
      if (/^\s*\|.*\|\s*$/.test(currentTrimmed)) break;
      paragraph.push(currentTrimmed);
      i++;
    }
    const paragraphText = paragraph.join(' ');
    if (paragraphText) {
      if (!excerpt) excerpt = paragraphText;
      blocks.push(`<p>${renderInline(paragraphText, currentSourceRel, currentOutputRel)}</p>`);
    } else {
      i++;
    }
  }

  return {
    title,
    excerpt,
    toc,
    html: blocks.join('\n'),
  };
}

async function walkMdFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await walkMdFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

function toRelativeSource(absPath) {
  return toPosix(path.relative(sourceRoot, absPath));
}

function outputPathForSource(relSource) {
  return path.join(pagesRoot, relSource.replace(/\.md$/, '.html'));
}

function outputRelForSource(relSource) {
  return toPosix(path.join('pages', relSource.replace(/\.md$/, '.html')));
}

function parentReadmeRel(relSource) {
  const dir = path.posix.dirname(relSource);
  if (dir === '.') return null;
  return `${dir}/README.md`;
}

function prettyLabelForPath(relSource) {
  const parts = relSource.split('/');
  if (relSource === 'README.md') return '总览';
  if (relSource === 'applications/README.md') return '应用案例';
  if (relSource === 'applications/3pl-warehouse/README.md') return '3PL 仓储案例包';
  if (relSource === 'glossary.md') return '术语表';
  const last = parts.at(-1).replace(/\.md$/, '');
  return last;
}

async function collectDocs() {
  const files = await walkMdFiles(sourceRoot);
  const docs = [];

  for (const file of files) {
    const sourceRel = toRelativeSource(file);
    const raw = await fs.readFile(file, 'utf8');
    const stat = await fs.stat(file);
    const rendered = renderMarkdown(raw, sourceRel, outputRelForSource(sourceRel));
    const fallbackTitle = path.basename(sourceRel, '.md').replace(/^\d+-/, '');
    const title = rendered.title || prettyLabelForPath(sourceRel) || fallbackTitle;
    docs.push({
      sourceAbs: file,
      sourceRel,
      outputRel: outputRelForSource(sourceRel),
      outputAbs: outputPathForSource(sourceRel),
      title,
      excerpt: rendered.excerpt || title,
      toc: rendered.toc,
      bodyHtml: rendered.html,
      words: countTokens(raw),
      updated: formatDate(stat.mtime),
      updatedMs: stat.mtimeMs,
      group: groupForDoc(sourceRel),
      parentReadme: parentReadmeRel(sourceRel),
      isReadme: path.basename(sourceRel) === 'README.md',
      raw,
    });
  }

  const docMap = new Map(docs.map((doc) => [doc.sourceRel, doc]));
  const childMap = new Map();
  for (const doc of docs) {
    const links = [...doc.raw.matchAll(/\[([^\]]+)\]\(([^)]+\.md(?:#[^)]+)?)\)/g)]
      .map((match) => match[2])
      .map((href) => {
        const hashIndex = href.indexOf('#');
        const rawPath = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
        return path.posix.normalize(path.posix.join(path.posix.dirname(doc.sourceRel), rawPath));
      })
      .filter((rel) => docMap.has(rel));
    childMap.set(doc.sourceRel, links);
  }

  return { docs, docMap, childMap };
}

function buildTraversalOrder(docMap, childMap) {
  const root = 'README.md';
  const visited = new Set();
  const ordered = [];

  function visit(rel) {
    if (!docMap.has(rel) || visited.has(rel)) return;
    visited.add(rel);
    ordered.push(rel);
    const children = childMap.get(rel) || [];
    for (const child of children) {
      visit(child);
    }
  }

  visit(root);
  for (const rel of docMap.keys()) {
    if (!visited.has(rel)) visit(rel);
  }

  return ordered;
}

function buildHomeDocs(docs, orderedRelPaths) {
  const byRel = new Map(docs.map((doc) => [doc.sourceRel, doc]));
  return orderedRelPaths.map((rel, index) => {
    const doc = byRel.get(rel);
    return {
      index: index + 1,
      title: doc.title,
      href: doc.outputRel,
      category: doc.group,
      updated: doc.updated,
      words: doc.words,
      excerpt: doc.excerpt,
      path: doc.sourceRel,
    };
  });
}

function buildHomeSections(docs, orderedRelPaths) {
  const byRel = new Map(docs.map((doc) => [doc.sourceRel, doc]));
  const grouped = new Map(SECTION_ORDER.map((section) => [section, []]));

  for (const rel of orderedRelPaths) {
    const doc = byRel.get(rel);
    if (!doc) continue;
    if (!grouped.has(doc.group)) {
      grouped.set(doc.group, []);
    }
    grouped.get(doc.group).push(doc);
  }

  return SECTION_ORDER
    .map((section) => ({
      section,
      id: slugify(section),
      docs: (grouped.get(section) || []).map((doc) => ({
        ...doc,
        href: doc.outputRel,
        path: doc.sourceRel,
      })),
    }))
    .filter((section) => section.docs.length > 0);
}

function renderHomePage({ docs, orderedRelPaths, latestUpdate, rootDoc }) {
  const sections = buildHomeSections(docs, orderedRelPaths);
  const intro = rootDoc.excerpt || SITE_TAGLINE;
  const archiveItems = sections.map((section) => `
        <li class="section-divider" id="${section.id}">
          <h3>${escapeHtml(section.section)}</h3>
          <p>${section.docs.length} 篇文档</p>
        </li>
${section.docs.map((doc, index) => {
    const number = String(index + 1).padStart(2, '0');
    return `        <li class="post">
          <div class="post-index">${number}</div>
          <div class="post-main">
            <p class="post-meta">${doc.updated} · ${doc.group} · ${doc.words} 字</p>
            <h3><a href="${doc.href}">${escapeHtml(doc.title)}</a></h3>
            <p class="post-summary">${escapeHtml(doc.excerpt)}</p>
          </div>
        </li>`;
  }).join('\n')}
      `).join('\n');

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${escapeHtml(SITE_TAGLINE)}" />
  <title>${escapeHtml(SITE_TITLE)}</title>
  <style>${STYLE}</style>
</head>
<body>
  <div class="site">
    <header class="topbar">
      <div class="topbar-inner">
        <a class="brand" href="./index.html">${escapeHtml(SITE_TITLE)}</a>
        <nav class="menu" aria-label="分类导航">
${sections.map((section) => `          <a href="#${section.id}">${escapeHtml(section.section)} <span class="count">${section.docs.length}</span></a>`).join('\n')}
        </nav>
      </div>
    </header>

    <main class="archive" id="directory">
      <ol class="archive-list">
${archiveItems}
      </ol>
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <div>生成来源：<code>ontology-kb/</code></div>
        <div>首页与文章页都由 <code>build-site.mjs</code> 生成。</div>
        <div>最后整理：${latestUpdate}</div>
      </div>
    </footer>
  </div>
</body>
</html>`;
}

function renderDocPage(doc, { prev, next, rootHref, groupHomeHref, siteTitle, latestUpdate, homeHref }) {
  const breadcrumbs = [
    `<a href="${homeHref}">${escapeHtml(siteTitle)}</a>`,
  ];
  if (doc.group === '应用案例' || doc.group === '3PL 仓储案例包') {
    breadcrumbs.push(`<a href="${groupHomeHref}">${escapeHtml(doc.group)}</a>`);
  } else if (doc.group === '总览' || doc.group === '基础文档' || doc.group === '术语表') {
    breadcrumbs.push(`<a href="${homeHref}#directory">${escapeHtml(doc.group)}</a>`);
  }
  breadcrumbs.push(escapeHtml(doc.title));

  const tocHtml = doc.toc.length
    ? `<section class="toc"><h2>目录</h2><ol>${doc.toc
        .map((item) => `<li style="margin-left:${(item.level - 2) * 12}px"><a href="#${item.id}">${escapeHtml(item.text)}</a></li>`)
        .join('')}</ol></section>`
    : '';

  const pageNav = [
    prev ? `<a href="${prev.outputRel}">上一页：${escapeHtml(prev.title)}</a>` : '',
    rootHref ? `<a href="${rootHref}">返回目录</a>` : '',
    next ? `<a href="${next.outputRel}">下一页：${escapeHtml(next.title)}</a>` : '',
  ].filter(Boolean).join('');

  const sectionHome = doc.group === '应用案例' || doc.group === '3PL 仓储案例包'
    ? groupHomeHref
    : homeHref;

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${escapeHtml(doc.excerpt)}" />
  <title>${escapeHtml(doc.title)} · ${escapeHtml(siteTitle)}</title>
  <style>${STYLE}</style>
</head>
<body>
  <div class="site">
    <header class="topbar">
      <div class="topbar-inner">
        <a class="brand" href="${homeHref}">${escapeHtml(siteTitle)}</a>
        <nav class="menu" aria-label="分类导航">
          <a href="${homeHref}#directory">目录</a>
          <a href="${sectionHome}">分区</a>
          <a href="${homeHref}">首页</a>
        </nav>
        <div class="version">${escapeHtml(doc.updated)}</div>
      </div>
    </header>

    <article class="article-wrap">
      <p class="breadcrumbs">${breadcrumbs.join(' / ')}</p>
      <header class="article-head">
        <p class="article-kicker">${escapeHtml(doc.group)} · ${doc.words} 字 · ${escapeHtml(doc.sourceRel)}</p>
        <h1>${escapeHtml(doc.title)}</h1>
        <p class="article-summary">${escapeHtml(doc.excerpt)}</p>
        <div class="article-meta">
          <span class="pill"><strong>${escapeHtml(doc.updated)}</strong> 更新</span>
          <span class="pill">${escapeHtml(doc.group)}</span>
          <span class="pill">源文件对应 HTML 页</span>
        </div>
      </header>

      ${tocHtml}
      <section class="article-body">
        ${doc.bodyHtml}
      </section>

      <nav class="page-nav" aria-label="文章导航">${pageNav}</nav>
    </article>

    <footer class="footer">
      <div class="footer-inner">
        <div>生成来源：<code>ontology-kb/${escapeHtml(doc.sourceRel)}</code></div>
        <div>HTML 页面自动生成，保证 Markdown 与站点同步。</div>
        <div>最后整理：${escapeHtml(latestUpdate)}</div>
      </div>
    </footer>
  </div>
</body>
</html>`;
}

async function main() {
  const { docs, docMap, childMap } = await collectDocs();
  const orderedRelPaths = buildTraversalOrder(docMap, childMap);
  const orderedDocs = orderedRelPaths.map((rel) => docMap.get(rel)).filter(Boolean);
  const rootDoc = docMap.get('README.md');
  const latestUpdate = formatDate(new Date(Math.max(...docs.map((doc) => doc.updatedMs))));

  await fs.rm(pagesRoot, { recursive: true, force: true });
  await fs.mkdir(pagesRoot, { recursive: true });

  const homeHtml = renderHomePage({
    docs: orderedDocs,
    orderedRelPaths,
    latestUpdate,
    rootDoc,
  });
  await fs.writeFile(path.join(siteRoot, 'index.html'), homeHtml, 'utf8');

  const rootHref = './index.html';
  const groupHomeHref = './index.html';
  for (let index = 0; index < orderedDocs.length; index += 1) {
    const doc = orderedDocs[index];
    const prev = index > 0 ? orderedDocs[index - 1] : null;
    const next = index < orderedDocs.length - 1 ? orderedDocs[index + 1] : null;
    const html = renderDocPage(doc, {
      prev,
      next,
      rootHref,
      groupHomeHref,
      siteTitle: SITE_TITLE,
      latestUpdate,
      homeHref: './index.html',
    });
    await fs.mkdir(path.dirname(doc.outputAbs), { recursive: true });
    await fs.writeFile(doc.outputAbs, html, 'utf8');
  }

  const missing = orderedDocs.filter((doc) => !doc.outputAbs);
  if (missing.length) {
    throw new Error(`Missing output paths for: ${missing.map((doc) => doc.sourceRel).join(', ')}`);
  }

  console.log(`Generated ${orderedDocs.length} HTML pages in ${siteRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
