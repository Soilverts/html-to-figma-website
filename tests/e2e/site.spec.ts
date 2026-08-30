import { createHash } from 'node:crypto';
import { expect, test, type Page, type Response } from '@playwright/test';

const FIGMA_PLUGIN = 'https://www.figma.com/community/plugin/1591359863857120491/';
const LINEA_FIXTURE = 'https://html2design-linea-fixture.pages.dev/';
const LINEA_SOURCE_SHA256 = 'a19db59ac6a211835c84b25bfaa392ea210e60857bdbef5e9fc186c9482d478b';
const IS_LIVE = process.env.PLAYWRIGHT_BASE_URL === 'https://html2design.com';

test.beforeEach(async ({ page }) => {
  if (!IS_LIVE) return;
  await page.route('https://api.html2design.com/v1/telemetry', async (route) => {
    await route.fulfill({ status: 204 });
  });
});

function watchPageErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message: { type: () => string; text: () => string }) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error: Error) => errors.push(error.message));
  return errors;
}

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

test('homepage exposes the install path and loads sections on intent', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors = watchPageErrors(page);
  const requestedUrls: string[] = [];
  page.on('request', (request) => requestedUrls.push(request.url()));

  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle('HTML to Figma Plugin - Import a Website URL or HTML');
  await expect(
    page.getByRole('heading', { level: 1, name: 'HTML to Figma. Pixel or editable.', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Install HTML to Figma plugin' })).toHaveAttribute('href', new RegExp(`^${FIGMA_PLUGIN}`));
  await expect(page.getByRole('link', { name: 'See real results' })).toHaveAttribute('href', '/result-quality');
  expect(await page.locator('h1').evaluate((element) => getComputedStyle(element).animationName)).toBe('none');
  expect(await page.locator('link[rel="preload"][href="/index.css"]').count()).toBe(0);
  expect(requestedUrls.some((url) => url.endsWith('/index.css'))).toBe(false);
  expect(requestedUrls.some((url) => /\/assets\/(?:proxy|vendor-framer)-/.test(url))).toBe(false);
  await expectNoHorizontalOverflow(page);

  await page.mouse.wheel(0, 700);
  await expect(page.locator('#features')).toBeAttached();
  await expect(page.locator('#features h2')).toContainText('Retain the soul of your architecture.');
  await expect(page.getByRole('link', { name: 'public URL workflow' })).toHaveAttribute('href', '/use-cases/url-to-figma');
  await expect.poll(() => requestedUrls.some((url) => /\/assets\/(?:proxy|vendor-framer)-/.test(url))).toBe(true);
  await expect(page.locator('#pricing')).toBeAttached({ timeout: 15_000 });
  await expect(page.getByRole('link', { name: 'Buy monthly — $12' })).toHaveAttribute(
    'href',
    'https://api.html2design.com/v1/checkout/monthly',
  );
  await expect(page.getByRole('link', { name: 'Buy monthly — $12' })).toHaveAttribute(
    'data-funnel-source',
    'website_home',
  );
  await expect(page.getByRole('link', { name: 'Buy annual — $96' })).toHaveAttribute(
    'href',
    'https://api.html2design.com/v1/checkout/yearly',
  );
  expect(errors).toEqual([]);
});

test('homepage renders its complete content without requiring user interaction', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#features')).toBeAttached({ timeout: 5_000 });
  await expect(page.locator('#pricing')).toBeAttached({ timeout: 15_000 });
  await expect(page.locator('#faq')).toBeAttached({ timeout: 15_000 });
});

test('priority search intents resolve to distinct pages', async ({ page, request }) => {
  const homepage = await (await request.get('/')).text();
  expect(homepage).not.toContain('html.to.design');

  await page.goto('/guide');
  await expect(page).toHaveTitle('HTML to Figma Plugin Guide: Import HTML or Websites');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('HTML to Figma Plugin Guide: Import HTML or Websites');
  await expect(page.getByRole('link', { name: 'HTML to Figma plugin on Figma Community' }).first()).toHaveAttribute(
    'href',
    new RegExp(`^${FIGMA_PLUGIN}`),
  );

  await page.goto('/alternatives');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Best html.to.design Alternatives');
  await expect(page.getByRole('link', { name: 'html2design vs html.to.design', exact: true }).first()).toHaveAttribute(
    'href',
    '/compare/html2design-vs-html-to-design',
  );
});

test('pricing makes the manual trial explicit and attributes only user-initiated checkout', async ({ page }) => {
  await page.goto('/pricing');

  await expect(page.getByRole('link', { name: /Start monthly/ })).toHaveAttribute(
    'href',
    'https://api.html2design.com/v1/checkout/monthly',
  );
  await expect(page.getByRole('link', { name: /Choose annual/ })).toHaveAttribute(
    'href',
    'https://api.html2design.com/v1/checkout/yearly',
  );
  await expect(page.getByRole('link', { name: /Try 10 manual imports free/ })).toHaveAttribute(
    'href',
    new RegExp(`^${FIGMA_PLUGIN}`),
  );
  await expect(page.getByRole('link', { name: /Start monthly/ })).toHaveAttribute(
    'data-funnel-plan',
    'monthly',
  );
  const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(schema.join('\n')).not.toContain('api.html2design.com/v1/checkout');
  await expect(page.locator('body')).toContainText('Public URL capture requires Pro');
  await expect(page.locator('script[data-event="pricing_view"][data-source="website_pricing"]')).toHaveCount(1);
});

test('pricing creates checkout with POST only after a real click', async ({ page }) => {
  let checkoutMethod = '';
  await page.route('https://pancake.waffo.ai/e2e-checkout', async (route) => {
    await route.fulfill({ status: 200, contentType: 'text/html', body: '<h1>Checkout ready</h1>' });
  });
  await page.route('https://api.html2design.com/v1/checkout/monthly?source=website_pricing', async (route) => {
    checkoutMethod = route.request().method();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ checkoutUrl: 'https://pancake.waffo.ai/e2e-checkout#checkout-ready' }),
    });
  });
  await page.goto('/pricing');

  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: /Start monthly/ }).click();
  const popup = await popupPromise;

  await expect.poll(() => checkoutMethod).toBe('POST');
  await popup.waitForURL(/#checkout-ready/);
  expect(popup.url()).toContain('#checkout-ready');
  await expect(page).toHaveURL(/\/pricing$/);
});

