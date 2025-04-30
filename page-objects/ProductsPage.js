// C:\rtCamp\PlaywrightAutomation\page-objects\ProductsPage.js

class ProductsPage {
    constructor(page) {
      this.page = page;
      this.sortDropdown = '.product_sort_container';
      this.itemNameLocator = '//div[@class="inventory_item"]/descendant::div[@class="inventory_item_name "]';
      this.itemPriceLocator = '//div[@class="inventory_item"]/descendant::div[@class="inventory_item_price"]';
    }
  
    async sortBy(optionValue) {
      await this.page.selectOption(this.sortDropdown, { value: optionValue });
    }
  
    async getItemNames() {
      await this.page.waitForSelector(this.itemNameLocator);
      const elements = await this.page.$$(this.itemNameLocator);
      const totalItems = elements.length;
      console.log(`Total items found: ${totalItems}`);
  
      const itemNames = [];
      for (let i = 1; i <= totalItems; i++) {
        const selector = `(${this.itemNameLocator})[${i}]`;
        const text = await this.page.locator(selector).textContent();
        itemNames.push(text.trim());
      }
  
      return itemNames;
    }
  
    async getItemPrices() {
      await this.page.waitForSelector(this.itemPriceLocator);
      const elements = await this.page.$$(this.itemPriceLocator);
      const totalItems = elements.length;
      console.log(`Total items found: ${totalItems}`);
  
      const prices = [];
      for (let i = 1; i <= totalItems; i++) {
        const selector = `(${this.itemPriceLocator})[${i}]`;
        const text = await this.page.locator(selector).textContent();
        prices.push(parseFloat(text.replace('$', '').trim()));
      }
  
      return prices;
    }
  }
  
  module.exports = { ProductsPage };  