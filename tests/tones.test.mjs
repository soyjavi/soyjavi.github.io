import { test } from "node:test";
import assert from "node:assert/strict";
import { CHORDS, PENTATONIC, TONES, chordAfter, chordOf, crowdOf, hz, impulseOf, lengthOf, noiseOf, noteOf, peakOf, seeded, spanOf, swellOf, tickDue } from "../assets/js/tones.js";

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

test("the book and the AI each have their own low swell, and the hover tone is one soft pitch that cannot rattle", () => {
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
