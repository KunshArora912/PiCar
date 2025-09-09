// Minimal, robust behaviors: theme, mobile nav, smooth scroll, reveal

document.addEventListener('DOMContentLoaded', () => {
    // Force dark-only
    localStorage.removeItem('theme');              // ignore any saved light choice
    document.body.removeAttribute('data-theme');   // ensure no light attr lingers

  // ---------- Theme ----------
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  const body = document.body;

  if (saved) {
    body.setAttribute('data-theme', saved);
  } else {
    body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  const themeBtn = document.querySelector('.theme-toggle');
  themeBtn?.addEventListener('click', () => {
    const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ---------- Mobile nav ----------
  const burger = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  burger?.addEventListener('click', () => links.classList.toggle('show'));
  links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('show')));

  // ---------- Smooth scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---------- Reveal on scroll ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.section, .card, .callout, .stat, .doc-card, img.shadowed, .details')
    .forEach(el => { el.classList.add('reveal'); io.observe(el); });
});
