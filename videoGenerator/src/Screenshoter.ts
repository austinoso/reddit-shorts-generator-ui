import { Page, Browser, launch } from "puppeteer";

export default class Screenshoter {
  private browser: Browser;
  private page: Page;

  constructor() {
    this.browser = null;
    this.page = null;
  }

  public async init(url) {
    this.browser = await launch({
      executablePath: "/usr/bin/google-chrome",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--single-process",
        "--headless",
        "--disable-gpu",
        "--disable-sync",
      ],
    });

    await this.gotoPage(url);
  }

  public async screenshotPage(url: string) {
    const page = await this.browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot({
      path: "./tmp/screenshot.png",
    });
    await page.close();
    return screenshot;
  }

  public async close() {
    await this.browser.close();
  }

  public async gotoPage(url: string) {
    const page = await this.browser.newPage();
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    this.page = page;
  }

  public async takeScreenshotOfElement(selector: string, savePath: string) {
    const page = this.page;
    await page.waitForSelector(selector);
    const element = await page.$(selector);
    try {
      await element.screenshot({
        path: savePath,
      });
    } catch (e) {
      console.log("Error taking screenshot of element: " + selector, e);
    }
  }

  public async takeScreenshotOfComment(id: string, assetsDir: string) {
    const selector = `#${id}`;
    const savePath = `${assetsDir}/comments/${id}.png`;
    await this.takeScreenshotOfElement(selector, savePath);
    return { id: id, path: savePath };
  }

  public async takeScreenshotOfTitle(assetsDir: string) {
    const selector = '[data-test-id="post-content"]';
    const savePath = `${assetsDir}/title.png`;
    await this.takeScreenshotOfElement(selector, savePath);
    return { id: "title", path: savePath };
  }
}