test('mobile homepage keeps the hero and menu usable', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const errors = watchPageErrors(page);
  await page.goto('/');

  const headingBox = await page.getByRole('heading', { level: 1 }).boundingBox();
  expect(headingBox?.y).toBeLessThan(300);
  const menu = page.getByRole('button', { name: 'Open menu' });
  const menuBox = await menu.boundingBox();
  expect(menuBox?.width).toBeGreaterThanOrEqual(48);
  expect(menuBox?.height).toBeGreaterThanOrEqual(48);

  await menu.click();
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
  expect(await page.locator('body').evaluate((element) => getComputedStyle(element).overflow)).toBe('hidden');
  await expect(page.getByRole('link', { name: 'Guide', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  await expectNoHorizontalOverflow(page);
  expect(errors).toEqual([]);
});

test('key static pages have canonical metadata, responsive headers, and no runtime errors', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const routes = [
    '/use-cases/url-to-figma',
    '/use-cases/claude-to-figma',
    '/use-cases/developer-handoff',
    '/use-cases/tailwind-to-figma',
    '/guide',
    '/pricing',
    '/result-quality',
    '/blog/import-website-into-figma',
    '/use-cases/bolt-to-figma',
    '/use-cases/lovable-to-figma',
  ];

  for (const route of routes) {
    const errors = watchPageErrors(page);
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    expect(await page.title(), route).not.toBe('');
    await expect(page.locator('link[rel="canonical"]'), route).toHaveAttribute('href', `https://html2design.com${route}`);
    expect(await page.locator('h1').count(), route).toBe(1);
    await expect(page.locator('h1'), route).toBeVisible();
    const headerCta = page.locator('body > nav.fixed a').last();
    const ctaBox = await headerCta.boundingBox();
    expect(ctaBox?.height, route).toBeGreaterThanOrEqual(48);
    expect(await headerCta.evaluate((element) => getComputedStyle(element).whiteSpace), route).toBe('nowrap');
    const mobileHiddenLinks = page.locator('body > nav.fixed a.hidden');
    for (let index = 0; index < await mobileHiddenLinks.count(); index += 1) {
      await expect(mobileHiddenLinks.nth(index), route).toBeHidden();
    }
    await expectNoHorizontalOverflow(page);
    expect(errors, route).toEqual([]);
  }
});

test('manual import guidance stays consistent across high-intent pages', async ({ request }) => {
  const routes = [
    '/guide',
    '/faq',
    '/alternatives',
    '/use-cases/claude-to-figma',
    '/use-cases/developer-handoff',
    '/use-cases/bolt-to-figma',
    '/use-cases/lovable-to-figma',
    '/use-cases/chatgpt-to-figma',
    '/use-cases/cursor-to-figma',
    '/use-cases/v0-to-figma',
    '/use-cases/vue-to-figma',
    '/use-cases/storybook-to-figma',
    '/use-cases/tailwind-to-figma',
    '/blog/how-to-convert-html-to-figma',
    '/blog/convert-website-to-figma',
    '/blog/import-website-into-figma',
    '/blog/react-component-to-figma',
    '/blog/tailwind-to-figma',
    '/blog/webflow-to-figma',
  ];
  const completeDocumentRoutes = new Set([
    '/use-cases/claude-to-figma',
    '/use-cases/developer-handoff',
    '/use-cases/bolt-to-figma',
    '/use-cases/lovable-to-figma',
    '/use-cases/chatgpt-to-figma',
    '/use-cases/cursor-to-figma',
    '/use-cases/v0-to-figma',
    '/use-cases/vue-to-figma',
    '/use-cases/storybook-to-figma',
    '/use-cases/tailwind-to-figma',
    '/blog/react-component-to-figma',
  ]);

  for (const route of routes) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
    const html = await response.text();
    expect(html, route).not.toMatch(/all computed styles are included|every computed style transfers/i);
    expect(html, route).not.toMatch(/html2design chrome extension|chrome extension mode/i);
    if (completeDocumentRoutes.has(route)) {
      expect(html, route).not.toMatch(/copy\s*(?:>|&gt;|→)\s*copy outerhtml|copy the rendered html|paste outerhtml to import/i);
    }
  }

  const guide = await (await request.get('/guide')).text();
  expect(guide).toContain('does not embed external CSS');

  const claude = await (await request.get('/use-cases/claude-to-figma')).text();
  expect(claude).toContain('Claude Design to Figma: HTML Export or Figma MCP');
  expect(claude).toContain('standalone HTML');
  expect(claude).toContain('support.claude.com/en/articles/14604416-get-started-with-claude-design');

  const handoff = await (await request.get('/use-cases/developer-handoff')).text();
  expect(handoff).toContain('Figma Design Handoff from HTML');
  expect(handoff).toContain('static snapshot, not a live connection to source code');

  const tailwind = await (await request.get('/use-cases/tailwind-to-figma')).text();
  expect(tailwind).toContain('Convert Tailwind CSS to Figma: URL or Complete HTML');
  expect(tailwind).toContain('compiled Tailwind stylesheet');
});

