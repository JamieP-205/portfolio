const { defineConfig, devices } = require('@playwright/test');

const python = process.platform === 'win32' ? 'python' : 'python3';

module.exports = defineConfig({
  testDir: 'tests',
  use: {
    baseURL: 'http://localhost:8000',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: `${python} -m http.server 8000`,
    url: 'http://localhost:8000',
    reuseExistingServer: !process.env.CI,
  },
});
