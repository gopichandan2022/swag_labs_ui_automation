require('dotenv').config();

const { defineConfig, devices } = require('@playwright/test');

const loginInfo = {
  url: process.env.APP_URL,
  userName: process.env.AUTH0_USERNAME,
  password: process.env.AUTH0_PASSWORD
};

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  workers: 1,
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]
});

// Export loginInfo too
module.exports.loginInfo = loginInfo;