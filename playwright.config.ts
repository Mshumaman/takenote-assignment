import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 1200000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: [['html', {open: 'never'}],
        ['junit', {outputFile: 'results.xml'}]],

    use: {
        viewport: {width: 50, height: 50},
        trace: 'on-first-retry',
        screenshot: 'on',
        video: {
            mode: "retain-on-failure",
        },
        actionTimeout: 30000,
        launchOptions: {
            slowMo: 250,
        }
    },
    projects: [
        {
            name: 'Google Chrome',
            use: {...devices['Desktop Chrome'], channel: 'chrome', viewport: {width: 1440, height: 800}},

        },
        // {
        //   name: 'Firefox',
        //   use: { ...devices['Desktop Firefox'] , viewport: {width: 1440, height: 800}},
        // },

    ],

});