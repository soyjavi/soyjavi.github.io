import { TONES, chordOf, chordOfAge, nextChord, crowdOf, impulseOf, lengthOf, noiseOf, noteOf, peakOf, spanOf, swellOf, tickDue } from "./tones.js";

const BELL = [[1, 1, 1], [2, 0.22, 0.5], [3, 0.08, 0.3], [4.07, 0.03, 0.2]];
const SWELL = [[1, 1, 1], [1.5, 0.25, 1.2]];
const HOVER = [[1, 1, 1]];

export function createGraph(context, random = Math.random) {
  const rate = context.sampleRate;
  const state = { at: context.currentTime + 0.05, chord: 0, lastNote: -Infinity, lastTick: -Infinity, period: -1, year: 0, voices: [], layers: [], hold: null };

  const gain = (value = 0) => {
    const node = context.createGain();
    node.gain.value = value;
    return node;
  };
  const filter = (type, frequency, Q = 0.5) => {
    const node = context.createBiquadFilter();
    node.type = type;
    node.frequency.value = frequency;
    node.Q.value = Q;
    return node;
  };
  const wave = (type, frequency, detune = 0) => {
    const node = context.createOscillator();
    node.type = type;
    node.frequency.value = frequency;
    node.detune.value = detune;
    return node;
  };
  const buffer = (channels) => {
    const made = context.createBuffer(channels.length, channels[0].length, rate);
    channels.forEach((data, k) => made.getChannelData(k).set(data));
    return made;
  };
  const slow = (frequency, depth, target) => {
    const lfo = wave("sine", frequency);
    const swing = gain(depth);
    lfo.connect(swing);
    swing.connect(target);
    lfo.start();
  };

  const master = gain(0);
  const floor = filter("highpass", TONES.floor, 0.7);
  const soften = filter("lowpass", TONES.soften, 0.5);
  const mix = gain(1);
  mix.connect(soften);
  soften.connect(floor);
  floor.connect(master);
  master.connect(context.destination);

  const room = context.createConvolver();
  room.buffer = buffer(impulseOf(rate));
  const back = gain(TONES.room);
  room.connect(back);
  back.connect(mix);

  const route = ([dry, wet]) => {
    const near = gain(dry);
    const far = gain(wet);
    near.connect(mix);
    far.connect(room);
    return [near, far];
  };
  const feed = (node, outputs) => outputs.forEach((output) => node.connect(output));

  const pads = route(TONES.bed.pad);
  const shimmers = route(TONES.bed.shimmer);
  const airs = route(TONES.bed.air);
  const subs = route(TONES.bed.sub);
  const notes = route(TONES.note);
  const hovers = route(TONES.hover);
  const swells = route(TONES.swell);
  const travels = route(TONES.travel);

  const padIn = filter("lowpass", TONES.padCut, 0.3);
  const padOut = gain(1);
  padIn.connect(padOut);
  feed(padOut, pads);
  slow(0.031, TONES.padSwing, padIn.frequency);

  const shine = gain(0.6);
  feed(shine, shimmers);
  slow(0.057, 0.4, shine.gain);

  const noise = buffer([noiseOf(rate * 6, 11)]);
  const air = context.createBufferSource();
  const airBand = filter("bandpass", TONES.airCut, 0.6);
  const airLevel = gain(TONES.airLevel);
  air.buffer = noise;
  air.loop = true;
  air.connect(airBand);
  airBand.connect(airLevel);
  feed(airLevel, airs);
  slow(0.043, TONES.airLevel * 0.6, airLevel.gain);
  air.start();

  const sweepOf = (nodes) => () => nodes.forEach((node) => node.disconnect());

  const chordAt = (index, start, span, rise = TONES.fade) => {
    const { sub, pad, shimmer } = chordOf(index);
    const end = start + span + TONES.fade;
    state.layers = state.layers.filter((layer) => layer.end > context.currentTime);
    const buses = new Map();
    const busOf = (output) => {
      if (!buses.has(output)) {
        const bus = gain(1);
        bus.connect(output);
        buses.set(output, bus);
      }
      return buses.get(output);
    };
    const chord = { buses, oscillators: [], end };
    state.layers.push(chord);
    const layer = (oscillator, level, output) => {
      const envelope = gain(0);
      chord.oscillators.push(oscillator);
      envelope.gain.setValueAtTime(0, start);
      envelope.gain.linearRampToValueAtTime(level, start + rise);
      envelope.gain.setValueAtTime(level, end - TONES.fade);
      envelope.gain.linearRampToValueAtTime(0, end);
      oscillator.connect(envelope);
      envelope.connect(busOf(output));
      oscillator.start(start);
      oscillator.stop(end + 0.1);
      oscillator.onended = sweepOf([oscillator, envelope]);
    };
    pad.forEach((frequency) => [-TONES.detune, TONES.detune].forEach((detune) => layer(wave("triangle", frequency, detune), TONES.padLevel, padIn)));
    shimmer.forEach((frequency) => layer(wave("sine", frequency), TONES.shimmerLevel, shine));
    const low = gain(1);
    feed(low, subs);
    layer(wave("sine", sub), TONES.subLevel, low);
  };

  const strike = (frequency, { peak, attack, length, partials, outputs, when }) => {
    const start = Math.max(when, context.currentTime);
    const release = length / 4.6;
    const rise = attack * 3;
    const duck = gain(1);
    feed(duck, outputs);
    state.voices = state.voices.filter((voice) => voice.end > start);
    if (state.voices.length >= TONES.voices) state.voices.shift().duck.gain.setTargetAtTime(0, start, 0.15);
    const level = peak * crowdOf(state.voices.length);
    let end = start;
    let last = null;
    const nodes = [duck];
    for (const [ratio, share, scale] of partials) {
      const oscillator = wave("sine", frequency * ratio);
      const part = gain(0);
      part.gain.setValueAtTime(0, start);
      part.gain.setTargetAtTime(level * share, start, attack);
      part.gain.setTargetAtTime(0, start + rise, release * scale);
      oscillator.connect(part);
      part.connect(duck);
      oscillator.start(start);
      const stopAt = start + rise + release * scale * 8;
      oscillator.stop(stopAt);
      if (stopAt >= end) {
        end = stopAt;
        last = oscillator;
      }
      nodes.push(oscillator, part);
    }
    last.onended = sweepOf(nodes);
    state.voices.push({ end, duck });
  };

  const sweep = (direction, when) => {
    const start = Math.max(when, context.currentTime);
    const [from, to] = direction >= 0 ? [220, 680] : [680, 220];
    const source = context.createBufferSource();
    const band = filter("bandpass", from, 1.2);
    const envelope = gain(0);
    source.buffer = noise;
    source.loop = true;
    band.frequency.setValueAtTime(from, start);
    band.frequency.exponentialRampToValueAtTime(to, start + 3.2);
    envelope.gain.setValueAtTime(0, start);
    envelope.gain.setTargetAtTime(TONES.travelPeak, start, 0.5);
    envelope.gain.setTargetAtTime(0, start + 1.5, 0.6);
    source.connect(band);
    band.connect(envelope);
    feed(envelope, travels);
    source.start(start, random() * 2);
    source.stop(start + 6.5);
    source.onended = sweepOf([source, band, envelope]);
  };

  return {
    master,
    run(horizon = TONES.horizon) {
      while (state.at < context.currentTime + horizon) {
        const span = spanOf(random());
        chordAt(state.chord, state.at, span);
        state.at += span;
        state.chord = nextChord(state.hold, state.chord, random());
      }
    },
    age(age) {
      const hold = age < 0 ? null : age;
      if (hold === state.hold) return;
      state.hold = hold;
      const now = context.currentTime;
      state.layers.forEach(({ buses, oscillators, end }) => {
        if (end <= now) return;
        buses.forEach((bus) => bus.gain.setTargetAtTime(0, now, TONES.change / 3));
        oscillators.forEach((oscillator) => {
          try {
            oscillator.stop(now + TONES.change * 2);
          } catch {}
        });
      });
      state.layers = [];
      state.chord = chordOfAge(age);
      const span = spanOf(random());
      chordAt(state.chord, now, span, TONES.change);
      state.at = now + span;
      state.chord = nextChord(state.hold, state.chord, random());
    },
    fade(on) {
      const now = context.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(on ? TONES.master : 0, now, on ? TONES.fadeIn : TONES.fadeOut);
    },
    memory({ year, weight, period = -1 }, at = context.currentTime) {
      if (!tickDue(at, state.lastNote, TONES.noteGap)) return;
      state.lastNote = at;
      const travelled = period >= 0 && state.period >= 0 && period !== state.period;
      if (travelled) sweep(year >= state.year ? 1 : -1, at);
      state.period = period;
      state.year = year;
      strike(noteOf(year), { peak: peakOf(weight), attack: 0.02, length: lengthOf(weight), partials: BELL, outputs: notes, when: at + (travelled ? TONES.arrival : 0) });
    },
    swell(kind, at = context.currentTime) {
      strike(swellOf(kind), { peak: TONES.swellPeak, attack: 0.9, length: 6, partials: SWELL, outputs: swells, when: at });
    },
    tick(at = context.currentTime) {
      if (!tickDue(at, state.lastTick)) return;
      state.lastTick = at;
      strike(TONES.tick, { peak: TONES.tickPeak, attack: 0.15, length: 1.4, partials: HOVER, outputs: hovers, when: at });
    },
    travel(direction, at = context.currentTime) {
      sweep(direction, at);
    },
  };
}

