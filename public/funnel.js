(() => {
  const script = document.currentScript;
  if (!(script instanceof HTMLScriptElement)) return;

  const event = script.dataset.event;
  const source = script.dataset.source;
  const productionHost = location.hostname === 'html2design.com' ||
    location.hostname === 'www.html2design.com';
  if (!productionHost || !event || !source) return;

  const sessionKey = `html2design:funnel:${event}:${source}`;
  try {
    if (sessionStorage.getItem(sessionKey)) return;
    sessionStorage.setItem(sessionKey, '1');
  } catch {
    // Continue without session deduplication when storage is unavailable.
  }

  fetch('https://api.html2design.com/v1/telemetry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, source }),
    keepalive: true,
  }).catch(() => {
    // Analytics must never interfere with page rendering or checkout.
  });
})();
