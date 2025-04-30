class LogoutPage {
    constructor(page) {
      this.page = page;
      this.menuButton = page.locator('//button[@id="react-burger-menu-btn"]');
      this.logoutLink = page.locator('//a[@id="logout_sidebar_link"]');
    }
  
    async logout() {
      await this.menuButton.click();
      await this.logoutLink.waitFor({ state: 'visible', timeout: 5000 });
      await this.logoutLink.click();
    }
  }
  
  module.exports = { LogoutPage };
  