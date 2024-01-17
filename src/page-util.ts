import { Page } from 'puppeteer';
import {
  getRandomComment,
  getRandomNum,
  delay
} from './utilities';

export interface Account {
  id: string,
  pw: string
}

export class PageUtil {
  constructor(
    private _page: Page,
    private _account: Account
  ) { }

  async login(): Promise<void> {
    await this._page.click('#loginForm > div > div:nth-child(1) > div > label > input');
    await this._page.keyboard.type(this._account.id, { delay: 70 });

    await delay(getRandomNum(300, 1000));

    await this._page.click('#loginForm > div > div:nth-child(2) > div > label > input');
    await this._page.keyboard.type(this._account.pw, { delay: 80 });

    await this._page.click('#loginForm > div > div:nth-child(3) > button');
  }

  async like(): Promise<{ success: boolean, message?: string }> {
    let likeButton = await this._page.$('svg[aria-label="좋아요"]');
    if (!likeButton) return { success: false, message: '좋아요 버튼을 찾을 수 없어요' }

    await likeButton.click();

    console.log(`[ + ] 좋아요를 눌렀어요`);
    return { success: true }
  }

  async comment(): Promise<{ success: boolean, message?: string }> {
    let commentInput = await this._page.$('textarea[aria-label="댓글 달기..."]');
    if (!commentInput) return { success: false, message: '댓글 입력창을 찾을 수 없어요' }

    await commentInput.click();
    await delay(getRandomNum(100, 500));
    await this._page.keyboard.type(getRandomComment(), { delay: getRandomNum(100, 300) });

    await delay(getRandomNum());

    let submitButton = await this._page.$('body > div.x1n2onr6.xzkaem6 > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe.x1qjc9v5.xjbqb8w.x1lcm9me.x1yr5g0i.xrt01vj.x10y3i5r.xr1yuqi.xkrivgy.x4ii5y1.x1gryazu.x15h9jz8.x47corl.xh8yej3.xir0mxb.x1juhsu6 > div > article > div > div._ae65 > div > div > div._ae2s._ae3v._ae3w > section._aaoe._ae5y._ae5z._ae62 > div > form > div > div._am-5 > div');
    if (!submitButton) return { success: false, message: '게시 버튼을 찾을 수 없어요' }

    await submitButton.click();
    return { success: true }
  }
}