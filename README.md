# Playwright Automation Suite for SauceDemo

This repository contains a Playwright-based automation test suite for the [SauceDemo](https://www.saucedemo.com/) application.

## Automated Scenarios

### Core Functional Tests
- Verify the sorting order displayed for Z-A on the “All Items” page.
- Verify the price order (high-low) displayed on the “All Items” page.
- Add multiple items to the cart and validate the checkout journey.

### Bonus Tests
- Visual Testing (using Playwright's screenshot/video feature)

## Project Structure

```
├── tests/                     # Test cases
├── page-objects/             # Page Object Model files
├── .github/workflows/        # GitHub Actions CI/CD pipeline
├── playwright.config.js      # Playwright configuration file
├── README.md                 # Project documentation
```

## Test Execution

### Run Tests Locally

```bash
npm install
npx playwright install
 npx playwright test tests --headed
```

### Run Tests Headlessly

```bash
 npx playwright test tests
```

### View HTML Report

```bash
npx playwright show-report
```

## Video & Screen Recording

Videos are recorded automatically for each test when using the configuration below:

**`playwright.config.js`:**

```js
use: {
  video: 'on',
  trace: 'on-first-retry',
}
```

Recorded videos are saved under `test-results` folder.

You may also use tools like OBS or macOS screen recorders to manually capture test execution for submission.

## CI/CD with GitHub Actions

Tests are executed automatically on push using `.github/workflows/playwright.yml`.

### Manual Trigger

Ensure the workflow `on.workflow_dispatch` is set in the YML:

```yaml
on:
  push:
    branches: [ main ]
  workflow_dispatch:
```

You can then run the tests manually via **Actions → Playwright Tests → Run workflow**.

## Prerequisites

- Node.js >= 18.x
- Playwright (^1.42)
- Browsers installed via: `npx playwright install`

## Setup Instructions

1. Clone the repository
2. Run `npm install`
3. Configure `.env` if needed for credentials
4. Execute tests as described above

---