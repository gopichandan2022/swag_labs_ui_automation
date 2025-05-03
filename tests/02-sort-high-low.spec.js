const { LoginPage } = require('../page-objects/logInPage');
const { ProductsPage } = require('../page-objects/ProductsPage');
const { test, expect } = require('@playwright/test');
const { loginInfo } = require('../playwright.config');
const { LogoutPage } = require('../page-objects/LogoutPage');

test.describe("Validate Price Sorting Functionality", () => {
  let loginPage;
  let productsPage;
  let logoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    logoutPage = new LogoutPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.goTo(loginInfo.url);
  });

  test("User can login and sort by price (high to low)", async ({ page }) => {
    await loginPage.validLogin(loginInfo.userName, loginInfo.password);

    const logoElement = await page.waitForSelector('//div[@class="app_logo"]', { timeout: 10000 });
    expect(await logoElement.isVisible()).toBe(true);

    await productsPage.sortBy('hilo');

    const prices = await productsPage.getItemPrices();
    console.log('Prices from UI:', prices);

    const sortedPrices = [...prices].sort((a, b) => b - a);
    console.log('Expected High to Low Prices:', sortedPrices);

    for (let i = 0; i < prices.length; i++) {
      expect(prices[i]).toBe(sortedPrices[i]);
    }
  });

   // logout after each test
   test.afterEach(async () => {
    await logoutPage.logout();
  });
});