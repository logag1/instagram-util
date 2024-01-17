import path from 'path';
import * as dotenv from 'dotenv';
import { InstaClient } from './insta-client';
import { delay, getRandomNum } from './utilities';

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const clientInfo = {
  id: process.env.ID!,
  pw: process.env.PW!,
  count: 20
};

(async () => {
  const instaClient = new InstaClient({
    ...clientInfo,
    // Can put custom puppeteer browser setting
  });

  const { page, client } = await instaClient.setup();

  await page.goto('https://instagram.com');

  await delay(1000);

  await client.login();

  await delay(5000);

  await page.goto('https://www.instagram.com/explore');

  const firstPostSelector = 'section > main > div > div > div > div > div:nth-child(2) img[decoding="auto"]';

  console.log('첫번째 게시물 로드를 기다리는 중입니다...');

  await page.waitForSelector(firstPostSelector);
  await delay(1000);

  console.log('게시물을 찾았습니다');

  const firstPost = await page.$$(firstPostSelector);

  if (firstPost.length > 0) {
    await firstPost[0].click();
  } else {
    console.log('Cannot Find First post');
  }

  for (let i = 0; i < clientInfo.count; i++) {
    console.log(`\n[#] Task ${i + 1}/${clientInfo.count}`);
    await delay(getRandomNum());

    let likeRes = await client.like();
    console.log('Like', likeRes);

    await delay(getRandomNum());

    if (Math.random() < 0.3) { // 30%
      console.log('[+] 댓글을 답니다');
      let commentRes = await client.comment();
      console.log('Comment ', commentRes);
      await delay(getRandomNum(1000, 3000));
    } else {
      console.log('[-] 댓글 달기를 생략합니다');
    }

    let nextButton = await page.$$('svg[aria-label="다음"]');

    if (nextButton.length > 0) {
      await delay(getRandomNum());
      await nextButton[0].click();
    } else {
      console.log('Cannot find next button');
    }
  }
  console.log('[!] 작업을 완료했습니다. 프로세스를 종료합니다');
  process.exit();
})();