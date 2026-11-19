import { test } from "node:test";
import assert from "node:assert/strict";
import { CHORDS, PENTATONIC, PROFILES, TONES, breathOf, breathWave, chordAfter, chordOf, crowdOf, hz, impulseOf, lengthOf, noiseOf, noteOf, peakOf, pinkOf, seeded, spanOf, swellOf, tickDue, tickOf } from "../assets/js/tones.js";

const SCALE = [0, 2, 4, 5, 7, 9];
const semitonesFromD = (frequency) => 12 * Math.log2(frequency / hz(-19));
const pitchClass = (frequency) => ((Math.round(semitonesFromD(frequency)) % 12) + 12) % 12;
const rough = (data, from, to) => {
  let slope = 0;
  let power = 1e-12;
  for (let i = from + 1; i < to; i++) {
    slope += (data[i] - data[i - 1]) ** 2;
    power += data[i] ** 2;
  }
  return slope / power;
};

test("a memory's pitch rises with its date through two octaves of D major pentatonic, tuned on 432, and never turns shrill", () => {
  const years = Array.from({ length: 51 }, (_, k) => 1980 + k);
  const notes = years.map(noteOf);
  notes.forEach((note, k) => k && assert.ok(note >= notes[k - 1], `${years[k]} is not lower than ${years[k - 1]}`));
  assert.equal(notes[0], TONES.base, "the first year is the base note");
  assert.ok(Math.abs(TONES.base - 432 * 2 ** (-7 / 12)) < 1e-9, "D4 on a 432 tuning");
  assert.ok(notes.at(-1) < TONES.base * 2 ** TONES.octaves && notes.at(-1) < 1000);
  for (const note of notes) {
    const semitones = Math.round(12 * Math.log2(note / TONES.base));
    assert.ok(PENTATONIC.includes(semitones % 12), `${semitones} semitones is off the scale`);
    assert.ok(Math.abs(12 * Math.log2(note / TONES.base) - semitones) < 1e-9);
  }
  assert.equal(noteOf(1900), noteOf(1980));
  assert.equal(noteOf(2100), noteOf(2030));
  assert.ok(new Set(notes).size >= 8, "the years are told apart");
});

test("a heavier memory rings longer and a little louder, the loudest note stays under -36 dB, and a crowd of notes gets quieter each", () => {
  assert.ok(lengthOf(1) < lengthOf(2) && lengthOf(2) < lengthOf(3));
  assert.ok(lengthOf(1) >= 3, "a long, reverberant ring");
  assert.equal(lengthOf(9), lengthOf(1));
  assert.ok(peakOf(1) < peakOf(2) && peakOf(2) < peakOf(3));
  assert.equal(peakOf(9), peakOf(3));
  assert.ok(peakOf(3) * TONES.master <= 0.032, "at most -30 dBFS before the reverb");
  const bedRms = Math.hypot(Math.sqrt(8) * TONES.padLevel * 0.58, TONES.subLevel * 0.71, TONES.airLevel * 0.35);
  assert.ok((peakOf(1) * TONES.note[0]) / Math.SQRT2 >= bedRms * 1.4, "a memory's note stands clearly above the bed");
  assert.equal(crowdOf(0), 1);
  assert.ok(crowdOf(1) < 1 && crowdOf(3) < crowdOf(1) && crowdOf(TONES.voices) > 0);
  assert.ok(TONES.noteGap >= 0.25, "notes cannot machine-gun");
});

test("the bed is slow chords of open stacked fifths and fourths in D major without its leading tone, with a deep sub, and a very low level", () => {
  assert.ok(CHORDS.length >= 4);
  for (let k = 0; k < CHORDS.length; k++) {
    const { sub, pad, shimmer } = chordOf(k);
    assert.ok(sub >= 34 && sub <= 66, `the sub of chord ${k} is ${sub.toFixed(1)} Hz`);
    assert.ok(pad.length === 4 && pad.every((frequency) => frequency >= 130 && frequency <= 500), `the pad of chord ${k} sits in the warm middle`);
    assert.ok(shimmer.length >= 2 && shimmer.every((frequency) => frequency <= 1100), "the shimmer stays low and soft");
    for (const frequency of [sub, ...pad, ...shimmer]) assert.ok(SCALE.includes(pitchClass(frequency)), `chord ${k}: ${frequency.toFixed(1)} Hz is out of the mode`);
  }
  assert.equal(chordOf(CHORDS.length).pad[0], chordOf(0).pad[0], "the index wraps");
  assert.ok(TONES.chordFrom >= 20 && TONES.chordTo > TONES.chordFrom, "a chord lasts at least twenty seconds");
  assert.ok(TONES.fade >= 6 && TONES.fade < TONES.chordFrom, "chords melt into each other over many seconds");
  assert.ok(TONES.detune <= 6, "a detune that swells slowly instead of beating");
  const peak = (8 * TONES.padLevel + 2 * TONES.shimmerLevel + TONES.subLevel + TONES.airLevel * 1.6) * TONES.master;
  assert.ok(peak <= 0.05, `the bed adds up to ${peak.toFixed(4)} at worst, under -26 dBFS`);
});