test('result evidence and sitemap remain inspectable', async ({ page, request }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/result-quality');
  await expect(page.getByRole('link', { name: /Open the exact input/ })).toHaveAttribute('href', LINEA_FIXTURE);
  await expect(page.getByRole('link', { name: /Read the evidence manifest/ })).toHaveAttribute(
    'href',
    '/results/linea/evidence.json',
  );
  await page.getByRole('link', { name: /View the side-by-side evidence/ }).click();
  await expect(page.locator('#side-by-side')).toBeInViewport();

  const images = page.locator('#side-by-side img');
  await expect(images).toHaveCount(2);
  for (let index = 0; index < 2; index += 1) {
    const image = images.nth(index);
    await expect(image).toBeVisible();
    const dimensions = await image.evaluate((element: HTMLImageElement) => ({
      complete: element.complete,
      naturalWidth: element.naturalWidth,
      renderedWidth: element.getBoundingClientRect().width,
    }));
    expect(dimensions.complete).toBe(true);
    expect(dimensions.naturalWidth).toBe(1425);
    expect(dimensions.renderedWidth).toBeLessThanOrEqual(dimensions.naturalWidth);
  }
  await expect(page.getByRole('link', { name: 'Open the full browser source preview' })).toHaveAttribute(
    'href',
    '/results/linea/browser-full.webp',
  );
  await expect(page.getByRole('link', { name: 'Open the full editable Figma result preview' })).toHaveAttribute(
    'href',
    '/results/linea/figma-editable-full.webp',
  );

  for (const preview of ['/results/linea/browser-full.webp', '/results/linea/figma-editable-full.webp']) {
    const previewResponse = await request.get(preview);
    expect(previewResponse.status(), preview).toBe(200);
    expect((await previewResponse.body()).byteLength, preview).toBeLessThan(1_000_000);
  }

  const sitemapResponse = await request.get('/sitemap.xml');
  expect(sitemapResponse.status()).toBe(200);
  const sitemap = await sitemapResponse.text();
  expect([...sitemap.matchAll(/<loc>/g)]).toHaveLength(92);
  expect(sitemap).not.toMatch(/<(?:priority|changefreq)>/);
  expect(sitemap).not.toContain('/llms-full.txt');
  expect(sitemap).not.toContain('/.well-known/ai-plugin.json');
  expect(sitemap).not.toContain('/blog/feed.xml');

  const evidenceResponse = await request.get('/results/linea/evidence.json');
  expect(evidenceResponse.status()).toBe(200);
  const evidence = await evidenceResponse.json();
  expect(evidence.source.url).toBe(LINEA_FIXTURE);
  expect(evidence.source.screenshot.path).toBe('/results/linea/browser-full.png');
  expect(evidence.source.screenshot.sha256).toBe(LINEA_SOURCE_SHA256);
  expect(evidence.output.screenshot.path).toBe('/results/linea/figma-editable-full.png');
  expect(evidence.output.layers).toEqual({ selectable: 90, text: 57, image: 16 });
  expect(evidence.verification.fresh_figma_export_matches_published_output).toEqual({
    sha256_equal: true,
    rmse: 0,
  });
});

