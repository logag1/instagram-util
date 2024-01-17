# 인스타그램 작업 자동화 라이브러리
- 인스타그램 로그인 과정과, 댓글을 자동으로 다는 일련의 과정들을 간편화한 라이브러리입니다
- 인스타그램의 셀렉터가 자주 변경되기에, 곧 쓰지 못할지도 모르겠네요

## 사용
```typescript
import { InstaClient } from './insta-client';

(async () => {
  const instaClient = new InstaClient({
    ...clientInfo, // ID, PW, LIKE COUNT
    // Can put custom puppeteer browser setting
  });

  const { page, client } = await instaClient.setup();
})();
```
```bash
npm install
npm run start
```

## 콘솔
![로그](/image/console.png)