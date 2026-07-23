/* ══════════════════════════════════════════════════════════════
   BLOG.JS — powers both blog.html and blog-post.html
   Relies on blogPosts / getPostBySlug / getRelatedPosts from
   blog-data.js, loaded before this file.
   ══════════════════════════════════════════════════════════════ */

/* ── HAMBURGER MENU (shared across the site) ── */
function initMenu() {
  const menuOverlay = document.getElementById('menu-overlay');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const menuClose = document.getElementById('menu-close');
  if (!menuOverlay || !hamburgerBtn) return;
  hamburgerBtn.addEventListener('click', () => menuOverlay.classList.add('open'));
  menuClose?.addEventListener('click', () => menuOverlay.classList.remove('open'));
  menuOverlay.addEventListener('click', e => {
    if (e.target === menuOverlay) menuOverlay.classList.remove('open');
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('visible'), 2200);
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* ══════════════════════════════════════════════════════════════
   LISTING PAGE (blog.html)
   ══════════════════════════════════════════════════════════════ */

const PAGE_SIZE = 8;
let listingState = { category: 'All', query: '', visible: PAGE_SIZE };

function blogCardHTML(post) {
  return `
    <a class="blog-card" href="blog-post.html?slug=${encodeURIComponent(post.slug)}">
      <div class="blog-card-img-wrap">
        <img class="blog-card-img" src="${post.coverImage}" alt="${post.title}" loading="lazy">
        <span class="blog-card-cat">${post.categoryIcon} ${post.category}</span>
      </div>
      <div class="blog-card-body">
        <div class="blog-card-title">${post.title}</div>
        <div class="blog-card-excerpt">${post.excerpt}</div>
        <div class="blog-meta">
          <span>📅 ${formatDate(post.date)}</span>
          <span>⏱ ${post.readTime} min read</span>
          <span>📦 ${post.items.length} items</span>
        </div>
      </div>
    </a>`;
}

function renderListing() {
  const grid = document.getElementById('blog-grid');
  const emptyState = document.getElementById('blog-empty');
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (!grid) return;

  const q = listingState.query.trim().toLowerCase();
  const filtered = blogPosts.filter(p => {
    const matchesCat = listingState.category === 'All' || p.category === listingState.category;
    const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const toShow = filtered.slice(0, listingState.visible);
  grid.innerHTML = toShow.map(blogCardHTML).join('');

  emptyState.hidden = filtered.length !== 0;
  loadMoreBtn.hidden = listingState.visible >= filtered.length;
}

function initChips() {
  const chips = document.querySelectorAll('#category-chips .chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      listingState.category = chip.dataset.category;
      listingState.visible = PAGE_SIZE;
      renderListing();
    });
  });
}

function initSearch() {
  const input = document.getElementById('blog-search-input');
  if (!input) return;
  input.addEventListener('input', () => {
    listingState.query = input.value;
    listingState.visible = PAGE_SIZE;
    renderListing();
  });
}

function initLoadMore() {
  const btn = document.getElementById('load-more-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    listingState.visible += PAGE_SIZE;
    renderListing();
  });
}

function initFeatured() {
  const el = document.getElementById('featured-post');
  if (!el || !blogPosts.length) return;
  const post = blogPosts[0];
  el.href = `blog-post.html?slug=${encodeURIComponent(post.slug)}`;
  el.innerHTML = `
    <img class="featured-img" src="${post.coverImage}" alt="${post.title}" loading="lazy">
    <div class="featured-body">
      <span class="featured-eyebrow">${post.categoryIcon} Featured · ${post.category}</span>
      <h2>${post.title}</h2>
      <p>${post.excerpt}</p>
      <div class="blog-meta">
        <span>📅 ${formatDate(post.date)}</span>
        <span>⏱ ${post.readTime} min read</span>
      </div>
    </div>`;
}

function initListingPage() {
  if (!document.getElementById('blog-grid')) return;
  initFeatured();
  initChips();
  initSearch();
  initLoadMore();
  renderListing();
}

/* ══════════════════════════════════════════════════════════════
   POST PAGE (blog-post.html)
   ══════════════════════════════════════════════════════════════ */

function ctaButtonsHTML(stores) {
  // First store is the primary "buy now" action; any others are secondary chips.
  return stores.map((s, i) => `
    <a class="${i === 0 ? 'item-cta-primary' : 'item-cta-secondary'}" href="${s.url}" target="_blank" rel="noopener sponsored">
      ${i === 0 ? '🛍️ ' : ''}${s.name}${i === 0 ? ' →' : ''}
    </a>`).join('');
}

