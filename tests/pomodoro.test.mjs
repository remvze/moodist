import assert from 'node:assert/strict';
import { afterEach, beforeEach, mock, test } from 'node:test';
import { usePomodoroStore } from '../src/stores/pomodoro.ts';

const initialState = usePomodoroStore.getState();

beforeEach(() => {
  usePomodoroStore.setState(initialState, true);
  mock.timers.enable({ apis: ['Date'], now: 100_000 });
});
afterEach(() => mock.timers.reset());

test('uses elapsed time after a background-tab delay, and completes only once', () => {
  const timer = usePomodoroStore.getState();
  timer.setDuration(60);
  timer.start();
  mock.timers.tick(45_500);
  assert.equal(timer.tick(), false);
  assert.equal(usePomodoroStore.getState().remaining, 15);
  mock.timers.tick(20_000);
  assert.equal(timer.tick(), true);
  assert.equal(timer.tick(), false);
  assert.equal(usePomodoroStore.getState().remaining, 0);
  assert.equal(usePomodoroStore.getState().running, false);
  assert.equal(usePomodoroStore.getState().completions.pomodoro, 1);
});

test('pause and resume preserve the remaining time without counting the pause', () => {
  const timer = usePomodoroStore.getState();
  timer.start();
  mock.timers.tick(10_000);
  timer.pause();
  assert.equal(usePomodoroStore.getState().remaining, 1490);
  mock.timers.tick(60_000);
  timer.start();
  mock.timers.tick(1000);
  timer.tick();
  assert.equal(usePomodoroStore.getState().remaining, 1489);
  timer.reset();
  assert.equal(usePomodoroStore.getState().remaining, 1500);
  assert.equal(usePomodoroStore.getState().running, false);
});

test('switches mode and changes duration without leaving the previous session running', () => {
  const timer = usePomodoroStore.getState();
  timer.start();
  timer.setMode('short');
  assert.equal(usePomodoroStore.getState().remaining, 300);
  assert.equal(usePomodoroStore.getState().running, false);
  timer.setDuration(600);
  timer.start();
  mock.timers.tick(600_000);
  timer.tick();
  assert.equal(usePomodoroStore.getState().completions.short, 1);
  timer.start();
  assert.equal(usePomodoroStore.getState().remaining, 600);
});

test('rejects invalid durations and validates saved preferences', () => {
  const timer = usePomodoroStore.getState();
  for (const invalid of [0, -60, NaN, Infinity, 60.5, 10860]) {
    timer.setDuration(invalid);
    assert.equal(usePomodoroStore.getState().remaining, 1500);
  }
  timer.configure({ pomodoro: 3000, short: -1, long: '900' });
  assert.deepEqual(usePomodoroStore.getState().durations, {
    pomodoro: 3000,
    short: 300,
    long: 900,
  });
  assert.equal(usePomodoroStore.getState().remaining, 3000);
});
