(() => {
  const script = document.currentScript;
  if (!(script instanceof HTMLScriptElement)) return;

  const productionHost = location.hostname === 'html2design.com' ||
    location.hostname === 'www.html2design.com';
  if (!productionHost) return;

  function emit(event, source, plan) {
    if (!event || !source) return;
    const sessionKey = `html2design:funnel:${event}:${source}:${plan || ''}`;
    try {
      if (sessionStorage.getItem(sessionKey)) return;
      sessionStorage.setItem(sessionKey, '1');
    } catch {
      // Continue without session deduplication when storage is unavailable.
    }

    fetch('https://api.html2design.com/v1/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, source, ...(plan ? { plan } : {}) }),
      keepalive: true,
    }).catch(() => {
      // Analytics must never interfere with page rendering or checkout.
    });
  }

  emit(script.dataset.event, script.dataset.source);

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const checkout = event.target.closest('[data-funnel-checkout]');
    if (!(checkout instanceof HTMLElement)) return;
    emit(
      'checkout_click',
      checkout.dataset.funnelSource,
      checkout.dataset.funnelPlan
    );
  });
})();
