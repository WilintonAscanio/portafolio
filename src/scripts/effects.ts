import type { Effect } from './canvas';
import { prefersReducedMotion } from './canvas';
import { createCandles } from './candles';
import { createDataBars } from './data-bars';
import { createRoutesMap } from './routes-map';

type Running = { stage: HTMLElement; effect: Effect; visible: boolean; built: boolean };

const running: Running[] = [];
let raf = 0;
const reduce = prefersReducedMotion();

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const item = running.find((r) => r.stage === entry.target);
    if (item) item.visible = entry.isIntersecting;
  }
  kick();
});

function loop(time: number) {
  let any = false;
  for (const item of running) {
    if (!item.visible || !item.stage.isConnected) continue;
    if (!item.built) {
      item.effect.build();
      item.built = true;
    }
    item.effect.frame(time);
    any = true;
  }
  // Under reduced motion one frame is drawn and the loop stops.
  raf = any && !reduce && !document.hidden ? requestAnimationFrame(loop) : 0;
}

function kick() {
  if (!raf) raf = requestAnimationFrame(loop);
}

/** Starts the effect on a stage; it only animates while on screen. Returns a stop function. */
export function mountEffect(stage: HTMLElement): () => void {
  const kind = stage.dataset.effect;
  const effect = kind === 'routes' ? createRoutesMap(stage) : kind === 'candles' ? createCandles(stage) : createDataBars(stage);
  const item: Running = { stage, effect, visible: false, built: false };
  running.push(item);
  observer.observe(stage);
  // With reduced motion the loop is idle, so a tap still needs a redraw.
  stage.addEventListener('click', kick);
  return () => {
    observer.unobserve(stage);
    running.splice(running.indexOf(item), 1);
  };
}

document.addEventListener('visibilitychange', kick);
let resizeTimer = 0;
addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    running.forEach((r) => (r.built = false));
    kick();
  }, 150);
});
