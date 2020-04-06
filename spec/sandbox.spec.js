const puppeteer = require("puppeteer");
const { should } = require("chai");

let page;
let browser;

should();

describe("Sandbox", () => {
  before(async function fn() {
    this.timeout(20000);
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false });

    page = await browser.newPage();

    await page
      .goto("https://e2e-boilerplate.github.io/sandbox/", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  after(() => {
    if (!page.isClosed()) {
      browser.close();
    }
  });

  it("should be on the sandbox", async () => {
    await page.waitFor("h1");

    const title = await page.title();
    const header = await page.$eval("h1", (el) => el.textContent);

    title.should.eql("Sandbox");
    header.should.eql("Sandbox");
  });
});
