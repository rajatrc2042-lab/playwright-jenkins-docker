// @ts-check
import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test('has title @smoke', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  await allure.tag('Smoke');
});



test('Login', async ({ page }) => {

    await allure.owner('Raj');

    await allure.severity('critical');

    await allure.tag('Smoke');

});

test('get started link @smoke', async ({ page }) => {
  await page.goto('/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Instalvastion' })).toBeVisible();

  await test.info().attach(
    'Screenshot',
    {
        body: await page.screenshot(),
        contentType: 'image/png'
    }
);
});



// await page.fill('#username', process.env.USERNAME!);     //for cred use from jenkins
// await page.fill('#password', process.env.PASSWORD!);