export function createSound() {
  const Context = globalThis.AudioContext ?? globalThis.webkitAudioContext;
  const state = { context: null, graph: null, on: true, timer: 0, stopTimer: 0, age: -1 };
  if (!Context) return { supported: false, toggle: () => false, start: () => false, running: () => false, isOn: () => false, memory() {}, age() {}, swell() {}, tick() {}, travel() {}, pause() {}, close() {} };

  const ready = () => state.on && state.graph;
  const begin = () => {
    if (!state.context) {
      state.context = new Context();
      state.graph = createGraph(state.context);
    }
    const { context, graph } = state;
    clearTimeout(state.stopTimer);
    clearInterval(state.timer);
    graph.fade(true);
    context.resume?.();
    graph.age(state.age);
    graph.run();
    state.timer = setInterval(() => graph.run(), TONES.interval);
  };

  return {
    supported: true,
    isOn: () => state.on,
    running: () => state.context?.state === "running",
    start() {
      if (state.on && !document.hidden) begin();
      return state.on;
    },
    toggle() {
      if (!state.context && state.on) {
        state.on = false;
        return false;
      }
      state.on = !state.on;
      if (state.on) begin();
      else {
        clearTimeout(state.stopTimer);
        clearInterval(state.timer);
        state.graph.fade(false);
        state.stopTimer = setTimeout(() => !state.on && state.context.suspend?.(), TONES.suspendAfter);
      }
      return state.on;
    },
    memory(mark) {
      if (ready()) state.graph.memory(mark);
    },
    swell(kind) {
      if (ready()) state.graph.swell(kind);
    },
    age(age) {
      state.age = age;
      if (ready()) state.graph.age(age);
    },
    tick() {
      if (ready()) state.graph.tick();
    },
    travel(direction) {
      if (ready()) state.graph.travel(direction);
    },
    pause(hidden) {
      if (!state.context || !state.on) return;
      if (hidden) state.context.suspend?.();
      else state.context.resume?.();
    },
    close() {
      clearTimeout(state.stopTimer);
      clearInterval(state.timer);
      state.on = true;
      state.context?.close?.();
      state.context = null;
      state.graph = null;
    },
  };
}
