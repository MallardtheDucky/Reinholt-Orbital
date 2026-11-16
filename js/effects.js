const SLOTS = {
  'hero-sky':['Satellite trails across the night sky'],
  'link':['A remote home connected by satellite internet'],'aero':['Passenger aircraft in flight'],'maritime':['Container ship at sea'],
  'launch':['Reusable rocket lifting off'],'gov':['Emergency response team in the field'],'factory':['Satellite assembly clean room'],
  'earth-night':['City lights of Earth seen from orbit'],'denver':['Denver skyline with the Rocky Mountains'],
  'antenna':['Satellite ground station antennas'],'satellite-stack':['Stacked satellites before launch'],'booster-landing':['Rocket booster landing'],'terminal-install':['Home satellite terminal installation'],'ops-center':['Network operations center'],'scholars':['University scholarship students'],'classroom':['Students using a connected classroom']
};
document.querySelectorAll('figure.photo').forEach(f => {
  const s = SLOTS[f.dataset.slot] || [''], img = new Image();
  img.alt = s[0]; img.loading = 'lazy'; img.src = 'assets/images/' + f.dataset.slot + '.jpg';
  img.onerror = () => { img.remove(); f.classList.add('empty'); };
  f.prepend(img);
  if (f.dataset.cap) { const c = document.createElement('figcaption'); c.textContent = f.dataset.cap; f.appendChild(c); }
  f.addEventListener('pointermove', e => { const b = f.getBoundingClientRect(); f.style.setProperty('--rx', ((e.clientY - b.top) / b.height - .5) * -4 + 'deg'); f.style.setProperty('--ry', ((e.clientX - b.left) / b.width - .5) * 6 + 'deg'); });
  f.addEventListener('pointerleave', () => { f.style.setProperty('--rx', '0deg'); f.style.setProperty('--ry', '0deg'); });
});
document.querySelectorAll('.hero-band, .stars-host').forEach(h => {
  const c = document.createElement('canvas'); c.className = 'stars'; h.prepend(c);
  const x = c.getContext('2d'); let w, hh, st = [];
  const fit = () => { w = c.width = h.clientWidth || 1000; hh = c.height = h.clientHeight || 400; st = Array.from({length: Math.round(w * hh / 5000)}, () => [Math.random() * w, Math.random() * hh, Math.random() * 1.2 + .2, Math.random() * .6 + .1]); };
  fit(); addEventListener('resize', fit);
  (function f(t) { requestAnimationFrame(f); if (!h.offsetParent) return; x.clearRect(0, 0, w, hh);
    st.forEach(s => { x.globalAlpha = s[3] * (.6 + .4 * Math.sin(t / 900 + s[0])); x.fillStyle = '#fff'; x.fillRect(s[0], s[1], s[2], s[2]); });
    const p = (t / 6000) % 1.4 - .2; x.globalAlpha = .8; x.fillStyle = '#8ecbff'; x.fillRect(p * w, hh * .2 + p * hh * .25, 2, 2); x.globalAlpha = .2; x.fillRect(p * w - 40, hh * .2 + p * hh * .25 - 10, 40, 1); })(0);
});
const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; io.unobserve(e.target); const el = e.target;
  if (el.dataset.count) { const n = +el.dataset.count, t0 = performance.now(); (function s(t) { const k = Math.min((t - t0) / 1800, 1), v = Math.round(n * (1 - Math.pow(1 - k, 4))); el.textContent = (el.dataset.prefix || '') + v.toLocaleString() + (el.dataset.suffix || ''); if (k < 1) requestAnimationFrame(s); })(t0); }
  if (el.dataset.w) el.style.width = el.dataset.w + '%'; }), { threshold: .3 });
document.querySelectorAll('[data-count],[data-w]').forEach(e => io.observe(e));
const tgt = Date.now() + (3 * 864e5 + 4 * 36e5);
setInterval(() => { let s = Math.max(0, (tgt - Date.now()) / 1000 | 0); const p = n => String(n).padStart(2, '0');
  document.querySelectorAll('.cd').forEach(cd => cd.textContent = 'T-' + p(s / 86400 | 0) + ':' + p(s % 86400 / 3600 | 0) + ':' + p(s % 3600 / 60 | 0) + ':' + p(s % 60)); }, 1000);
const par = () => document.querySelectorAll('.page-section.active .parallax').forEach(p => { const r = p.parentElement.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return; p.style.transform = 'translateY(' + ((r.top + r.height / 2 - innerHeight / 2) * -.08) + 'px) scale(1.12)'; });
addEventListener('scroll', par, { passive: true }); addEventListener('resize', par); par();

const nav = document.getElementById('navbar'); let ly = 0;
addEventListener('scroll', () => { const y = scrollY; nav.style.transform = (y > ly && y > 120) ? 'translateY(-110%)' : 'translateY(0)'; ly = y; }, { passive: true });
