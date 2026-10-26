const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const vm = require('node:vm');

function loadPreference(reducedMotion) {
  const video = {
    paused: false,
    pause() { this.paused = true; },
    play() { this.paused = false; return Promise.resolve(); },
  };
  const preference = { matches: reducedMotion, addEventListener: (_, listener) => { preference.change = listener; } };
  const root = { dataset: {} };
  const context = vm.createContext({
    window: { matchMedia: () => preference },
    document: {
      documentElement: root,
      addEventListener() {},
      getElementById: () => video,
    },
  });
  vm.runInContext(readFileSync('main.js', 'utf8'), context);
  vm.runInContext('initMotionPreference()', context);
  return { video, preference, root };
}

test('animations run normally without a reduced-motion preference', () => {
  const { video, root } = loadPreference(false);
  assert.equal(root.dataset.motionPaused, 'false');
  assert.equal(video.paused, false);
});

test('reduced-motion preferences apply initially and when changed', () => {
  const { video, preference, root } = loadPreference(true);
  assert.equal(video.paused, true);
  assert.equal(root.dataset.motionPaused, 'true');
  preference.change({ matches: false });
  assert.equal(root.dataset.motionPaused, 'false');
  assert.equal(video.paused, false);
  preference.change({ matches: true });
  assert.equal(root.dataset.motionPaused, 'true');
  assert.equal(video.paused, true);
});