function itemCardHTML(item) {
  // Compact, scannable layout: small thumbnail + short reason + tags + a
  // clear buy CTA, so a reader can decide in a glance instead of scrolling
  // through a large photo per item.
  return `
    <div class="item-card" id="item-${item.rank}">
      <div class="item-card-inner">
        <div class="item-thumb-wrap">
          <img class="item-thumb" src="${item.image}" alt="${item.name}" loading="lazy">
          <span class="item-rank-num">${item.rank}</span>
        </div>
        <div class="item-content">
          <div class="item-top-line">
            <div class="item-name">${item.name}</div>
            <div class="item-price-tier">${item.priceTier}</div>
          </div>
          ${item.badge ? `<span class="item-badge-inline">${item.badge}</span>` : ''}
          <p class="item-why-text">${item.why}</p>
          <div class="item-tags">
            ${item.tags.slice(0, 3).map(t => `<span class="item-tag">${t}</span>`).join('')}
          </div>
          <div class="item-cta-row">
            ${ctaButtonsHTML(item.stores)}
          </div>
        </div>
      </div>
    </div>`;
}

function tocItemHTML(item) {
  return `<a class="post-toc-item" href="#item-${item.rank}"><span class="toc-rank">${item.rank}</span> ${item.name}</a>`;
}

function relatedCardHTML(post) {
  return `
    <a class="related-card" href="blog-post.html?slug=${encodeURIComponent(post.slug)}">
      <img src="${post.coverImage}" alt="${post.title}" loading="lazy">
      <div class="related-card-body">
        <span class="r-cat">${post.category}</span>
        <span class="r-title">${post.title}</span>
      </div>
    </a>`;
}

function setSEO(post) {
  document.title = `${post.title} — LootLo`;
  const setMeta = (name, content) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
    el.setAttribute('content', content);
  };
  setMeta('description', post.metaDescription);
  setMeta('keywords', post.keywords);

  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": post.title,
    "description": post.metaDescription,
    "image": post.coverImage,
    "datePublished": post.date,
    "dateModified": post.updated,
    "author": { "@type": "Organization", "name": post.author },
    "itemListElement": post.items.map(it => ({
      "@type": "ListItem",
      "position": it.rank,
      "name": it.name,
      "image": it.image
    }))
  });
  document.head.appendChild(schema);
}

function renderPost(post) {
  document.getElementById('post-nav-badge').textContent = post.category;
  document.getElementById('post-cover').src = post.coverImage;
  document.getElementById('post-cover').alt = post.title;
  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-excerpt').textContent = post.excerpt;
  document.getElementById('post-date').textContent = `📅 ${formatDate(post.date)}`;
  document.getElementById('post-readtime').textContent = `⏱ ${post.readTime} min read`;
  document.getElementById('post-updated').textContent = `🔄 Updated ${formatDate(post.updated)}`;
  document.getElementById('post-intro').innerHTML = post.intro.map(p => `<p>${p}</p>`).join('');
  document.getElementById('post-methodology').textContent = post.methodology;
  document.getElementById('post-toc-list').innerHTML = post.items.map(tocItemHTML).join('');
  document.getElementById('item-list').innerHTML = post.items.map(itemCardHTML).join('');

  const related = getRelatedPosts(post.slug);
  const relatedSection = document.getElementById('related-section');
  if (related.length) {
    document.getElementById('related-grid').innerHTML = related.map(relatedCardHTML).join('');
  } else {
    relatedSection.hidden = true;
  }
}

function renderNotFound() {
  const main = document.querySelector('.main');
  main.innerHTML = `
    <div class="empty-state" style="margin:40px 20px;">
      <div class="empty-icon">🔍</div>
      <div class="empty-title">Blog post not found</div>
      <div class="empty-desc">This post may have been moved or unpublished.</div>
      <a class="explore-more-btn" style="margin-top:16px;display:inline-block;border-radius:var(--radius-sm);" href="blog.html">← Back to Blog</a>
    </div>`;
}

function initReadProgress() {
  const bar = document.getElementById('read-progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  }, { passive: true });
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initShare(post) {
  const btn = document.getElementById('share-btn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: post.title, text: post.excerpt, url }); }
      catch (e) { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      showToast('Link copied to clipboard');
    }
  });
}

function initPostPage() {
  const postRoot = document.getElementById('post-title');
  if (!postRoot) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const post = getPostBySlug(slug);

  if (!post) { renderNotFound(); return; }

  setSEO(post);
  renderPost(post);
  initReadProgress();
  initBackToTop();
  initShare(post);
}

/* ── BOOT ── */
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initListingPage();
  initPostPage();
});