test("the master level is clearly audible without ever being loud", () => {
  assert.ok(TONES.master >= 0.5 && TONES.master <= 0.9, `master is ${TONES.master}`);
});

test("the chords wander without repeating the one that just played, and every chord and span stays in range", () => {
  const rolls = Array.from({ length: 40 }, (_, k) => k / 40);
  for (let from = 0; from < CHORDS.length; from++) {
    const next = rolls.map((roll) => chordAfter(from, roll));
    assert.ok(next.every((index) => index !== from && index >= 0 && index < CHORDS.length));
    assert.equal(new Set(next).size, CHORDS.length - 1, "every other chord can follow");
  }
  assert.equal(chordAfter(0, 5), chordAfter(0, 1));
  assert.equal(spanOf(0), TONES.chordFrom);
  assert.equal(spanOf(1), TONES.chordTo);
  assert.equal(spanOf(7), TONES.chordTo);
});

test("the book and the clone each have their own low swell, and the hover tone is one soft pitch that cannot rattle", () => {
  assert.notEqual(swellOf("book"), swellOf("clone"));
  assert.ok(swellOf("book") < 200 && swellOf("clone") < 200);
  assert.ok(TONES.tick > 300 && TONES.tick < 500);
  assert.ok(TONES.tickPeak < peakOf(1), "quieter than any memory");
  assert.equal(tickDue(0.5, 0), false, "not twice within a moment");
  assert.equal(tickDue(TONES.tickGap, 0), true);
  assert.equal(tickDue(10, -1), true, "the first one is always due");
  assert.equal(tickDue(0.2, 0, 0.1), true, "a gap can be given");
});

test("the room is a stereo, five-second, darkened, deterministic tail that starts after a short pause and ends in silence", () => {
  const rate = 8000;
  const [left, right] = impulseOf(rate);
  assert.equal(left.length, right.length);
  assert.ok(left.length >= rate * 4.5 && left.length <= rate * 6.5, "four to six seconds");
  assert.notDeepEqual(Array.from(left.slice(2000, 2100)), Array.from(right.slice(2000, 2100)), "the two ears differ");
  assert.deepEqual(impulseOf(rate)[0], left, "the same room every time");
  assert.ok(left.slice(0, Math.floor(rate * TONES.reach)).every((value) => value === 0), "a pause before the first reflection");
  const power = (data, from, to) => data.slice(from, to).reduce((sum, value) => sum + value * value, 0);
  assert.ok(power(left, left.length - rate, left.length) < power(left, 0, rate) * 1e-4, "it dies away");
  assert.ok(Math.abs(left.at(-1)) < 1e-6, "no click at the end");
  assert.ok(rough(left, rate * 4, rate * 5) < rough(left, Math.floor(rate * 0.1), rate) * 0.6, "it grows darker as it fades");
  assert.ok(left.every(Number.isFinite) && Math.max(...left.map(Math.abs)) < 2);
});

test("seeded noise and chances are repeatable, bounded and soft", () => {
  const random = seeded(3);
  const draws = Array.from({ length: 200 }, random);
  assert.ok(draws.every((value) => value >= 0 && value < 1));
  assert.deepEqual(Array.from({ length: 5 }, seeded(3)), draws.slice(0, 5));
  assert.notDeepEqual(Array.from({ length: 5 }, seeded(4)), draws.slice(0, 5));
  const noise = noiseOf(4000, 1);
  assert.equal(noise.length, 4000);
  assert.ok(Math.abs(Math.max(...noise.map(Math.abs)) - 1) < 1e-6 && noise.every(Number.isFinite));
  assert.deepEqual(noiseOf(4000, 1), noise);
  assert.ok(rough(noise, 0, 4000) < 0.2, "a dark, brown noise");
});

test("a note that follows the camera into another galaxy waits for it only briefly, and the opening's birth notes never count as a place the visitor came from", async () => {
  assert.ok(TONES.arrival > 0 && TONES.arrival <= 0.5, "the note lands with the camera, not after it");
  const { readFileSync } = await import("node:fs");
  const engine = readFileSync(new URL("../assets/js/engine.js", import.meta.url), "utf8");
  assert.match(engine, /sound\.memory\(\{ \.\.\.marks\[first\], period: -1 \}\)/);
});

