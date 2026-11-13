import { prefersReducedMotion } from './canvas';

/* Scroll behaviour for the whole page: the journey line fills as you read, blocks rise in once,
   and cover phones drift against their browser frames. Under reduced motion only the line fill stays. */
const reduce = prefersReducedMotion();
const journey = document.querySelector<HTMLElement>('[data-journey]');
const track = journey?.querySelector<HTMLElement>('.journey__track');
const fill = journey?.querySelector<HTMLElement>('[data-fill]');
const items = journey ? [...journey.querySelectorAll<HTMLElement>('.journey__item')] : [];
const year = journey?.querySelector<HTMLElement>('[data-year]');
const drifting = reduce ? [] : [...document.querySelectorAll<HTMLElement>('main .cover--landing .phone, main .cover--landing .browser')];

if (!reduce) {
  document.documentElement.classList.add('reveal-ready');
  const reveal = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in');
        reveal.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px' },
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => reveal.observe(el));
}

let queued = false;
function update() {
  queued = false;
  const vh = innerHeight;
  if (track && fill) {
    const box = track.getBoundingClientRect();
    // The line tip sits at 60% of the screen height.
    const reached = Math.max(0, Math.min(box.height, vh * 0.6 - box.top));
    fill.style.height = `${reached}px`;
    let current = items[0];
    for (const item of items) {
      const on = item.getBoundingClientRect().top - box.top <= reached;
      item.classList.toggle('on', on);
      if (on) current = item;
    }
    // The big year follows the last stop reached; the class restarts its roll-in.
    if (year && current && year.textContent !== current.dataset.year) {
      year.textContent = current.dataset.year!;
      year.classList.remove('roll');
      void year.offsetWidth;
      year.classList.add('roll');
    }
  }
  for (const el of drifting) {
    const cover = el.closest('.cover')!.getBoundingClientRect();
    if (cover.bottom < 0 || cover.top > vh) continue;
    const offset = cover.top + cover.height / 2 - vh / 2;
    el.style.translate = `0 ${offset * (el.classList.contains('phone') ? -0.08 : 0.025)}px`;
  }
}
function queue() {
  if (!queued) {
    queued = true;
    requestAnimationFrame(update);
  }
}
addEventListener('scroll', queue, { passive: true });
addEventListener('resize', queue);
update();
