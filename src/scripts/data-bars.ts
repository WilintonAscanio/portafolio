import { fitCanvas, prefersReducedMotion, trackPointer, type Effect, type Surface } from './canvas';

const VALUES = [0.62, 0.84, 0.45, 0.96, 0.58, 0.74, 0.38];
const CYCLE_SECONDS = 3.4;

type Dot = { tx: number; ty: number; cx: number; cy: number; x: number; y: number; vx: number; vy: number; bar: number; size: number; phase: number };

/** A cloud of dots that settles into a bar chart while the request types out; the pointer pushes dots away. */
export function createDataBars(stage: HTMLElement): Effect {
  const canvas = stage.querySelector('canvas')!;
  const caption = stage.querySelector<HTMLElement>('[data-caption]')!;
  const typed = stage.querySelector<HTMLElement>('[data-typed]')!;
  const message = stage.dataset.message ?? '';
  const pointer = trackPointer(stage);
  const reduce = prefersReducedMotion();

  let surface: Surface;
  let dots: Dot[] = [];
  let mode: 'cloud' | 'chart' = 'cloud';
  let timer = 0;
  let last = 0;
  let chars = 0;

  function build() {
    surface = fitCanvas(canvas);
    const { w, h } = surface;
    const cell = w < 500 ? 5 : 6;
    const top = 96;
    const bottom = h - 48;
    const slot = (w * 0.8) / VALUES.length;
    const barWidth = Math.floor((slot * 0.68) / cell) * cell;
    dots = [];
    VALUES.forEach((value, bar) => {
      const barHeight = Math.floor(((bottom - top) * value) / cell) * cell;
      const x0 = w * 0.1 + bar * slot + (slot - barWidth) / 2;
      for (let y = 0; y < barHeight; y += cell) {
        for (let x = 0; x < barWidth; x += cell) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.sqrt(Math.random()) * Math.min(w, h) * 0.42;
          const cx = w / 2 + Math.cos(angle) * radius * 1.25;
          const cy = h / 2 + 20 + Math.sin(angle) * radius * 0.8;
          dots.push({ tx: x0 + x, ty: bottom - y - cell, cx, cy, x: cx, y: cy, vx: 0, vy: 0, bar, size: cell - 1.6, phase: Math.random() * Math.PI * 2 });
        }
      }
    });
  }

  function frame(time: number) {
    const dt = Math.min(0.05, (time - (last || time)) / 1000);
    last = time;
    timer += dt;
    if (pointer.inside) mode = 'chart';
    else if (timer > CYCLE_SECONDS) {
      timer = 0;
      mode = mode === 'chart' ? 'cloud' : 'chart';
      if (mode === 'chart') chars = 0;
    }
    if (reduce) {
      mode = 'chart';
      chars = message.length;
    }
    chars = Math.min(message.length, chars + dt * 38);
    typed.textContent = message.slice(0, Math.floor(chars));

    const { ctx, w, h } = surface;
    ctx.clearRect(0, 0, w, h);
    let settled = 0;
    for (const d of dots) {
      const tx = mode === 'chart' ? d.tx : d.cx + Math.sin(time / 900 + d.phase) * 6;
      const ty = mode === 'chart' ? d.ty : d.cy + Math.cos(time / 1100 + d.phase) * 6;
      d.vx += (tx - d.x) * 0.05;
      d.vy += (ty - d.y) * 0.05;
      if (pointer.inside) {
        const dx = d.x - pointer.x;
        const dy = d.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 6400) {
          const force = (1 - d2 / 6400) * 2.4;
          const dist = Math.sqrt(d2) || 1;
          d.vx += (dx / dist) * force;
          d.vy += (dy / dist) * force;
        }
      }
      d.vx *= 0.8;
      d.vy *= 0.8;
      d.x += d.vx;
      d.y += d.vy;
      if (reduce) {
        d.x = tx;
        d.y = ty;
      }
      if (Math.abs(d.x - tx) < 1.5) settled++;
      ctx.fillStyle = d.bar % 2 ? '#8fa6ef' : '#1f4fd6';
      ctx.fillRect(d.x, d.y, d.size, d.size);
    }
    caption.classList.toggle('on', mode === 'chart' && settled > dots.length * 0.8);
  }

  return { build, frame };
}
