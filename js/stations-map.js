(function () {
  const S = [
    ['Denver, USA',39.74,-104.99,'hq','Global Headquarters & Network Operations',2003,24,3800,'1.2 Tbps','Runs the 24/7 network operations center that watches every satellite, gateway and terminal, and houses mission control for all launches.'],
    ['Cape Canaveral, USA',28.4,-80.6,'launch','Primary Launch Site & Booster Recovery',2011,8,1150,'Launch Complex 3','Home of the Aster-3 pad, the booster landing zone and the payload integration hall. Fastest booster turnaround: 9 days.'],
    ['Kourou, French Guiana',5.2,-52.7,'launch','Equatorial Launch Site',2020,6,260,'Launch Pad 2','Near-equator launches get a free boost from Earth’s rotation, ideal for heavier payloads and Shell A deployment.'],
    ['Mahia, New Zealand',-39.1,177.9,'launch','Southern Launch Site',2021,6,180,'Launch Pad 4','Southern Hemisphere pad serving polar and high-inclination missions to Shells B and C.'],
    ['Frankfurt, Germany',50.1,8.7,'office','EMEA Headquarters',2014,0,1400,'800 Gbps peering','Regional headquarters and one of Europe’s largest internet exchange connections. Sales, regulatory affairs and enterprise support.'],
    ['Singapore',1.35,103.8,'office','Asia-Pacific Headquarters',2016,0,1900,'640 Gbps peering','Coordinates service across 30+ markets, with a maritime operations desk watching vessels across the Strait and beyond.'],
    ['Dubai, UAE',25.2,55.27,'office','Middle East Office',2019,0,420,'180 Gbps peering','Serves aviation, energy and government customers across the Gulf, with Arabic and Hindi support teams.'],
    ['Tromsø, Norway',69.65,18.96,'gateway','Arctic Gateway',2013,18,90,'420 Gbps','Polar satellites pass overhead on nearly every orbit, so this station downloads more data per day than any other.'],
    ['Reykjavik, Iceland',64.15,-21.9,'gateway','Renewable-Powered Gateway',2018,12,55,'310 Gbps','Runs entirely on geothermal and hydroelectric power and serves North Atlantic flight and shipping routes.'],
    ['Perth, Australia',-31.95,115.86,'gateway','Indian Ocean Gateway',2015,16,70,'380 Gbps','Links Australia, Southeast Asia and Indian Ocean shipping lanes to the network.'],
    ['Tokyo, Japan',35.68,139.7,'gateway','Japan Gateway & Partner Hub',2016,14,140,'350 Gbps','Operated with local partners to serve Japan’s enterprise, rail and disaster-resilience customers.'],
    ['Johannesburg, South Africa',-26.2,28.04,'gateway','Africa Headquarters & Gateway',2018,12,210,'260 Gbps','Anchors service for sub-Saharan Africa and trains the installers behind Link Community schools.'],
    ['Santiago, Chile',-33.45,-70.67,'gateway','Latin America Gateway',2017,14,85,'300 Gbps','Dry, clear skies and the Andes make it a premier site, serving Patagonia, mining and agricultural customers.'],
    ['São Paulo, Brazil',-23.55,-46.63,'gateway','Brazil Operations',2019,10,380,'240 Gbps','Customer support hub and gateway for the Amazon basin and Brazil’s Atlantic coast.']
  ];
  const svg = document.getElementById('gs-svg'); if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg', COL = { hq: '#ffffff', launch: '#8ecbff', gateway: '#dbe6f3', office: '#7b8794' };
  const el = (n, a, p) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const P = (lat, lon) => [500 + lon * 2.7778, 260 - lat * 2.8889];
  const arcs = document.getElementById('gs-arcs'), pins = document.getElementById('gs-pins'), panel = document.getElementById('gs-panel'), list = document.getElementById('gs-list');
  const pos = S.map(s => P(s[1], s[2])), hq = pos[0], A = [], G = []; let sel = 0, auto = true;
  S.forEach((s, i) => {
    const p = pos[i];
    if (i) {
      const d = 'M' + hq[0] + ' ' + hq[1] + ' Q' + (hq[0] + p[0]) / 2 + ' ' + (Math.min(hq[1], p[1]) - Math.abs(hq[0] - p[0]) * .22) + ' ' + p[0] + ' ' + p[1];
      A[i] = el('path', { d, class: 'gs-arc' }, arcs);
      const m = el('circle', { r: 1.9, fill: '#8ecbff' }, arcs), an = el('animateMotion', { dur: (3 + i * .25) + 's', repeatCount: 'indefinite', begin: (i * .3) + 's', path: d }, m);
    }
    const g = el('g', { class: 'gs-pin', transform: 'translate(' + p[0].toFixed(1) + ',' + p[1].toFixed(1) + ')' }, pins);
    el('circle', { class: 'gs-ping', r: i ? 4 : 6, fill: 'none', stroke: COL[s[3]], style: 'animation-delay:' + (i * .17) + 's' }, g);
    el('circle', { r: i ? 3.6 : 6.5, fill: COL[s[3]] }, g);
    el('circle', { r: 14, fill: 'transparent', style: 'cursor:pointer' }, g);
    const right = p[0] > 800, t = el('text', { class: 'gs-label', x: right ? -11 : 11, y: -9, 'text-anchor': right ? 'end' : 'start' }, g); t.textContent = s[0].split(',')[0];
    g.addEventListener('click', () => { auto = false; show(i); });
    g.addEventListener('mouseenter', () => g.classList.add('hv')); g.addEventListener('mouseleave', () => g.classList.remove('hv'));
    G[i] = g;
  });
  function show(i) {
    sel = i; const s = S[i];
    panel.innerHTML = '<p class="font-mono text-[0.6rem] uppercase tracking-widest text-sky-300 mb-2">' + ({ hq: 'Headquarters', launch: 'Launch Site', gateway: 'Ground Station', office: 'Regional Office' })[s[3]] + '</p><h4 class="text-2xl font-light text-white mb-1">' + s[0] + '</h4><p class="text-sm text-gray-400 mb-5">' + s[4] + '</p>' +
      '<dl class="grid grid-cols-2 gap-x-6 gap-y-4 mb-5"><div class="spec"><dt>Opened</dt><dd>' + s[5] + '</dd></div><div class="spec"><dt>Staff</dt><dd>' + s[7].toLocaleString() + '</dd></div><div class="spec"><dt>Antennas</dt><dd>' + (s[6] || 'n/a') + '</dd></div><div class="spec"><dt>Capacity</dt><dd>' + s[8] + '</dd></div></dl><p class="text-sm text-gray-500 font-light leading-relaxed">' + s[9] + '</p>';
    [...list.children].forEach((b, j) => b.classList.toggle('on', j === i));
    G.forEach((g, j) => g.classList.toggle('on', j === i)); A.forEach((a, j) => a && a.classList.toggle('on', j === i));
  }
  S.forEach((s, i) => { const b = document.createElement('button'); b.textContent = s[0].split(',')[0]; b.onclick = () => { auto = false; show(i); }; list.appendChild(b); });
  show(0); setInterval(() => { if (auto && svg.getBoundingClientRect().width) show((sel + 1) % S.length); }, 5000);

  const tl = document.querySelector('.tl'), fill = document.querySelector('.tl-fill');
  if (tl) { const upd = () => { const r = tl.getBoundingClientRect(), h = Math.max(0, Math.min(r.height, innerHeight * .62 - r.top)); fill.style.height = h + 'px'; tl.querySelectorAll('.tl-item').forEach(it => it.classList.toggle('on', it.offsetTop + 14 < h)); };
    addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); setInterval(upd, 400); }
})();
