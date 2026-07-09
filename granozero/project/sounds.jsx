// sounds.jsx — sistema de sonido sintetizado (Web Audio API)
// Sin assets externos. Sonidos: click, sip (sorbo/burbujeo), grinder, pour, ambient (toggle).

const Sfx = (() => {
  let ctx = null;
  let muted = false;
  let ambientNodes = null;

  const ensure = () => {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  };

  const setMuted = (v) => {
    muted = v;
    if (v && ambientNodes) stopAmbient();
  };
  const isMuted = () => muted;

  // Click táctil: ping corto con band-pass
  const click = (vol = 0.18) => {
    if (muted) return;
    const c = ensure();
    const t = c.currentTime;
    const osc = c.createOscillator();
    const g = c.createGain();
    const bp = c.createBiquadFilter();
    bp.type = "bandpass"; bp.frequency.value = 2400; bp.Q.value = 4;
    osc.type = "triangle"; osc.frequency.setValueAtTime(1800, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.06);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    osc.connect(bp).connect(g).connect(c.destination);
    osc.start(t); osc.stop(t + 0.1);
  };

  // Burbujeo: serie de pings agudos rápidos con pitch ascendente
  const bubble = (vol = 0.16) => {
    if (muted) return;
    const c = ensure();
    const t0 = c.currentTime;
    for (let i = 0; i < 4; i++) {
      const t = t0 + i * 0.04 + Math.random() * 0.02;
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = "sine";
      const base = 600 + Math.random() * 300 + i * 120;
      osc.frequency.setValueAtTime(base, t);
      osc.frequency.exponentialRampToValueAtTime(base * 2.2, t + 0.06);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol * (1 - i * 0.15), t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
      osc.connect(g).connect(c.destination);
      osc.start(t); osc.stop(t + 0.1);
    }
  };

  // Grinder: ruido marrón filtrado con leve sweep
  const grinder = (duration = 1.2, vol = 0.12) => {
    if (muted) return;
    const c = ensure();
    const t = c.currentTime;
    const bufferSize = c.sampleRate * duration;
    const buf = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
    const src = c.createBufferSource();
    src.buffer = buf;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass"; lp.frequency.value = 800; lp.Q.value = 6;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.08);
    g.gain.setValueAtTime(vol, t + duration - 0.15);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    src.connect(lp).connect(g).connect(c.destination);
    src.start(t); src.stop(t + duration);
  };

  // Pour: ruido filtrado modulado para simular vertido
  const pour = (duration = 2.2, vol = 0.14) => {
    if (muted) return;
    const c = ensure();
    const t = c.currentTime;
    const bufferSize = c.sampleRate * duration;
    const buf = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.6;
    const src = c.createBufferSource(); src.buffer = buf;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass"; bp.frequency.value = 1400; bp.Q.value = 1.4;
    const lfo = c.createOscillator(); lfo.type = "sine"; lfo.frequency.value = 3;
    const lfoG = c.createGain(); lfoG.gain.value = 600;
    lfo.connect(lfoG).connect(bp.frequency);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.2);
    g.gain.setValueAtTime(vol, t + duration - 0.4);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    src.connect(bp).connect(g).connect(c.destination);
    src.start(t); src.stop(t + duration);
    lfo.start(t); lfo.stop(t + duration);
  };

  // Ambient: ruido marrón muy suave + tintineos ocasionales (cucharas/tazas)
  const startAmbient = () => {
    if (muted) return;
    if (ambientNodes) return;
    const c = ensure();
    const bufferSize = c.sampleRate * 4;
    const buf = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.012 * white) / 1.012;
      data[i] = last * 3;
    }
    const src = c.createBufferSource(); src.buffer = buf; src.loop = true;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass"; lp.frequency.value = 320;
    const g = c.createGain(); g.gain.value = 0;
    g.gain.linearRampToValueAtTime(0.08, c.currentTime + 1.2);
    src.connect(lp).connect(g).connect(c.destination);
    src.start();

    // tintineos cada 7-15s
    let stopped = false;
    const clink = () => {
      if (stopped || muted) return;
      const t = c.currentTime;
      const osc = c.createOscillator();
      const og = c.createGain();
      osc.type = "sine";
      osc.frequency.value = 2200 + Math.random() * 1800;
      og.gain.setValueAtTime(0.0001, t);
      og.gain.exponentialRampToValueAtTime(0.04, t + 0.005);
      og.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      osc.connect(og).connect(c.destination);
      osc.start(t); osc.stop(t + 0.4);
      setTimeout(clink, 7000 + Math.random() * 9000);
    };
    setTimeout(clink, 3500);

    ambientNodes = { src, g, stop: () => { stopped = true; } };
  };

  const stopAmbient = () => {
    if (!ambientNodes) return;
    const c = ensure();
    const { src, g, stop } = ambientNodes;
    stop();
    g.gain.cancelScheduledValues(c.currentTime);
    g.gain.linearRampToValueAtTime(0, c.currentTime + 0.4);
    setTimeout(() => { try { src.stop(); } catch (e) {} }, 450);
    ambientNodes = null;
  };

  const isAmbientOn = () => !!ambientNodes;

  return { click, bubble, grinder, pour, startAmbient, stopAmbient, isAmbientOn, setMuted, isMuted, ensure };
})();

window.Sfx = Sfx;
