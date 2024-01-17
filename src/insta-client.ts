import puppeteer, { Page, PuppeteerLaunchOptions, executablePath } from 'puppeteer';
import { PageUtil } from './page-util';

export interface SetupForm {
  id: string;
  pw: string;
  count: number;
  browerForm?: PuppeteerLaunchOptions;
}

export class InstaClient {

  constructor(private _setupForm: SetupForm) { }

  async setup(): Promise<{ page: Page, client: PageUtil }> {
    if (!this._setupForm.browerForm) {
      this._setupForm.browerForm = {
        headless: false,
        executablePath: executablePath(),
        args: [
          "--lang-ko-KR,ko",
          "--disable-setuid-sandbox",
          "--no-sandbox",
          "--window-size=1920,1080"
        ],
        env: { LANGUAGE: "ko_KR", DISPLAY: "$HOST_IP:10.0" }
      }
    }
    const browser = await puppeteer.launch(this._setupForm.browerForm);
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    const client = new PageUtil(page, {
      id: this._setupForm.id,
      pw: this._setupForm.pw
    });

    return { page, client }
  }

  async start() {

  }
}