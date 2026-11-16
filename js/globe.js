function initGlobe() {
    const wrap = document.getElementById('globe-wrap');
    if (!wrap || !window.LAND_DOTS || wrap.dataset.ready) return;
    wrap.dataset.ready = '1';
    const R = 5, d2r = Math.PI / 180;
    const ll = (lat, lon, r) => new THREE.Vector3(r * Math.cos(lat * d2r) * Math.sin(lon * d2r), r * Math.sin(lat * d2r), r * Math.cos(lat * d2r) * Math.cos(lon * d2r));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    wrap.appendChild(renderer.domElement);
    const globe = new THREE.Group(); scene.add(globe);
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.995, 64, 64), new THREE.MeshBasicMaterial({ color: 0x03070d })));
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.07, 64, 64), new THREE.MeshBasicMaterial({ color: 0x8ecbff, transparent: true, opacity: 0.06, side: THREE.BackSide })));
    const d = window.LAND_DOTS, land = [];
    for (let i = 0; i < d.length; i += 2) { const v = ll(d[i], d[i + 1], R); land.push(v.x, v.y, v.z); }
    const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.Float32BufferAttribute(land, 3));
    globe.add(new THREE.Points(lg, new THREE.PointsMaterial({ color: 0xd5deea, size: 0.05, transparent: true, opacity: 0.9 })));

    const stations = [
        ['Denver, USA', 'Global HQ', 39.74, -104.99, 1], ['Cape Canaveral, USA', 'Launch site', 28.4, -80.6], ['Frankfurt, Germany', 'EMEA HQ', 50.1, 8.7],
        ['Singapore', 'Asia-Pacific HQ', 1.35, 103.8], ['Tromsø, Norway', 'Arctic gateway', 69.65, 18.96], ['Perth, Australia', 'Gateway', -31.95, 115.86],
        ['Santiago, Chile', 'Gateway', -33.45, -70.67], ['Johannesburg, S. Africa', 'Africa HQ', -26.2, 28.04], ['Dubai, UAE', 'Regional office', 25.2, 55.27],
        ['Tokyo, Japan', 'Gateway', 35.68, 139.7], ['São Paulo, Brazil', 'Operations', -23.55, -46.63], ['Kourou, Fr. Guiana', 'Launch site', 5.2, -52.7],
        ['Mahia, New Zealand', 'Launch site', -39.1, 177.9], ['Reykjavik, Iceland', 'Gateway', 64.15, -21.9]
    ];
    const pins = new THREE.Group(), rings = []; globe.add(pins);
    stations.forEach(s => {
        const p = ll(s[2], s[3], R * 1.003);
        const m = new THREE.Mesh(new THREE.SphereGeometry(s[4] ? 0.11 : 0.065, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff })); m.position.copy(p); pins.add(m);
        const r = new THREE.Mesh(new THREE.RingGeometry(0.1, 0.125, 32), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, side: THREE.DoubleSide }));
        r.position.copy(p); r.lookAt(p.clone().multiplyScalar(2)); r.userData.o = Math.random() * 6; globe.add(r); rings.push(r);
    });
    const sats = [];
    [[1.14, 53, 70, 8], [1.17, 70, 50, 6], [1.2, 97.6, 40, 5]].forEach(([a, inc, per, planes]) => {
        const g = new THREE.Group(), pos = [];
        for (let p = 0; p < planes; p++) for (let k = 0; k < per; k++) {
            const t = k / per * Math.PI * 2, raan = p / planes * Math.PI * 2;
            const v = new THREE.Vector3(Math.cos(t), 0, Math.sin(t)).multiplyScalar(R * a);
            v.applyAxisAngle(new THREE.Vector3(1, 0, 0), inc * d2r).applyAxisAngle(new THREE.Vector3(0, 1, 0), raan); pos.push(v.x, v.y, v.z);
        }
        const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        g.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x8ecbff, size: 0.07, transparent: true, opacity: 0.95 })));
        globe.add(g); sats.push([g, 0.0014 + Math.random() * 0.0012]);
    });

    const label = document.getElementById('globe-label'), btns = document.getElementById('globe-buttons');
    let drag = false, lx = 0, ly = 0, spin = 0.0016, target = null;
    const setLabel = i => { if (label) label.textContent = stations[i][0] + ': ' + stations[i][1]; };
    function flyTo(i) {
        const p = pins.children[i].position.clone().normalize();
        target = new THREE.Quaternion().setFromUnitVectors(p, new THREE.Vector3(0, 0, 1)); setLabel(i);
        btns && [...btns.children].forEach((b, j) => b.classList.toggle('on', j === i));
    }
    if (btns) stations.forEach((s, i) => { const b = document.createElement('button'); b.textContent = s[0].split(',')[0]; b.onclick = () => flyTo(i); btns.appendChild(b); });
    globe.quaternion.setFromEuler(new THREE.Euler(0.45, -1.8, 0));

    const axX = new THREE.Vector3(1, 0, 0), axY = new THREE.Vector3(0, 1, 0), q = new THREE.Quaternion();
    wrap.addEventListener('pointerdown', e => { drag = true; target = null; lx = e.clientX; ly = e.clientY; wrap.setPointerCapture(e.pointerId); });
    wrap.addEventListener('pointerup', () => drag = false);
    wrap.addEventListener('pointermove', e => {
        if (!drag) return;
        const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY;
        globe.quaternion.premultiply(q.setFromAxisAngle(axY, dx * 0.0065)).premultiply(q.setFromAxisAngle(axX, dy * 0.0065));
    });
    function size() {
        const w = wrap.clientWidth, h = wrap.clientHeight; if (!w) return;
        renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
        const fit = R * 1.3, vf = camera.fov * d2r / 2;
        camera.position.z = Math.max(fit / Math.sin(vf), fit / (Math.sin(Math.atan(Math.tan(vf) * camera.aspect))));
    }
    addEventListener('resize', size); size();
    (function tick(t) {
        requestAnimationFrame(tick);
        if (target) { globe.quaternion.slerp(target, 0.06); if (globe.quaternion.angleTo(target) < 0.002) target = null; }
        else if (!drag) globe.quaternion.premultiply(q.setFromAxisAngle(axY, spin));
        rings.forEach(r => { const s = 1 + ((t * 0.001 + r.userData.o) % 2) * 1.2; r.scale.set(s, s, s); r.material.opacity = Math.max(0, 0.6 - (s - 1) * 0.3); });
        sats.forEach(([g, sp]) => g.rotateY(sp));
        renderer.render(scene, camera);
    })(0);
}
