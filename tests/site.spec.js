const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test('homepage loads without errors', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });

  await page.goto('/');

  await expect(page).toHaveTitle(/Jamie Parr/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Jamie Parr');
  expect(errors).toEqual([]);
});

test('every navigation link points to a section on the page', async ({ page }) => {
  await page.goto('/');

  const hrefs = await page.locator('nav a').evaluateAll((links) =>
    links.map((link) => link.getAttribute('href'))
  );

  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) {
    await expect(page.locator(href)).toHaveCount(1);
  }
});

for (const width of [320, 390, 768, 1280]) {
  test(`no horizontal scrolling at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');

    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(overflows).toBe(false);
  });
}

for (const colorScheme of ['light', 'dark']) {
  test(`no accessibility violations in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test('404 page has its heading and a link home', async ({ page }) => {
  await page.goto('/404.html');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');
  await expect(page.getByRole('link', { name: 'Go to the homepage' })).toHaveAttribute('href', '/');
});
