(function () {
  if (!window.Chart) return;
  const F = "'Space Grotesk',monospace", W = '#ffffff', B = '#8ecbff', G = '#9ca3af';
  Chart.defaults.color = G; Chart.defaults.font.family = F; Chart.defaults.font.size = 11;
  Chart.defaults.borderColor = 'rgba(255,255,255,.06)'; Chart.defaults.maintainAspectRatio = false;
  Chart.defaults.plugins.legend.labels.usePointStyle = true; Chart.defaults.plugins.legend.labels.boxWidth = 8;
  Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0,0,0,.92)'; Chart.defaults.plugins.tooltip.borderColor = 'rgba(255,255,255,.2)';
  Chart.defaults.plugins.tooltip.borderWidth = 1; Chart.defaults.plugins.tooltip.padding = 12; Chart.defaults.animation.duration = 1800; Chart.defaults.animation.easing = 'easeOutQuart';
  const grad = (c, a = .45) => { const g = c.getContext('2d').createLinearGradient(0, 0, 0, c.height || 300); g.addColorStop(0, 'rgba(142,203,255,' + a + ')'); g.addColorStop(1, 'rgba(142,203,255,0)'); return g; };
  const PAL = ['#ffffff', '#8ecbff', '#4a8fd1', '#2c5a8a', '#9ca3af', '#4b5563'];
  const yrs = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const noGrid = { grid: { display: false } };
  const donut = (labels, data) => ({ type: 'doughnut', data: { labels, datasets: [{ data, backgroundColor: PAL, borderColor: '#020202', borderWidth: 3, hoverOffset: 14 }] }, options: { cutout: '68%', plugins: { legend: { position: 'right' } }, animation: { animateRotate: true, duration: 2000 } } });
  const C = {
    subs: c => ({ type: 'line', data: { labels: yrs(2018, 2026), datasets: [{ label: 'Subscribers (millions)', data: [1, 2.1, 3.4, 5, 7.1, 9.2, 11, 12.8, 14.2], borderColor: B, backgroundColor: grad(c), fill: true, tension: .4, pointRadius: 4, pointBackgroundColor: W, borderWidth: 2.5 }] }, options: { plugins: { legend: { display: false } }, scales: { x: noGrid } } }),
    sats: c => ({ type: 'bar', data: { labels: yrs(2018, 2026), datasets: [{ label: 'Satellites launched', data: [120, 480, 780, 1100, 1500, 1900, 2200, 2300, 1100], backgroundColor: ctx => ctx.dataIndex === 8 ? 'rgba(142,203,255,.45)' : B, borderRadius: 4 }] }, options: { plugins: { legend: { display: false } }, scales: { x: noGrid } } }),
    rev: c => ({ type: 'bar', data: { labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026E'], datasets: [{ label: 'Reinholt Link', data: [3.1, 4.8, 6.7, 9.2, 11.5, 13.3, 14.8], backgroundColor: B, borderRadius: 3 }, { label: 'All other divisions', data: [3, 4.6, 6.5, 8.8, 11, 12.8, 14.2], backgroundColor: W, borderRadius: 3 }] }, options: { scales: { x: { stacked: true, ...noGrid }, y: { stacked: true, title: { display: true, text: 'Revenue, $ billions' } } } } }),
    mix: c => donut(['Link', 'Public Sector', 'Aero', 'Launch', 'Maritime', 'Manufacturing'], [14.8, 4.2, 3.1, 2.9, 2.4, 1.6]),
    region: c => donut(['North America', 'Europe', 'Asia-Pacific', 'Latin America', 'Africa', 'Middle East'], [38, 22, 18, 9, 7, 6]),
    cost: c => ({ type: 'line', data: { labels: [2011, 2014, 2017, 2020, 2023, 2026], datasets: [{ label: 'Cost to LEO, $ per kg', data: [9800, 7200, 4100, 2300, 1500, 980], borderColor: W, backgroundColor: grad(c, .3), fill: true, tension: .35, pointRadius: 5, pointBackgroundColor: B, borderWidth: 2.5 }] }, options: { plugins: { legend: { display: false } }, scales: { x: noGrid } } }),
    launches: c => ({ type: 'line', data: { labels: yrs(2016, 2026), datasets: [{ label: 'Cumulative launches', data: [8, 15, 26, 42, 62, 86, 112, 142, 171, 197, 213], borderColor: B, backgroundColor: grad(c), fill: true, stepped: true, borderWidth: 2.5, pointRadius: 0 }] }, options: { plugins: { legend: { display: false } }, scales: { x: noGrid } } }),
    reuse: c => ({ type: 'bar', data: { labels: ['1 flight', '2–5', '6–10', '11–20', '21–31'], datasets: [{ label: 'Boosters', data: [18, 41, 33, 22, 9], backgroundColor: [PAL[5], PAL[4], PAL[2], PAL[1], PAL[0]], borderRadius: 4 }] }, options: { plugins: { legend: { display: false } }, scales: { x: noGrid } } }),
    speed: c => ({ type: 'bar', data: { labels: ['North America', 'Europe', 'Asia-Pacific', 'Latin America', 'Africa', 'Middle East'], datasets: [{ label: 'Median download, Mbps', data: [214, 198, 176, 142, 118, 161], backgroundColor: B, borderRadius: 4 }] }, options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { y: noGrid } } }),
    give: c => ({ type: 'bar', data: { labels: yrs(2019, 2025), datasets: [{ label: 'Education', data: [36, 44, 60, 76, 96, 120, 144], backgroundColor: W }, { label: 'Health', data: [32, 38, 52, 66, 84, 105, 126], backgroundColor: B }, { label: 'Science', data: [22, 28, 38, 48, 60, 75, 90], backgroundColor: PAL[3] }] }, options: { scales: { x: { stacked: true, ...noGrid }, y: { stacked: true, title: { display: true, text: 'Grants, $ millions' } } } } }),
    prog: c => donut(['Reinholt Scholars', 'Health Access', 'Connected Classrooms', 'Science Programs'], [34, 28, 24, 14]),
    gauge: c => ({ type: 'doughnut', data: { datasets: [{ data: [62, 38], backgroundColor: [B, 'rgba(255,255,255,.07)'], borderWidth: 0, borderRadius: 6 }] }, options: { rotation: -90, circumference: 180, cutout: '82%', plugins: { legend: { display: false }, tooltip: { enabled: false } }, animation: { duration: 2200 } } }),
    live: c => {
      const n = 60, base = i => 540 + 60 * Math.sin(i / 9), d = Array.from({ length: n }, (_, i) => base(i) + Math.random() * 14);
      const ch = new Chart(c, { type: 'line', data: { labels: d.map(() => ''), datasets: [{ data: d, borderColor: B, backgroundColor: grad(c, .4), fill: true, tension: .4, pointRadius: 0, borderWidth: 2 }] }, options: { animation: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { min: 400, max: 700, ticks: { callback: v => v + ' Tbps' } } } } });
      let i = n; const out = document.getElementById('live-val');
      setInterval(() => { const v = base(i++) + Math.random() * 14; d.push(v); d.shift(); ch.update('none'); if (out) out.textContent = v.toFixed(1); }, 900);
      return null;
    }
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    const k = e.target.dataset.chart, cfg = C[k] && C[k](e.target); if (cfg) new Chart(e.target, cfg);
  }), { threshold: .25 });
  document.querySelectorAll('canvas[data-chart]').forEach(c => io.observe(c));
  const cnt = [['pb', 1.0, 4200], ['sess', 1, 9400000]];
  const pb = document.getElementById('pb-val'), ss = document.getElementById('sess-val'); let p = 612.4, s = 9412000;
  setInterval(() => { p += 0.31 + Math.random() * .1; s += Math.round((Math.random() - .45) * 900); if (pb) pb.textContent = p.toFixed(1); if (ss) ss.textContent = s.toLocaleString(); }, 800);
})();
