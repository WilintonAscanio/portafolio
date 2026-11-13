import { fitCanvas, prefersReducedMotion, trackPointer, type Effect, type Surface } from './canvas';

const UP = '#3ccf8e';
const DOWN = '#ff6b6b';
const AVERAGE = '#f2c200';
const PERIOD = 12;
const SECONDS_PER_CANDLE = 0.45;

type Candle = { o: number; h: number; l: number; c: number; signal: 1 | -1 | 0 };

/** Live backtest: candles stream in, a moving-average crossover marks buys and sells,
    and the stage reports the strategy against buy-and-hold for the visible window. */
export function createCandles(stage: HTMLElement): Effect {
  const canvas = stage.querySelector('canvas')!;
  const strategyOut = stage.querySelector<HTMLElement>('[data-strategy]')!;
  const holdOut = stage.querySelector<HTMLElement>('[data-hold]')!;
  const pointer = trackPointer(stage);
  const reduce = prefersReducedMotion();
  // Thumbnails have no readout above the chart, so they use the full height.
  const compact = stage.classList.contains('stage--compact');
  const pct = new Intl.NumberFormat(document.documentElement.lang === 'en' ? 'en-US' : 'es-CO', { style: 'percent', maximumFractionDigits: 1, signDisplay: 'always' });

  let surface: Surface;
  let candles: Candle[] = [];
  let step = 12;
  let count = 0;
  let timer = 0;
  let last = 0;
  let lo = 0;
  let hi = 0;

  function next(prev: number): Candle {
    // A slow wave plus noise keeps trends long enough for the crossover to catch some of them.
    const drift = Math.sin(candles.length / 17) * 0.004 + 0.0006;
    const c = prev * (1 + drift + (Math.random() - 0.5) * 0.02);
    const spread = Math.abs(c - prev) + prev * 0.004 * Math.random();
    return { o: prev, c, h: Math.max(prev, c) + spread * Math.random(), l: Math.min(prev, c) - spread * Math.random(), signal: 0 };
  }

  function average(i: number) {
    if (i < PERIOD - 1) return null;
    let sum = 0;
    for (let k = i - PERIOD + 1; k <= i; k++) sum += candles[k].c;
    return sum / PERIOD;
  }

  function mark(i: number) {
    const now = average(i);
    const before = average(i - 1);
    if (now == null || before == null) return;
    const above = candles[i].c > now;
    const wasAbove = candles[i - 1].c > before;
    candles[i].signal = above && !wasAbove ? 1 : !above && wasAbove ? -1 : 0;
  }

  function report() {
    const first = Math.max(PERIOD, candles.length - count);
    let equity = 1;
    let holding = false;
    for (let i = first; i < candles.length; i++) {
      if (holding) equity *= candles[i].c / candles[i - 1].c;
      if (candles[i].signal === 1) holding = true;
      if (candles[i].signal === -1) holding = false;
    }
    strategyOut.textContent = pct.format(equity - 1);
    holdOut.textContent = pct.format(candles[candles.length - 1].c / candles[first - 1].c - 1);
  }

  function build() {
    surface = fitCanvas(canvas);
    step = compact ? 6 : surface.w < 500 ? 9 : 12;
    count = Math.ceil(surface.w / step) + 2;
    candles = [];
    let price = 100;
    for (let i = 0; i < count + PERIOD; i++) {
      const candle = next(price);
      candles.push(candle);
      price = candle.c;
      mark(candles.length - 1);
    }
    lo = Math.min(...candles.map((c) => c.l));
    hi = Math.max(...candles.map((c) => c.h));
    report();
  }

  function frame(time: number) {
    const dt = Math.min(0.05, (time - (last || time)) / 1000);
    last = time;
    if (!reduce) timer += dt;
    if (timer > SECONDS_PER_CANDLE) {
      timer = 0;
      candles.push(next(candles[candles.length - 1].c));
      mark(candles.length - 1);
      if (candles.length > count + PERIOD * 2) candles.splice(0, candles.length - count - PERIOD);
      report();
    }
    const { ctx, w, h } = surface;
    const visible = candles.slice(-count);
    // The price scale eases toward the visible range so the chart never jumps.
    const targetLo = Math.min(...visible.map((c) => c.l));
    const targetHi = Math.max(...visible.map((c) => c.h));
    lo += (targetLo - lo) * 0.08;
    hi += (targetHi - hi) * 0.08;
    const top = compact ? 12 : 64;
    const bottom = h - (compact ? 10 : 28);
    const y = (v: number) => bottom - ((v - lo) / (hi - lo || 1)) * (bottom - top);
    const offset = (timer / SECONDS_PER_CANDLE) * step;
    const x = (i: number) => w - 18 - (visible.length - 1 - i) * step - offset + step;

    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 1;
    for (let k = 0; k < 4; k++) {
      const gy = top + ((bottom - top) * k) / 3;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(w, gy);
      ctx.stroke();
    }

    const body = Math.max(3, step * 0.58);
    visible.forEach((c, i) => {
      const cx = x(i);
      if (cx < -step || cx > w + step) return;
      const color = c.c >= c.o ? UP : DOWN;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(cx, y(c.h));
      ctx.lineTo(cx, y(c.l));
      ctx.stroke();
      const y1 = y(Math.max(c.o, c.c));
      ctx.fillRect(cx - body / 2, y1, body, Math.max(1.5, y(Math.min(c.o, c.c)) - y1));
      if (c.signal) {
        const up = c.signal === 1;
        const my = up ? y(c.l) + 12 : y(c.h) - 12;
        ctx.fillStyle = up ? UP : DOWN;
        ctx.beginPath();
        ctx.moveTo(cx, up ? my - 5 : my + 5);
        ctx.lineTo(cx - 5, up ? my + 4 : my - 4);
        ctx.lineTo(cx + 5, up ? my + 4 : my - 4);
        ctx.fill();
      }
    });

    const base = candles.length - visible.length;
    ctx.strokeStyle = AVERAGE;
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    visible.forEach((_, i) => {
      const value = average(base + i);
      if (value == null) return;
      if (started) ctx.lineTo(x(i), y(value));
      else {
        ctx.moveTo(x(i), y(value));
        started = true;
      }
    });
    ctx.stroke();

    if (pointer.inside && !compact) {
      const i = Math.max(0, Math.min(visible.length - 1, Math.round(visible.length - 1 - (w - 18 + step - offset - pointer.x) / step)));
      const cx = x(i);
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, top - 10);
      ctx.lineTo(cx, bottom);
      ctx.stroke();
      const text = visible[i].c.toFixed(2);
      ctx.font = '500 12px "Geist Mono Variable", monospace';
      const tw = ctx.measureText(text).width + 14;
      const bx = Math.min(w - tw - 6, Math.max(6, cx - tw / 2));
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.roundRect(bx, bottom + 4, tw, 20, 5);
      ctx.fill();
      ctx.fillStyle = '#0d1220';
      ctx.fillText(text, bx + 7, bottom + 18);
    }
  }

  return { build, frame };
}
