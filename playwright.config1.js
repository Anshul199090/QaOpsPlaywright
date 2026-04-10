// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  //retries: 1,
  workers: 3,
  timeout: 40 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  projects:
    [
      {
        name: 'Config1',
        use: {
          browserName: 'chromium',
          headless: false,
          screenshot: 'on',
          trace: 'on',
          //viewport: {width:1920, height:1080}
        }
      },
      {
        name: 'Config2',
        use: {
          browserName: 'chromium',
          headless: false,
          screenshot: 'on',
          trace: 'on',
          video: 'retain-on-failure'
          // ignoreHTTPSErrors:true,
          //permissions:['geolocation'],
          // ...devices['Galaxy S24']
        }
      }
    ]


});

