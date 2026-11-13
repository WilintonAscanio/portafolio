import { nearestNeighborEdges, shortestPath } from '../lib/graph';
import { fitCanvas, prefersReducedMotion, trackPointer, type Effect, type Surface } from './canvas';

const STORES = ['Tienda La 14', 'Minimercado Sol', 'Droguería Central', 'Panadería Real', 'Surtidor El Paisa', 'Tienda Doña Rosa', 'Autoservicio Andino', 'Cigarrería 24', 'Frutería La Plaza', 'Granero San José', 'Mini Market Express', 'Tienda El Progreso'];
const INK = '#0f1115';
const YELLOW = '#f2c200';
const MAX_TRUCKS = 7;

type Stop = { x: number; y: number; name: string; depot: boolean; hit: number };
type Truck = { path: number[]; lengths: number[]; travelled: number; fade: number; arrived: boolean };

/** Delivery map: trucks leave the depot along the shortest route; tapping a store dispatches one there. */
export function createRoutesMap(stage: HTMLElement): Effect {
  const canvas = stage.querySelector('canvas')!;
  const onRoute = stage.querySelector<HTMLElement>('[data-on-route]')!;
  const delivered = stage.querySelector<HTMLElement>('[data-delivered]')!;
  const depotLabel = stage.dataset.depot ?? 'Bodega';
  const dispatchLabel = stage.dataset.dispatch ?? 'Despachar a';
  const pointer = trackPointer(stage);
  const reduce = prefersReducedMotion();

  let surface: Surface;
  let stops: Stop[] = [];
  let edges: [number, number][] = [];
  let adjacency: number[][] = [];
  let depot = 0;
  let trucks: Truck[] = [];
  let deliveredCount = 0;
  let last = 0;
  let autoTimer = 0;

  function build() {
    surface = fitCanvas(canvas);
    const { w, h } = surface;
    const margin = 36;
    const minGap = w < 500 ? 40 : 52;
    const target = w < 500 ? 34 : 58;
    stops = [];
    for (let tries = 0; stops.length < target && tries < 4000; tries++) {
      const candidate = { x: margin + Math.random() * (w - 2 * margin), y: margin + 40 + Math.random() * (h - 2 * margin - 60) };
      if (stops.every((s) => Math.hypot(s.x - candidate.x, s.y - candidate.y) > minGap)) {
        stops.push({ ...candidate, name: STORES[stops.length % STORES.length], depot: false, hit: 0 });
      }
    }
    const centre = (s: Stop) => Math.hypot(s.x - w * 0.5, s.y - h * 0.55);
    depot = stops.reduce((best, s, i) => (centre(s) < centre(stops[best]) ? i : best), 0);
    stops[depot].depot = true;
    stops[depot].name = depotLabel;
    ({ edges, adjacency } = nearestNeighborEdges(stops, 3));
    trucks = [];
  }

  function dispatch(to: number) {
    if (to === depot || trucks.length >= MAX_TRUCKS) return;
    const path = shortestPath(adjacency, depot, to);
    if (!path) return;
    const lengths = [0];
    for (let i = 1; i < path.length; i++) {
      const a = stops[path[i - 1]];
      const b = stops[path[i]];
      lengths.push(lengths[i - 1] + Math.hypot(b.x - a.x, b.y - a.y));
    }
    trucks.push({ path, lengths, travelled: 0, fade: 1, arrived: false });
  }

  function position(truck: Truck): [number, number, number] {
    let i = 1;
    while (i < truck.lengths.length - 1 && truck.lengths[i] < truck.travelled) i++;
    const a = stops[truck.path[i - 1]];
    const b = stops[truck.path[i]];
    const span = truck.lengths[i] - truck.lengths[i - 1] || 1;
    const t = Math.min(1, (truck.travelled - truck.lengths[i - 1]) / span);
    return [a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, i];
  }

  function hovered() {
    let best = -1;
    let bestDistance = 40;
    stops.forEach((s, i) => {
      const d = Math.hypot(s.x - pointer.x, s.y - pointer.y);
      if (d < bestDistance) {
        bestDistance = d;
        best = i;
      }
    });
    return best;
  }

  stage.addEventListener('click', () => {
    const target = hovered();
    if (target >= 0) dispatch(target);
  });

  function frame(time: number) {
    const dt = Math.min(0.05, (time - (last || time)) / 1000);
    last = time;
    const { ctx, w, h } = surface;
    ctx.clearRect(0, 0, w, h);

    autoTimer -= dt;
    if (autoTimer <= 0 && !reduce) {
      autoTimer = 1.6;
      dispatch(Math.floor(Math.random() * stops.length));
    }

    for (const [a, b] of edges) {
      const A = stops[a];
      const B = stops[b];
      const near = pointer.inside && Math.hypot((A.x + B.x) / 2 - pointer.x, (A.y + B.y) / 2 - pointer.y) < 130;
      ctx.strokeStyle = near ? '#9aa0a8' : '#dcdde0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.stroke();
    }

    for (const truck of trucks) {
      if (!truck.arrived) {
        truck.travelled += dt * (reduce ? 1e6 : 120);
        const total = truck.lengths[truck.lengths.length - 1];
        if (truck.travelled >= total) {
          truck.travelled = total;
          truck.arrived = true;
          stops[truck.path[truck.path.length - 1]].hit = 1;
          deliveredCount++;
        }
      } else {
        truck.fade -= dt * 0.9;
      }
      const [px, py, segment] = position(truck);
      ctx.globalAlpha = Math.max(0, truck.fade);
      ctx.strokeStyle = YELLOW;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(stops[truck.path[0]].x, stops[truck.path[0]].y);
      for (let k = 1; k < segment; k++) ctx.lineTo(stops[truck.path[k]].x, stops[truck.path[k]].y);
      ctx.lineTo(px, py);
      ctx.stroke();
      if (!truck.arrived) {
        ctx.fillStyle = INK;
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    trucks = trucks.filter((t) => t.fade > 0);

    const active = hovered();
    stops.forEach((s, i) => {
      if (s.hit > 0) s.hit = Math.max(0, s.hit - dt * 0.35);
      if (s.depot) {
        ctx.fillStyle = INK;
        ctx.fillRect(s.x - 7, s.y - 7, 14, 14);
        return;
      }
      if (s.hit > 0) {
        ctx.strokeStyle = `rgba(242,194,0,${s.hit})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 6 + (1 - s.hit) * 16, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = s.hit > 0 ? YELLOW : '#fff';
      ctx.strokeStyle = i === active ? INK : '#9aa0a8';
      ctx.lineWidth = i === active ? 2 : 1.2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, i === active ? 7 : 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    if (active >= 0) {
      const s = stops[active];
      const text = s.depot ? depotLabel : `${dispatchLabel} ${s.name}`;
      ctx.font = '500 12.5px "Geist Variable", sans-serif';
      const tw = ctx.measureText(text).width + 18;
      const bx = Math.min(w - tw - 8, Math.max(8, s.x - tw / 2));
      const by = s.y - 38;
      ctx.fillStyle = INK;
      ctx.beginPath();
      ctx.roundRect(bx, by, tw, 24, 6);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.fillText(text, bx + 9, by + 16);
    }
    stage.style.cursor = active >= 0 ? 'pointer' : 'crosshair';
    onRoute.textContent = String(trucks.filter((t) => !t.arrived).length);
    delivered.textContent = String(deliveredCount);
  }

  return { build, frame };
}
