/**
 * NetflixAudio: Synthesizes high-end Netflix-style sound effects
 * using standard Web Audio API (zero external assets, 100% reliable).
 */

class NetflixAudioManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.initialized = false;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.initialized = true;
      }
    } catch {
      // AudioContext not permitted or supported
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  playTaDum() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;

    // 1. Deep Sub-Bass Boom (D2 to D1)
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(80, t);
    subOsc.frequency.exponentialRampToValueAtTime(32, t + 1.2);

    subGain.gain.setValueAtTime(0.001, t);
    subGain.gain.linearRampToValueAtTime(0.5, t + 0.08);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 1.6);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(t);
    subOsc.stop(t + 1.7);

    // 2. Punchy Mid "Ta" Hit
    const punchOsc = this.ctx.createOscillator();
    const punchGain = this.ctx.createGain();
    punchOsc.type = "triangle";
    punchOsc.frequency.setValueAtTime(140, t);
    punchOsc.frequency.exponentialRampToValueAtTime(45, t + 0.35);

    punchGain.gain.setValueAtTime(0.4, t);
    punchGain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    punchOsc.connect(punchGain);
    punchGain.connect(this.ctx.destination);
    punchOsc.start(t);
    punchOsc.stop(t + 0.45);

    // 3. Shimmer Harmonic "Dum" swell (D minor / cinematic shimmer)
    const freqs = [146.83, 220.0, 293.66, 440.0, 587.33];
    freqs.forEach((freq, idx) => {
      const chordOsc = this.ctx.createOscillator();
      const chordGain = this.ctx.createGain();

      chordOsc.type = idx % 2 === 0 ? "sawtooth" : "sine";
      chordOsc.frequency.setValueAtTime(freq, t + 0.05);

      // Lowpass filter to soften the sawtooth
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1200, t);

      const delay = 0.06;
      chordGain.gain.setValueAtTime(0.0001, t + delay);
      chordGain.gain.linearRampToValueAtTime(0.08 / (idx + 1), t + delay + 0.15);
      chordGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);

      chordOsc.connect(filter);
      filter.connect(chordGain);
      chordGain.connect(this.ctx.destination);

      chordOsc.start(t + delay);
      chordOsc.stop(t + 1.9);
    });
  }

  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.04);
    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.05);
  }

  playHover() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(420, t);
    gain.gain.setValueAtTime(0.015, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.035);
  }
}

export const netflixAudio = new NetflixAudioManager();
