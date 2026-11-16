(function () {
  const sec = (k, t, s, body) => `<section class="extra-sec py-24 px-6 md:px-16 lg:px-24 bg-[#020202] border-t border-gray-900 relative z-10"><div class="max-w-7xl mx-auto"><div class="max-w-3xl mb-14 fade-in-up"><h3 class="text-xs uppercase tracking-[0.3em] font-mono text-gray-500 mb-4">${k}</h3><h2 class="text-3xl md:text-5xl font-sans font-light text-white leading-tight mb-4">${t}</h2><p class="text-gray-400 font-light leading-relaxed">${s}</p></div>${body}</div></section>`;
  const add = (id, html) => document.getElementById('page-' + id).insertAdjacentHTML('beforeend', html);

  const tk = ['14.2M subscribers', '9,100+ satellites in orbit', '160+ countries', '5,600 aircraft online', '31,000 vessels at sea', '213 launches', '99.97% uptime', '41,000 schools connected'];
  const home = document.getElementById('page-home'), first = home.querySelector(':scope > section, :scope > div');
  const ticker = `<div class="ticker"><div class="tk-in">${[...tk, ...tk].map(t => `<span>${t}</span>`).join('')}</div></div>`;
  first ? first.insertAdjacentHTML('afterend', ticker) : home.insertAdjacentHTML('afterbegin', ticker);

  const st = [['link', 'A school with no road, now with a classroom full of laptops.', 'Reinholt Link Community', 'Principal, highland primary school'], ['maritime', 'Our crews call home every week. Retention has never been better.', 'Reinholt Maritime', 'Fleet director, container line'], ['classroom', 'Students run live experiments with partners on another continent.', 'Reinholt Scholars', 'Professor of engineering, Colorado']];
  add('home', sec('Stories', 'Connection, <span class="font-medium">in their words.</span>', 'What the network looks like from the other end of the link.',
    `<div class="grid md:grid-cols-3 gap-4">${st.map(s => `<div class="data-panel fade-in-up story"><figure class="photo h-56" data-slot="${s[0]}" data-cap="${s[2]}"></figure><div class="p-8"><p class="text-lg font-light text-white leading-relaxed mb-6">&ldquo;${s[1]}&rdquo;</p><p class="font-mono text-[0.65rem] uppercase tracking-widest text-sky-300">${s[3]}</p></div></div>`).join('')}</div>`));

  const sel = { Home: ['Reinholt Link', '28 ms', '350 Mbps', '15 min'], Airline: ['Reinholt Aero', '25 Mbps', '8 hrs', '48 carriers'], Shipping: ['Reinholt Maritime', 'All oceans', '31,000+', '9 of 10'], Government: ['Reinholt Public Sector', '1 hour', 'Encrypted', 'Global'] };
  const lab = { Home: ['Latency', 'Download', 'Setup'], Airline: ['Per passenger', 'Install time', 'Partners'], Shipping: ['Coverage', 'Vessels', 'Top lines served'], Government: ['Kit deployment', 'Service', 'Reach'] };
  add('divisions', sec('Find Your Fit', 'Who are you <span class="font-medium">connecting?</span>', 'Choose a customer type to see the Reinholt service built for it.',
    `<div class="flex flex-wrap gap-2 mb-8 fade-in-up" id="fit-tabs">${Object.keys(sel).map((k, i) => `<button class="fit-btn ${i ? '' : 'on'}" data-k="${k}">${k}</button>`).join('')}</div><div class="data-panel p-10 fade-in-up" id="fit-panel"></div>`));
  const fp = document.getElementById('fit-panel');
  const showFit = k => { const s = sel[k], l = lab[k]; fp.innerHTML = `<h4 class="text-3xl font-light text-white mb-8">${s[0]}</h4><div class="grid sm:grid-cols-3 gap-8">${l.map((x, i) => `<div><p class="text-3xl font-mono font-light text-white">${s[i + 1]}</p><p class="font-mono text-[0.6rem] uppercase tracking-widest text-gray-500 mt-2">${x}</p></div>`).join('')}</div>`; document.querySelectorAll('.fit-btn').forEach(b => b.classList.toggle('on', b.dataset.k === k)); };
  document.getElementById('fit-tabs').addEventListener('click', e => e.target.dataset.k && showFit(e.target.dataset.k)); showFit('Home');

  const reg = [['North America', 99], ['Europe', 98], ['Oceania', 97], ['South America', 94], ['Asia-Pacific', 91], ['Africa', 86], ['Polar routes', 100]];
  add('network', sec('Coverage', 'Population within reach, <span class="font-medium">by region.</span>', 'Share of each region where a Reinholt Link terminal can connect today.',
    `<div class="grid md:grid-cols-2 gap-x-16">${reg.map(r => `<div class="mb-5 fade-in-up"><div class="flex justify-between font-mono text-[0.65rem] uppercase tracking-widest mb-2"><span class="text-white">${r[0]}</span><span class="text-sky-300">${r[1]}%</span></div><div class="xbar"><i data-w="${r[1]}" class="hi"></i></div></div>`).join('')}</div>`));

  const faq = [['How long does a satellite stay in orbit?', 'Each Gen 3 satellite is designed for seven years of service, followed by a controlled deorbit within five years.'], ['Does weather affect the signal?', 'Terminals are rated IP67 and heat themselves to melt snow. Heavy rain can briefly reduce speeds, and the network reroutes around it.'], ['Can the rocket really fly again?', 'Yes. Our record booster has flown 31 times, and the typical turnaround is ten days.'], ['Are your orbits shared with researchers?', 'Reinholt publishes orbital data and shares tracking information with space agencies worldwide.'], ['What happens if a satellite fails?', 'Traffic moves across the laser mesh automatically, and the satellite is steered out of orbit.']];
  add('technology', sec('Questions', 'The engineering, <span class="font-medium">explained.</span>', 'Straight answers to what people ask most.',
    `<div class="max-w-3xl">${faq.map(f => `<details class="faq fade-in-up"><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('')}</div>`));

  const aw = [['2025', 'Aerospace Excellence Award', 'Reusable launch operations'], ['2024', 'Connectivity Leader of the Year', 'Global broadband access'], ['2023', 'Responsible Space Recognition', 'Orbital sustainability'], ['2022', 'Engineering Innovation Prize', 'Flat-panel terminal design']];
  add('leadership', sec('Recognition', 'Honoured for the <span class="font-medium">work.</span>', 'Industry bodies and partners have recognised Reinholt Orbital for engineering, access and stewardship.',
    `<div class="grid md:grid-cols-4 gap-4">${aw.map(a => `<div class="data-panel p-8 fade-in-up"><p class="font-mono text-2xl text-sky-300 mb-6">${a[0]}</p><h4 class="text-lg font-light text-white mb-2">${a[1]}</h4><p class="text-sm text-gray-500 font-light">${a[2]}</p></div>`).join('')}</div><div class="data-panel p-10 mt-4 fade-in-up flex flex-col md:flex-row md:items-center md:justify-between gap-6"><div><h4 class="text-2xl font-light text-white mb-2">Press &amp; Media</h4><p class="text-gray-400 font-light">Interview requests, launch credentials and image libraries.</p></div><p class="font-mono text-sky-300">press@reinholtorbital.com</p></div>`));

})();
