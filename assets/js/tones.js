export const PENTATONIC = [0, 2, 4, 7, 9];

export const CHORDS = [
  { root: 0, pad: [0, 7, 14, 16] },
  { root: -7, pad: [0, 7, 9, 16] },
  { root: -3, pad: [4, 9, 14, 19] },
  { root: -5, pad: [2, 9, 14, 21] },
  { root: 2, pad: [2, 5, 9, 12] },
];

export const TONES = {
  tuning: 432,
  base: 432 * 2 ** (-7 / 12),
  octaves: 2,
  from: 1980,
  to: 2030,
  master: 0.7,
  soften: 2200,
  floor: 30,
  fade: 9,
  chordFrom: 24,
  chordTo: 38,
  detune: 4,
  padCut: 760,
  padSwing: 220,
  padLevel: 0.0052,
  shimmerLevel: 0.0007,
  subLevel: 0.007,
  airLevel: 0.012,
  airCut: 520,
  room: 1,
  reach: 0.03,
  bed: { pad: [0.35, 0.8], shimmer: [0.1, 1], air: [0.2, 0.9], sub: [1, 0] },
  note: [0.8, 1],
  hover: [0.15, 1],
  swell: [0.3, 1],
  travel: [0.15, 1],
  tick: 432,
  tickGap: 1.4,
  tickPeak: 0.01,
  noteGap: 0.3,
  swellPeak: 0.022,
  travelPeak: 0.015,
  arrival: 0.4,
  voices: 4,
  crowd: 0.5,
  fadeIn: 3.5,
  fadeOut: 0.7,
  suspendAfter: 4000,
  interval: 2000,
  horizon: 4,
  breath: { period: 11, inhale: 0.4, pad: 0.25, air: 0.3, harmonics: 12 },
  pink: { level: 0.0108, low: 110, high: 1500 },
};

export const PROFILES = {
  now: { breath: false, pink: false, chordTick: false, change: 3, reverb: 5 },
  next: { breath: true, pink: true, chordTick: true, change: 5, reverb: 5 },
};

const D3 = -19;
const D1 = -43;

export const hz = (semitones) => TONES.tuning * 2 ** (semitones / 12);

const clamp01 = (value) => Math.min(1, Math.max(0, value));

export function noteOf(year) {
  const steps = PENTATONIC.length * TONES.octaves;
  const index = Math.min(steps - 1, Math.floor(clamp01((year - TONES.from) / (TONES.to - TONES.from)) * steps));
  const degree = PENTATONIC[index % PENTATONIC.length] + 12 * Math.floor(index / PENTATONIC.length);
  return TONES.base * 2 ** (degree / 12);
}

export const lengthOf = (weight) => ({ 1: 3, 2: 4.5, 3: 6 })[weight] ?? 3;

export const peakOf = (weight) => 0.024 + 0.007 * Math.min(3, Math.max(1, weight));

export const swellOf = (kind) => (kind === "clone" ? hz(D3) : hz(D3 - 7));

export const crowdOf = (active) => 1 / (1 + TONES.crowd * active);

export const tickDue = (now, last, gap = TONES.tickGap) => now - last >= gap;

export function chordOf(index) {
  const { root, pad } = CHORDS[index % CHORDS.length];
  return {
    sub: hz(D1 + ((root % 12) + 12) % 12),
    pad: pad.map((step) => hz(D3 + step)),
    shimmer: pad.slice(2).map((step) => hz(D3 + step + 12)),
  };
}

export function chordAfter(index, roll) {
  const others = CHORDS.map((_, k) => k).filter((k) => k !== index);
  return others[Math.min(others.length - 1, Math.floor(clamp01(roll) * others.length))];
}

export const chordOfAge = (age) => (age < 0 ? 0 : age % CHORDS.length);

export const nextChord = (hold, index, roll) => (hold === null ? chordAfter(index, roll) : chordOfAge(hold));

export const spanOf = (roll) => TONES.chordFrom + clamp01(roll) * (TONES.chordTo - TONES.chordFrom);

export function seeded(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = Math.imul(state ^ (state >>> 15), state | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function noiseOf(length, seed) {
  const random = seeded(seed);
  const data = new Float32Array(length);
  let level = 0;
  let peak = 0;
  for (let i = 0; i < length; i++) {
    level = (level + 0.04 * (random() * 2 - 1)) / 1.04;
    data[i] = level;
    peak = Math.max(peak, Math.abs(level));
  }
  for (let i = 0; i < length; i++) data[i] /= peak;
  return data;
}

export function pinkOf(length, seed) {
  const random = seeded(seed);
  const data = new Float32Array(length);
  let [b0, b1, b2] = [0, 0, 0];
  let peak = 0;
  for (let i = 0; i < length; i++) {
    const white = random() * 2 - 1;
    b0 = 0.99765 * b0 + white * 0.099046;
    b1 = 0.963 * b1 + white * 0.2965164;
    b2 = 0.57 * b2 + white * 1.0526913;
    data[i] = b0 + b1 + b2 + white * 0.1848;
    peak = Math.max(peak, Math.abs(data[i]));
  }
  for (let i = 0; i < length; i++) data[i] /= peak;
  return data;
}

export function breathOf(phase, inhale = TONES.breath.inhale) {
  const at = phase - Math.floor(phase);
  return at < inhale ? -Math.cos((Math.PI * at) / inhale) : Math.cos((Math.PI * (at - inhale)) / (1 - inhale));
}

export function breathWave(inhale = TONES.breath.inhale, harmonics = TONES.breath.harmonics, steps = 2048) {
  const real = new Float32Array(harmonics + 1);
  const imag = new Float32Array(harmonics + 1);
  for (let i = 0; i < steps; i++) {
    const phase = i / steps;
    const value = breathOf(phase, inhale);
    for (let k = 1; k <= harmonics; k++) {
      real[k] += (2 * value * Math.cos(2 * Math.PI * k * phase)) / steps;
      imag[k] += (2 * value * Math.sin(2 * Math.PI * k * phase)) / steps;
    }
  }
  return { real, imag };
}

export function tickOf(index) {
  const near = (frequency) => Math.abs(Math.log2(frequency / TONES.tick));
  const fold = (frequency) => frequency * 2 ** Math.round(Math.log2(TONES.tick / frequency));
  return CHORDS[index % CHORDS.length].pad.map((step) => fold(hz(D3 + step))).reduce((best, frequency) => (near(frequency) < near(best) - 1e-9 ? frequency : best));
}

export function impulseOf(rate, seed = 1, seconds = PROFILES.next.reverb) {
  const length = Math.floor(rate * seconds * 1.1);
  return [0, 1].map((channel) => {
    const random = seeded(seed + channel * 7919);
    const data = new Float32Array(length);
    let low = 0;
    for (let i = 0; i < length; i++) {
      const time = i / rate;
      const onset = clamp01((time - TONES.reach) / 0.05);
      const decay = Math.exp((-6.9078 * time) / seconds);
      const tail = clamp01((length - i) / (rate * 0.4));
      const cutoff = 3200 * (600 / 3200) ** clamp01(time / seconds);
      low += (1 - Math.exp((-2 * Math.PI * cutoff) / rate)) * (random() * 2 - 1 - low);
      data[i] = low * onset * decay * tail;
    }
    return data;
  });
}
