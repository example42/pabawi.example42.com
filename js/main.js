/* =============================================
   Pabawi — Site JS
   ============================================= */

// --- Active nav link ---
(function () {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (path.endsWith(href) || (href !== '/' && href !== '/index.html' && path.includes(href.replace('.html', '')))) {
      a.classList.add('active');
    }
  });
})();

// --- Copy buttons ---
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const pre = btn.closest('.code-block, .docs-code').querySelector('pre');
    const text = pre ? pre.textContent.replace(/^\$\s*/gm, '') : '';
    navigator.clipboard.writeText(text.trim()).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      btn.style.color = 'var(--green)';
      btn.style.borderColor = 'var(--green)';
      setTimeout(() => { btn.textContent = orig; btn.style.color = ''; btn.style.borderColor = ''; }, 1800);
    });
  });
});

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- Intersection observer for fade-up ---
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.feature-card, .usecase-card, .persona-card, .roadmap-card, .value-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  obs.observe(el);
});

// --- Docs sidebar active link on scroll ---
if (document.querySelector('.docs-layout')) {
  const sections = document.querySelectorAll('.docs-section[id]');
  const sideLinks = document.querySelectorAll('.docs-sidebar a[href^="#"]');

  const docObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        sideLinks.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.docs-sidebar a[href="#${e.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.25, rootMargin: '-64px 0px -60% 0px' });

  sections.forEach(s => docObs.observe(s));
}

// --- Hamburger menu (mobile) ---
const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? '' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position    = 'absolute';
    navLinks.style.top         = '64px';
    navLinks.style.left        = '0';
    navLinks.style.right       = '0';
    navLinks.style.background  = 'var(--bg-card)';
    navLinks.style.padding     = '1.5rem';
    navLinks.style.borderBottom = '1px solid var(--border)';
    navLinks.style.gap         = '1.25rem';
  });
}

// --- Terminal typing animation (hero only) ---
if (document.querySelector('.hero-terminal')) {
  const cursor = document.createElement('span');
  cursor.className = 't-cursor';
  cursor.style.cssText = 'display:inline-block;width:8px;height:1em;background:var(--accent);vertical-align:text-bottom;animation:blink .8s steps(1) infinite;margin-left:2px;';
  const style = document.createElement('style');
  style.textContent = '@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}';
  document.head.appendChild(style);
  const lastLine = document.querySelector('.t-last-line');
  if (lastLine) lastLine.appendChild(cursor);
}