test('review page presents product evidence rather than internal test metrics', async ({ page }) => {
  await page.goto('/reviews');

  await expect(page.getByRole('heading', { name: 'Inspect the actual output' })).toBeVisible();
  await expect(page.locator('body')).not.toContainText('75 unit tests');
  await expect(page.locator('body')).not.toContainText('statement and branch coverage');
});

test('comparison and current-product pages stay factual and responsive', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const routes = [
    '/alternatives',
    '/compare',
    '/compare/html2design-vs-html-to-design',
    '/compare/html2design-vs-anima',
    '/blog/figma-ai-2026',
    '/blog/html-to-figma-tools-compared',
  ];

  for (const route of routes) {
    const errors = watchPageErrors(page);
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator('h1'), route).toBeVisible();
    await expectNoHorizontalOverflow(page);
    expect(errors, route).toEqual([]);
  }

  await page.goto('/alternatives');
  await expect(page.getByRole('heading', { name: '7 HTML to Figma Alternatives to Evaluate' })).toBeVisible();

  await page.goto('/compare/html2design-vs-anima');
  await expect(page.getByRole('link', { name: /Anima's official announcement/ })).toHaveAttribute(
    'href',
    /animaapp\.com\/blog\/ai-design-en\/figma-import-image-html-code-to-layers/,
  );
  await expect(page.locator('body')).not.toContainText('Anima is not designed for importing HTML');

  await page.goto('/blog/figma-ai-2026');
  await expect(page.getByRole('link', { name: 'official Chrome extension' })).toHaveAttribute(
    'href',
    'https://www.figma.com/downloads/chrome-extension/',
  );
  await expect(page.locator('body')).not.toContainText('Figma AI cannot import');

  await page.goto('/blog/html-to-figma-tools-compared');
  await expect(page.getByRole('heading', { name: /Tool 3: Figma Chrome Extension/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Tool 5: html.to.design/ })).toBeVisible();
});

test('production redirects protocol and www variants to the canonical host', async ({ request }) => {
  test.skip(!IS_LIVE, 'Canonical hostname redirects are only available in production.');

  const [rootResponse, pathResponse, httpResponse] = await Promise.all([
    request.get('https://www.html2design.com/', { maxRedirects: 0 }),
    request.get('https://www.html2design.com/result-quality?source=e2e', { maxRedirects: 0 }),
    request.get('http://www.html2design.com/result-quality?source=e2e'),
  ]);

  expect(rootResponse.status()).toBe(301);
  expect(rootResponse.headers().location).toBe('https://html2design.com/');
  expect(pathResponse.status()).toBe(301);
  expect(pathResponse.headers().location).toBe('https://html2design.com/result-quality?source=e2e');
  expect(httpResponse.status()).toBe(200);
  expect(httpResponse.url()).toBe('https://html2design.com/result-quality?source=e2e');
});

test('published LINEA fixture remains exact and excluded from indexing', async ({ browser }) => {
  test.skip(!IS_LIVE, 'The published conversion fixture is only verified against production.');

  let fixturePage: Page | undefined;
  let fixtureResponse: Response | null = null;
  let errors: string[] = [];

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const candidate = await browser.newPage({ viewport: { width: 1425, height: 900 }, deviceScaleFactor: 1 });
    const candidateErrors = watchPageErrors(candidate);
    const response = await candidate.goto(LINEA_FIXTURE, { waitUntil: 'networkidle' }).catch(() => null);
    if (response?.status() === 200) {
      fixturePage = candidate;
      fixtureResponse = response;
      errors = candidateErrors;
      break;
    }
    await candidate.close();
    await new Promise((resolve) => setTimeout(resolve, 1_500));
  }

  expect(fixturePage).toBeDefined();
  expect(fixtureResponse?.status()).toBe(200);
  if (!fixturePage || !fixtureResponse) return;

  expect(fixtureResponse.headers()['x-robots-tag']).toContain('noindex');
  await expect(fixturePage.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await fixturePage.locator('img').evaluateAll(async (images: HTMLImageElement[]) => {
    await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
  });
  expect(await fixturePage.evaluate(() => document.documentElement.scrollHeight)).toBe(4321);
  await expectNoHorizontalOverflow(fixturePage);

  const screenshot = await fixturePage.screenshot({ fullPage: true, animations: 'disabled' });
  expect(createHash('sha256').update(screenshot).digest('hex')).toBe(LINEA_SOURCE_SHA256);
  expect(errors).toEqual([]);
  await fixturePage.close();
});
