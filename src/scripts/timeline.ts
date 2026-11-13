/** Timeline cursor: follows the pointer, drags on touch, steps with the keyboard; rows active that month light up. */
export function mountTimeline(root: HTMLElement) {
  const chart = root.querySelector<HTMLElement>('[data-chart]')!;
  const cursor = root.querySelector<HTMLElement>('[data-cursor]')!;
  const read = root.querySelector<HTMLElement>('[data-read]')!;
  const rows = [...root.querySelectorAll<HTMLElement>('.tl-row')];
  const total = Number(root.dataset.total);
  const [y0, m0] = root.dataset.start!.split('-').map(Number);
  const fmt = new Intl.DateTimeFormat(root.dataset.lang === 'es' ? 'es-CO' : 'en-US', { month: 'long', year: 'numeric' });
  let month = total;

  function set(next: number) {
    month = Math.max(0, Math.min(total, Math.round(next)));
    const date = fmt.format(new Date(y0, m0 - 1 + month, 15));
    const titles: string[] = [];
    rows.forEach((row) => {
      // A role that ends in a month counts for that month, so March 2025 shows both jobs.
      const on = month >= Number(row.dataset.from) && month <= Number(row.dataset.to);
      row.classList.toggle('on', on);
      if (on) titles.push(row.dataset.title!);
    });
    const what = titles.join(' · ') || root.dataset.none!;
    const x = month / total;
    cursor.style.left = `${x * 100}%`;
    read.classList.toggle('flip', x > 0.6);
    read.innerHTML = '';
    read.append(Object.assign(document.createElement('b'), { textContent: date[0].toUpperCase() + date.slice(1) }), what);
    cursor.setAttribute('aria-valuenow', String(month));
    cursor.setAttribute('aria-valuetext', `${date}: ${what}`);
  }

  const fromPointer = (event: PointerEvent) => {
    const box = chart.getBoundingClientRect();
    set(((event.clientX - box.left) / box.width) * total);
  };
  chart.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'mouse' || chart.hasPointerCapture(event.pointerId)) fromPointer(event);
  });
  chart.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse') chart.setPointerCapture(event.pointerId);
    fromPointer(event);
  });
  cursor.addEventListener('keydown', (event) => {
    const step = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1, PageDown: -12, PageUp: 12 }[event.key];
    if (step) set(month + step);
    else if (event.key === 'Home') set(0);
    else if (event.key === 'End') set(total);
    else return;
    event.preventDefault();
  });
  set(total);
}
