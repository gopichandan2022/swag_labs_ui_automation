 const { expect } = require('@playwright/test');

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.sortDropdown = '.product_sort_container';
    this.itemNameLocator = '//div[@class="inventory_item"]/descendant::div[@class="inventory_item_name "]';
    this.itemPriceLocator = '//div[@class="inventory_item"]/descendant::div[@class="inventory_item_price"]';

    this.cartIcon = '//a[@class="shopping_cart_link"]';
    this.checkoutButton = '//button[@id="checkout"]';
    this.firstNameInput = '//input[@id="first-name"]';
    this.lastNameInput = '//input[@id="last-name"]';
    this.postalCodeInput = '//input[@id="postal-code"]';
    this.continueButton = '//input[@id="continue"]';
    this.finishButton = '//button[@id="finish"]';
    this.orderConfirmationMessage = `//h2[normalize-space(text())='Thank you for your order!']`;
    this.backToProductsButton = '//button[@id="back-to-products"]';
  }

  async sortBy(optionValue) {
    await this.page.selectOption(this.sortDropdown, { value: optionValue });
  }

  async getItemNames() {
    await this.page.waitForSelector(this.itemNameLocator);
    const elements = await this.page.$$(this.itemNameLocator);
    const itemNames = [];

    for (let i = 1; i <= elements.length; i++) {
      const text = await this.page.locator(`(${this.itemNameLocator})[${i}]`).textContent();
      itemNames.push(text.trim());
    }

    return itemNames;
  }

  async getItemPrices() {
    await this.page.waitForSelector(this.itemPriceLocator);
    const elements = await this.page.$$(this.itemPriceLocator);
    const prices = [];

    for (let i = 1; i <= elements.length; i++) {
      const text = await this.page.locator(`(${this.itemPriceLocator})[${i}]`).textContent();
      prices.push(parseFloat(text.replace('$', '').trim()));
    }

    return prices;
  }

  async addItemToCart(itemName) {
    const itemId = itemName.toLowerCase().replaceAll(" ", "-");
    await this.page.locator(`//button[@id="add-to-cart-${itemId}"]`).click();
  }

  async goToCart() {
    await this.page.click(this.cartIcon);
  }

  async verifyItemInCart(itemName) {
    const locator = this.page.locator(`//div[text()="${itemName}"]`);
    await expect(locator).toBeVisible();
  }

  async startCheckout() {
    await this.page.click(this.checkoutButton);
  }

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
  }

  async verifyItemOnOverviewPage(itemName) {
    const locator = this.page.locator(`//div[text()="${itemName}"]`);
    await expect(locator).toBeVisible();
  }

  async finishOrder() {
    await this.page.click(this.finishButton);
  }

  async verifyOrderConfirmation() {
    await expect(this.page.locator(this.orderConfirmationMessage)).toBeVisible();
  }

  async backToProducts() {
    await this.page.click(this.backToProductsButton);
  }
}

module.exports = { ProductsPage };