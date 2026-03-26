/* ── CUSTOM CURSOR ──────────────────────────────────── */
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');
let mx = window.innerWidth / 2, my = window.innerHeight / 2;
let tx = mx, ty = my;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  if (cursorDot) {
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top = my + 'px';
  }
});

function cursorLoop() {
  tx += (mx - tx) * 0.15;
  ty += (my - ty) * 0.15;
  if(cursorOutline) {
    cursorOutline.style.left = tx + 'px';
    cursorOutline.style.top = ty + 'px';
  }
  requestAnimationFrame(cursorLoop);
}
cursorLoop();

document.querySelectorAll('a, button, .btn, .btn-pill, .jt-row, input, textarea, .hero-img-box, .abt-img-bento').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

/* ── NAV SHRINK ─────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── REVEAL (Clean Dribbble Style) ─────────────────── */
const revEls = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if(e.isIntersecting){
      e.target.style.transitionDelay = (i % 5) * 0.1 + 's';
      e.target.classList.add('visible');
      
      e.target.querySelectorAll('.bar').forEach(b => {
        if(b.dataset.width) b.style.width = b.dataset.width + '%';
      });
      
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revEls.forEach(el => revObs.observe(el));

/* ── SKILLS PROGRESS BARS ──────────────────────────── */
function animateBars() {
  document.querySelectorAll('.sk-card').forEach(card => {
    const bar = card.querySelector('.bar');
    if (bar) {
      const width = bar.getAttribute('data-width');
      bar.style.setProperty('--target-width', width + '%');
    }
  });
}

const skillsSection = document.getElementById('skills');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateBars();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (skillsSection) observer.observe(skillsSection);