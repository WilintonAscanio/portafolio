import { prefersReducedMotion } from './canvas';
import { mountEffect } from './effects';
import { mountTimeline } from './timeline';

const reduce = prefersReducedMotion();

document.querySelectorAll<HTMLElement>('[data-effect]').forEach((stage) => mountEffect(stage));
document.querySelectorAll<HTMLElement>('[data-timeline]').forEach(mountTimeline);

/* Numbers count up once when they first appear. */
const counter = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    counter.unobserve(entry.target);
    if (reduce) continue;
    const el = entry.target as HTMLElement;
    const target = Number(el.dataset.count);
    const start = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / 900);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
});
document.querySelectorAll('[data-count]').forEach((el) => counter.observe(el));

/* Dock marks the section in view. */
const dockLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-dock] a[href^="#"]')];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      dockLinks.forEach((a) => {
        const current = a.hash === `#${entry.target.id}`;
        a.classList.toggle('on', current);
        if (current) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }
  },
  { rootMargin: '-45% 0px -50% 0px' },
);
dockLinks.forEach((a) => {
  const section = document.getElementById(a.hash.slice(1));
  if (section) sectionObserver.observe(section);
});

/* Project preview: a modal dialog filled from the project's <template>, reachable by #id. */
const dialog = document.querySelector<HTMLDialogElement>('[data-preview]')!;
const body = dialog.querySelector<HTMLElement>('[data-preview-body]')!;
const sheet = dialog.querySelector<HTMLElement>('[data-preview-sheet]')!;
let opener: HTMLElement | null = null;
let stopEffect: (() => void) | null = null;

function openPreview(id: string, trigger: HTMLElement | null) {
  const template = document.getElementById(`preview-${id}`) as HTMLTemplateElement | null;
  if (!template) return;
  opener = trigger;
  body.replaceChildren(template.content.cloneNode(true));
  const stage = body.querySelector<HTMLElement>('[data-effect]');
  if (stage) stopEffect = mountEffect(stage);
  sheet.scrollTop = 0;
  dialog.showModal();
  history.replaceState(null, '', `#${id}`);
}

dialog.addEventListener('close', () => {
  stopEffect?.();
  stopEffect = null;
  body.replaceChildren();
  history.replaceState(null, '', location.pathname + location.search);
  opener?.focus();
});
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.querySelector('[data-preview-close]')!.addEventListener('click', () => dialog.close());

document.querySelectorAll<HTMLElement>('[data-project]').forEach((card) => {
  card.addEventListener('click', () => openPreview(card.dataset.project!, card));
});

const initial = location.hash.slice(1);
if (initial) openPreview(initial, document.querySelector(`[data-project="${CSS.escape(initial)}"]`));
