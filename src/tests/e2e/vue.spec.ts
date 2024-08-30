import { test, expect } from '@playwright/test';

test('deve renderizar a página corretamente', async ({ page }) => {
  await page.goto('/');

  const logo = page.locator('img[alt="Logo Aiko"]');
  await expect(logo).toBeVisible();

  const title = page.locator('h1:text("Filtros")');
  await expect(title).toBeVisible();

  const clearFiltersButton = page.locator('button:text("Limpar filtros")');
  await expect(clearFiltersButton).toBeVisible();

  const equipmentSelectButton = page.locator('text=Filtrar por equipamento:');
  await expect(equipmentSelectButton).toBeVisible();

  const statusSelectButton = page.locator('text=Filtrar por status:');
  await expect(statusSelectButton).toBeVisible();

  const legend = page.locator('p:text("Legenda:")');
  await expect(legend).toBeVisible();
});
