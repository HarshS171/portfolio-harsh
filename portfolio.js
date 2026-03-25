
(function(){
  const c = document.getElementById('grid-canvas');
  const ctx = c.getContext('2d');
  let W, H;

  function resize(){
    W = c.width = window.innerWidth;
    H = c.height = window.innerHeight;
    draw();
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    const horizon = H * 0.52;
    const vp = { x: W/2, y: horizon };
    const cols = 22, rows = 16;

    ctx.lineWidth = 0.5;

    // vertical perspective lines
    ctx.strokeStyle = 'rgba(201,168,76,0.2)';
    for(let i = 0; i <= cols; i++){
      const x = (i / cols) * W * 1.8 - W * 0.4;
      ctx.beginPath();
      ctx.moveTo(vp.x, vp.y);
      ctx.lineTo(x, H * 1.1);
      ctx.stroke();
    }

    // horizontal perspective lines
    for(let j = 1; j <= rows; j++){
      const t = Math.pow(j / rows, 2.4);
      const y = horizon + t * (H * 1.1 - horizon);
      const spread = (vp.x + W * 0.6) * t;
      const alpha = 0.04 + t * 0.18;
      ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
      ctx.beginPath();
      ctx.moveTo(vp.x - spread, y);
      ctx.lineTo(vp.x + spread, y);
      ctx.stroke();
    }

    // horizon glow
    const hg = ctx.createLinearGradient(0, horizon, W, horizon);
    hg.addColorStop(0, 'transparent');
    hg.addColorStop(0.25, 'rgba(201,168,76,0.5)');
    hg.addColorStop(0.5, 'rgba(0,229,255,0.7)');
    hg.addColorStop(0.75, 'rgba(201,168,76,0.5)');
    hg.addColorStop(1, 'transparent');
    ctx.strokeStyle = hg;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(W, horizon);
    ctx.stroke();

    // subtle vertical glow beam at center
    const vg = ctx.createLinearGradient(W/2, horizon, W/2, 0);
    vg.addColorStop(0, 'rgba(0,229,255,0.12)');
    vg.addColorStop(1, 'transparent');
    ctx.fillStyle = vg;
    ctx.fillRect(W/2 - 1, 0, 2, horizon);
  }

  resize();
  window.addEventListener('resize', resize);
})();

/* ── CURSOR ─────────────────────────────────────────── */
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
(function loop(){
  cur.style.left = mx+'px';
  cur.style.top  = my+'px';
  rx += (mx-rx)*0.12;
  ry += (my-ry)*0.12;
  ring.style.left = rx+'px';
  ring.style.top  = ry+'px';
  requestAnimationFrame(loop);
})();

/* ── NAV SHRINK ─────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── REVEAL ─────────────────────────────────────────── */
const revEls = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if(e.isIntersecting){
      e.target.style.transitionDelay = (i % 5) * 0.09 + 's';
      e.target.classList.add('visible');
      e.target.querySelectorAll('.bar').forEach(b => {
        b.style.width = b.dataset.width + '%';
      });
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revEls.forEach(el => revObs.observe(el));

/* ── GLITCH FLICKER on hero name ────────────────────── */
const hn = document.getElementById('heroName');
setInterval(() => {
  if(Math.random() > 0.82){
    const dx = (Math.random()*6-3).toFixed(1);
    const dx2 = (Math.random()*-6+3).toFixed(1);
    hn.style.textShadow = `${dx}px 0 rgba(0,229,255,.65), ${dx2}px 0 rgba(201,168,76,.65)`;
    setTimeout(() => { hn.style.textShadow = ''; }, 70 + Math.random()*60);
  }
}, 1800);

// Animate progress bars on scroll
  function animateBars() {
    document.querySelectorAll('.sk-card').forEach(card => {
      const bar = card.querySelector('.bar');
      if (bar) {
        const width = bar.getAttribute('data-width');
        bar.style.setProperty('--target-width', width + '%');
      }
    });
  }

  // Trigger when section comes into view
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