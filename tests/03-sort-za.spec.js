const { LoginPage } = require('../page-objects/logInPage');
const { LogoutPage } = require('../page-objects/LogoutPage');
const { ProductsPage } = require('../page-objects/ProductsPage');
const { test, expect } = require('@playwright/test');
const { loginInfo } = require('../playwright.config');

test.describe("Validate Z-A Sorting Functionality", () => {
  let loginPage;
  let productsPage;
  let logoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    logoutPage = new LogoutPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.goTo(loginInfo.url);
  });

  test("User can login and sort by name (Z-A)", async ({ page }) => {
    await loginPage.validLogin(loginInfo.userName, loginInfo.password);

    const logoElement = await page.waitForSelector('//div[@class="app_logo"]', { timeout: 10000 });
    expect(await logoElement.isVisible()).toBe(true);

    await productsPage.sortBy('za');

    const itemNames = await productsPage.getItemNames();
    console.log('Item Names (UI):', itemNames);

    const sortedNames = [...itemNames].sort().reverse();
    console.log('Expected Z-A Order:', sortedNames);

    for (let i = 0; i < itemNames.length; i++) {
      expect(itemNames[i]).toBe(sortedNames[i]);
    }
  });
   // logout after each test
   test.afterEach(async () => {
    await logoutPage.logout();
  });
});