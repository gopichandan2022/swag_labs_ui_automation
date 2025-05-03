const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/logInPage');
const { ProductsPage } = require('../page-objects/ProductsPage');
const { LogoutPage } = require('../page-objects/LogoutPage');
const { itemsToAdd, checkoutInfo } = require('../testData/iteamsList');
const { loginInfo } = require('../playwright.config');

test.describe("Add Items and Complete Checkout", () => {
  let loginPage;
  let productsPage;
  let logoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    logoutPage = new LogoutPage(page);
    await loginPage.goTo(loginInfo.url);
  });

  test("User adds items to cart and completes checkout", async () => {
    await loginPage.validLogin(loginInfo.userName, loginInfo.password);

    for (const item of itemsToAdd) {
      await productsPage.addItemToCart(item);
    }

    await productsPage.goToCart();

    for (const item of itemsToAdd) {
      await productsPage.verifyItemInCart(item);
    }

    await productsPage.startCheckout();
    await productsPage.fillCheckoutInfo(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );

    for (const item of itemsToAdd) {
      await productsPage.verifyItemOnOverviewPage(item);
    }

    await productsPage.finishOrder();
    await productsPage.verifyOrderConfirmation();
    await productsPage.backToProducts();
  });

  test.afterEach(async () => {
    await logoutPage.logout();
  });
});
