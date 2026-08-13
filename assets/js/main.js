const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
  }));
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  revealItems.forEach(el => observer.observe(el));
}

document.querySelector('#year').textContent = new Date().getFullYear();

const dialog = document.querySelector('#lightbox');
const dialogImg = dialog?.querySelector('img');
const closeButton = dialog?.querySelector('.lightbox-close');

function openLightbox(trigger) {
  if (!dialog || !dialogImg) return;
  dialogImg.src = trigger.dataset.src;
  dialogImg.alt = trigger.dataset.alt || '';
  if (typeof dialog.showModal === 'function') dialog.showModal();
}

document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
  trigger.addEventListener('click', event => {
    if (event.target.closest('a')) return;
    openLightbox(trigger);
  });
  trigger.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(trigger);
    }
  });
  if (!trigger.hasAttribute('tabindex')) trigger.setAttribute('tabindex', '0');
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-label', 'Enlarge evidence image');
});

closeButton?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) dialog.close();
});

// ---------- Expert V3: presentation & motion ----------
const progressBar = document.querySelector('.scroll-progress span');
const updateScrollProgress = () => {
  if (!progressBar) return;
  const doc = document.documentElement;
  const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / max));
  progressBar.style.transform = `scaleX(${progress})`;
};
updateScrollProgress();
window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);

// Stagger repeated items so sections enter as a composed presentation rather than all at once.
[
  '.principles .reveal, .principles > div',
  '.chart-grid .reveal',
  '.defect-grid .reveal',
  '.project-list .reveal',
  '.gallery .reveal',
  '.skill-groups .reveal'
].forEach(selector => {
  document.querySelectorAll(selector).forEach((el, index) => {
    el.style.setProperty('--reveal-delay', `${Math.min(index * 85, 340)}ms`);
  });
});

// Lifecycle steps animate in sequence when they enter the viewport.
const lifecycleSteps = document.querySelectorAll('.lifecycle-step');
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  lifecycleSteps.forEach(step => step.classList.add('lifecycle-visible'));
} else {
  const lifecycleObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      lifecycleSteps.forEach((step, index) => {
        setTimeout(() => step.classList.add('lifecycle-visible'), index * 95);
      });
      lifecycleObserver.disconnect();
    });
  }, { threshold: 0.35 });
  if (lifecycleSteps[0]) lifecycleObserver.observe(lifecycleSteps[0].closest('.trust-strip'));
}

// Count up the most important metrics once. Static fallback values remain in the HTML.
const countItems = document.querySelectorAll('.count-up');
const animateCount = el => {
  if (el.dataset.animated === 'true') return;
  el.dataset.animated = 'true';
  const target = Number(el.dataset.target || el.textContent);
  if (!Number.isFinite(target) || prefersReducedMotion) {
    el.textContent = String(target);
    return;
  }
  const duration = 900;
  const start = performance.now();
  const tick = now => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = String(Math.round(target * eased));
    if (p < 1) requestAnimationFrame(tick);
  };
  el.textContent = '0';
  requestAnimationFrame(tick);
};
if (!('IntersectionObserver' in window)) {
  countItems.forEach(animateCount);
} else {
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  countItems.forEach(el => countObserver.observe(el));
}

// A restrained pointer-following light in the hero adds depth without moving content.
const hero = document.querySelector('.hero');
if (hero && !prefersReducedMotion && window.matchMedia('(pointer:fine)').matches) {
  hero.addEventListener('pointermove', event => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
    hero.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
  });
}

// Keep navigation state aligned with the section being viewed.
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sectionMap = navLinks
  .map(link => ({ link, section: document.querySelector(link.getAttribute('href')) }))
  .filter(item => item.section);
if ('IntersectionObserver' in window && sectionMap.length) {
  const activeObserver = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach(link => link.classList.remove('active'));
    const match = sectionMap.find(item => item.section === visible.target);
    match?.link.classList.add('active');
  }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, .12, .35] });
  sectionMap.forEach(item => activeObserver.observe(item.section));
}

// Pause the looping project demo when it is out of view; resume when visible.
const demoVideo = document.querySelector('.case-media video');
if (demoVideo && 'IntersectionObserver' in window && !prefersReducedMotion) {
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        demoVideo.play().catch(() => {});
      } else {
        demoVideo.pause();
      }
    });
  }, { threshold: 0.2 });
  videoObserver.observe(demoVideo);
}
