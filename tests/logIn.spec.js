const { LoginPage } = require('../page-objects/logInPage');
const { LogoutPage } = require('../page-objects/LogoutPage');
const { test, expect } = require('@playwright/test');
const { loginInfo } = require('../playwright.config');

test.describe("==1 -Validate Login Functionality", () => {

  let loginPage;
  let logoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    logoutPage = new LogoutPage(page);
    await loginPage.goTo(loginInfo.url);
  });

  test("User can login with valid credentials", async ({ page }) => {
    await loginPage.validLogin(loginInfo.userName, loginInfo.password);

    const logoElement = await page.waitForSelector('//div[@class="app_logo"]', { timeout: 10000 });
    expect(await logoElement.isVisible()).toBe(true);
  });

  // logout after each test
  test.afterEach(async () => {
    await logoutPage.logout();
  });
});
