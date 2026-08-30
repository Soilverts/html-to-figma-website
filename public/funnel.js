(() => {
  const script = document.currentScript;
  if (!(script instanceof HTMLScriptElement)) return;

  const productionHost = location.hostname === 'html2design.com' ||
    location.hostname === 'www.html2design.com';
  const checkoutApi = 'https://api.html2design.com/v1/checkout';

  function emit(event, source, plan) {
    if (!productionHost || !event || !source) return;
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

  document.addEventListener('click', async (event) => {
    if (!(event.target instanceof Element)) return;
    const checkout = event.target.closest('[data-funnel-checkout]');
    if (!(checkout instanceof HTMLAnchorElement)) return;
    const source = checkout.dataset.funnelSource;
    const plan = checkout.dataset.funnelPlan;
    if (
      !['website_home', 'website_pricing'].includes(source || '') ||
      !['monthly', 'yearly'].includes(plan || '')
    ) return;

    event.preventDefault();
    if (checkout.getAttribute('aria-busy') === 'true') return;
    checkout.setAttribute('aria-busy', 'true');
    const checkoutWindow = window.open('about:blank', '_blank');
    if (checkoutWindow) checkoutWindow.opener = null;
    emit(
      'checkout_click',
      source,
      plan
    );

    const openCheckout = (url) => {
      if (checkoutWindow && !checkoutWindow.closed) {
        checkoutWindow.location.replace(url);
      } else {
        location.assign(url);
      }
    };

    try {
      const response = await fetch(
        `${checkoutApi}/${plan}?source=${encodeURIComponent(source)}`,
        { method: 'POST', headers: { Accept: 'application/json' } }
      );
      if (!response.ok) throw new Error(`Checkout returned ${response.status}`);
      const payload = await response.json();
      const checkoutUrl = new URL(payload.checkoutUrl);
      if (
        checkoutUrl.protocol !== 'https:' ||
        checkoutUrl.hostname !== 'pancake.waffo.ai'
      ) throw new Error('Invalid checkout URL');
      openCheckout(checkoutUrl.href);
    } catch {
      // The un-attributed GET remains a resilient fallback for real clicks.
      openCheckout(checkout.href);
    } finally {
      checkout.removeAttribute('aria-busy');
    }
  });
})();
