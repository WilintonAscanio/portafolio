export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export type Surface = { w: number; h: number; ctx: CanvasRenderingContext2D };

/** Sizes the canvas backing store to its CSS box at the device pixel ratio (capped at 2). */
export function fitCanvas(canvas: HTMLCanvasElement): Surface {
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);
  const ctx = canvas.getContext('2d')!;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { w: rect.width, h: rect.height, ctx };
}

export type Pointer = { x: number; y: number; inside: boolean };

export function trackPointer(stage: HTMLElement): Pointer {
  const pointer: Pointer = { x: -999, y: -999, inside: false };
  stage.addEventListener('pointermove', (event) => {
    const rect = stage.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.inside = true;
  });
  stage.addEventListener('pointerleave', () => {
    pointer.inside = false;
    pointer.x = pointer.y = -999;
  });
  return pointer;
}

export type Effect = { build: () => void; frame: (time: number) => void };