test("each age holds its own chord of the bed, and the whole life wanders from the home chord", async () => {
  const { chordOfAge, nextChord } = await import("../assets/js/tones.js");
  const { readFileSync } = await import("node:fs");
  assert.equal(PROFILES.now.change, 3, "the bed before glided to an age in three seconds");
  assert.ok(PROFILES.next.change > PROFILES.now.change && PROFILES.next.change <= 6, "the bed that plays glides more gently, never slower than six");
  assert.equal(chordOfAge(-1), 0, "the whole life starts from the home chord");
  assert.deepEqual([0, 1, 2, 3, 4].map(chordOfAge), [0, 1, 2, 3, 4], "five ages, five chords");
  assert.equal(chordOfAge(5), 0);
  assert.equal(nextChord(3, 1, 0.9), 3, "inside an age the bed keeps its chord");
  assert.notEqual(nextChord(null, 1, 0.9), 1, "the whole life keeps wandering");
  const sound = readFileSync(new URL("../assets/js/sound.js", import.meta.url), "utf8");
  assert.match(sound, /buses\.forEach\(\(bus\) => bus\.gain\.setTargetAtTime\(0, now, profile\.change \/ 3\)\)/, "the old chord fades on its own bus as the new one rises, without touching its envelopes");
  assert.match(sound, /graph\.age\(state\.age\);/, "an age chosen before the sound starts is kept");
  const engine = readFileSync(new URL("../assets/js/engine.js", import.meta.url), "utf8");
  assert.match(engine, /sound\.age\(viewed\);/);
});

test("the bed that plays and the one before it differ only in the improvements, each of which can be heard alone", () => {
  assert.deepEqual(Object.keys(PROFILES.now).sort(), Object.keys(PROFILES.next).sort());
  assert.deepEqual([PROFILES.now.breath, PROFILES.now.pink, PROFILES.now.chordTick], [false, false, false]);
  assert.deepEqual([PROFILES.next.breath, PROFILES.next.pink, PROFILES.next.chordTick], [true, true, true]);
  assert.equal(PROFILES.now.reverb, PROFILES.next.reverb, "the room stays until the creator chooses a shorter one");
});

test("the bed breathes at resonance pace, about five and a half breaths a minute, breathing out longer than in", () => {
  const { period, inhale, pad, air } = TONES.breath;
  assert.ok(60 / period >= 5 && 60 / period <= 6.5, `${(60 / period).toFixed(1)} breaths a minute`);
  assert.ok(inhale > 0.3 && inhale < 0.5, "the out-breath is the longer one");
  assert.ok(pad > 0 && pad <= 0.3 && air > 0 && air < 1, "a swell that is felt, never a pulse, and never a negative gain");
  assert.equal(breathOf(0), -1, "it starts breathed out");
  assert.ok(Math.abs(breathOf(inhale) - 1) < 1e-9, "full at the end of the in-breath");
  assert.ok(Math.abs(breathOf(1) - breathOf(0)) < 1e-9 && Math.abs(breathOf(2.25) - breathOf(0.25)) < 1e-9, "every breath the same");
  const samples = Array.from({ length: 1000 }, (_, k) => breathOf(k / 1000));
  assert.ok(samples.every((value) => value >= -1 && value <= 1));
  const steps = samples.slice(1).map((value, k) => Math.abs(value - samples[k]));
  assert.ok(Math.max(...steps) < 0.02, "no jump anywhere in the breath");
  const { real, imag } = breathWave();
  assert.equal(real[0], 0, "no offset: the swell is around the level that ships");
  assert.equal(imag[0], 0);
  const at = (phase) => Array.from(real).reduce((sum, a, k) => sum + a * Math.cos(2 * Math.PI * k * phase) + imag[k] * Math.sin(2 * Math.PI * k * phase), 0);
  const error = Math.max(...Array.from({ length: 200 }, (_, k) => Math.abs(at(k / 200) - breathOf(k / 200))));
  assert.ok(error < 0.01, `the oscillator draws the same breath (${error.toFixed(4)})`);
});

test("the proposed air is a seeded pink noise, between the old brown air and white hiss", () => {
  const pink = pinkOf(8000, 11);
  assert.equal(pink.length, 8000);
  assert.deepEqual(pinkOf(8000, 11), pink);
  assert.ok(Math.abs(Math.max(...pink.map(Math.abs)) - 1) < 1e-6 && pink.every(Number.isFinite));
  const random = seeded(11);
  const white = Float32Array.from({ length: 8000 }, () => random() * 2 - 1);
  const brown = noiseOf(8000, 11);
  assert.ok(rough(brown, 0, 8000) < rough(pink, 0, 8000) && rough(pink, 0, 8000) < rough(white, 0, 8000));
  assert.ok(TONES.pink.low >= 60 && TONES.pink.high <= TONES.soften, "inside the soft band of the master");
});

test("the hover tone takes the note of the sounding chord nearest to A, so it never rubs against the bed", () => {
  CHORDS.forEach((chord, index) => {
    const tone = tickOf(index);
    assert.ok(tone > 300 && tone < 500, `${tone} stays a calm pitch`);
    assert.ok(chord.pad.some((step) => pitchClass(tone) === (((step % 12) + 12) % 12)), `chord ${index}: a note of the chord`);
  });
  assert.equal(tickOf(0), TONES.tick, "the home chord keeps the A it always had");
});

test("the room can be shortened, keeping its shape", () => {
  const rate = 8000;
  const short = impulseOf(rate, 1, 3)[0];
  assert.ok(short.length >= rate * 3 && short.length <= rate * 3.5);
  assert.ok(Math.abs(short.at(-1)) < 1e-6);
  assert.deepEqual(impulseOf(rate, 1, PROFILES.next.reverb)[0], impulseOf(rate)[0]);
});
