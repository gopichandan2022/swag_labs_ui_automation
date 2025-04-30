require('dotenv').config();

class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator(`//input[@id="user-name"]`);
        this.password = page.locator(`//input[@id="password"]`);
        this.continueButton = page.locator(`//input[@type="submit"]`);
    }

    async goTo(url) {
        await this.page.goto(url);
    }

    async validLogin(userName, password) {
        await this.userName.type(userName);
        await this.password.type(password);
        await this.continueButton.click();
    }
}

module.exports = { LoginPage };
