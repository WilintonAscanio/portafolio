/** Sends the contact form without leaving the page; without this script it still posts normally. */
const form = document.querySelector<HTMLFormElement>('[data-contact]');

if (form) {
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const message = form.querySelector<HTMLTextAreaElement>('[data-message]')!;
  form.querySelector<HTMLInputElement>('[data-started]')!.value = String(Date.now());

  // Each motive suggests what to write.
  form.addEventListener('change', (event) => {
    const input = event.target as HTMLInputElement;
    if (input.name === 'motive') message.placeholder = input.dataset.hint ?? '';
  });

  const show = (text: string, tone: 'ok' | 'error' | '') => {
    status.textContent = text;
    status.dataset.tone = tone;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    submit.disabled = true;
    show(form.dataset.sending!, '');
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (response.ok) {
        form.reset();
        form.querySelector<HTMLInputElement>('[data-started]')!.value = String(Date.now());
        show(form.dataset.sent!, 'ok');
      } else if (response.status === 429) show(form.dataset.rate!, 'error');
      else if (response.status === 400) show(form.dataset.invalid!, 'error');
      else show(form.dataset.failed!, 'error');
    } catch {
      show(form.dataset.failed!, 'error');
    } finally {
      submit.disabled = false;
    }
  });
}
