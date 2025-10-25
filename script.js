document.addEventListener('DOMContentLoaded', () => {
    const slideContainer = document.querySelector('.slide-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slide-counter');

    let currentSlide = 0;
    let slides = [];

    // specs/slide.md에서 파싱하고 내용을 보강한 슬라이드 데이터
    const slideData = [
        { "title": "AI 에이전트 캐럿과 함께하는 공짜 홈페이지 배포", "content": `AI로 배우는 웹사이트 제작 & GitHub Pages 무료 호스팅<br><br><p style='font-size: 1.2rem;'>코딩, 한 번도 안 해보셨어도 괜찮아요. AI 파트너, 캐럿과 함께라면 누구나 나만의 웹사이트를 만들고 세상에 공개할 수 있습니다.</p><div class='byline'>by Caret</div>` },
        { "title": "강의 목표", "content": `<p>이 강의를 마치면 여러분은 다음을 할 수 있게 됩니다:</p><ul><li>🌐 웹이 어떻게 움직이는지 큰 그림을 이해합니다.</li><li>🛠️ 개발에 필요한 도구들을 직접 설치하고 사용합니다.</li><li>🚀 내가 만든 웹사이트를 전 세계 어디서든 접속할 수 있게 합니다.</li><li>🤖 AI와 협업하여 코딩하는 새로운 방식을 경험합니다.</li></ul>` },
        { "title": "오늘의 최종 결과물", "content": `<ul><li>✨ 나를 소개하는 깔끔한 프로필 페이지</li><li>🔗 GitHub, SNS로 연결되는 링크와 연락처 버튼</li><li>🌍 \`https://내이름.github.io\` 형태의 나만의 주소</li></ul><p style='margin-top: 2rem;'>단순한 웹페이지가 아니라, 여러분의 온라인 명함이 될 거에요!</p>` },
        { "title": "전체 학습 흐름 (6단계)", "content": `<p>총 6단계로 진행됩니다. 차근차근 따라오세요!</p><ol style='list-style-type: decimal; padding-left: 40px; text-align: left;'><li><b>웹 기본 개념:</b> 웹사이트의 재료(HTML/CSS)와 동작 원리를 배워요.</li><li><b>개발환경 준비:</b> 코딩에 필요한 도구(VSCode, Git)를 설치해요.</li><li><b>기획:</b> 어떤 사이트를 만들지 간단히 설계해요.</li><li><b>AI와 코딩:</b> AI 캐럿의 도움을 받아 HTML/CSS 코드를 만들어요.</li><li><b>로컬 확인:</b> 내 컴퓨터에서 결과물을 확인하고 수정해요.</li><li><b>배포:</b> GitHub Pages를 통해 전 세계에 공개해요!</li></ol>` },
        { "title": "웹은 어떻게 동작할까?", "content": `<p>웹은 '요청'과 '응답'으로 이루어진 대화와 같아요.</p><ul><li><b>클라이언트 (Client):</b> 여러분의 웹 브라우저(크롬, 엣지 등). '이 웹툰 보여줘!'라고 <b>요청(Request)</b>하는 손님.</li><li><b>서버 (Server):</b> 웹사이트 파일(HTML, CSS, 이미지)을 보관하는 컴퓨터. 요청을 받아 '여기 웹툰 파일이야!'라고 <b>응답(Response)</b>하는 주인.</li></ul><p>우리가 만들 정적 페이지는 서버에 미리 만들어진 파일을 그대로 보여주는 가장 기본적인 방식입니다.</p>` },
        { "title": "도메인·URL·호스팅", "content": `<p>웹사이트의 '주소'와 '집'에 대한 이야기예요.</p><ul><li><b>호스팅 (Hosting):</b> 웹사이트 파일(집)을 지을 수 있는 땅(서버 공간). GitHub Pages가 우리에게 무료로 땅을 빌려줘요.</li><li><b>도메인 (Domain):</b> \`caret.run\` 처럼 사람들이 쉽게 기억하는 집 주소.</li><li><b>URL:</b> \`https://caret.run/docs\` 처럼 특정 방(페이지)까지 찾아가는 전체 경로.</li></ul>` },
        { "title": "VSCode 소개", "content": `<p>Visual Studio Code는 코딩을 위한 최고의 편집 도구 중 하나입니다.</p><ul><li><b>가볍고 빠름:</b> 메모장을 쓰듯 가볍지만 기능은 강력해요.</li><li><b>높은 확장성:</b> 'Live Server' 같은 확장 프로그램을 설치해 기능을 무한히 추가할 수 있어요.</li><li><b>AI 통합:</b> Caret 같은 AI 에이전트와 함께 사용하면 코딩 효율이 극대화됩니다.</li></ul>` },
        { "title": "VSCode 설치·초기 설정", "content": `<p>딱 3가지만 기억하세요!</p><ul style='text-align: left; display: inline-block;'><li>✅ <b>설치:</b> [code.visualstudio.com](https://code.visualstudio.com/)에서 내 운영체제에 맞는 버전을 다운로드하여 설치하세요.</li><li>✅ <b>확장 프로그램:</b> Extensions 탭(Ctrl+Shift+X)에서 \`Live Server\`와 \`Caret\`를 검색하여 설치하세요. Live Server는 코드를 저장할 때마다 브라우저를 새로고침해줘요.</li><li>✅ <b>자동 저장:</b> \`File > Auto Save\`를 체크하면 깜빡하고 저장을 안 하는 실수를 막을 수 있어요.</li></ul>` },
        { "title": "Git이란? (핵심 개념)", "content": `<p>Git은 코드의 '버전'을 관리하는 도구입니다. 게임의 '세이브 포인트'와 같아요.</p><ul><li><b>버전 관리:</b> 코드 수정 내용을 스냅샷처럼 저장(Commit)해서, 언제든 원하는 시점으로 되돌아갈 수 있어요.</li><li><b>분산 관리 (DVCS):</b> 모든 개발자가 전체 코드 히스토리를 복제해서 작업하므로, 중앙 서버에 문제가 생겨도 안전해요.</li><li><b>협업의 필수품:</b> 여러 사람이 같은 프로젝트를 작업할 때 코드가 꼬이지 않게 도와줍니다.</li></ul>` },
        { "title": "Git 설치·기초 명령", "content": `<p>터미널(명령 프롬프트)에서 사용하는 기본 명령어입니다.</p><pre style='text-align: left; font-size: 1rem;'><code># 1. 설치 확인 (버전 번호가 나오면 성공)\n$ git --version\n\n# 2. 최초 사용자 설정 (한 번만 하면 됩니다)\n$ git config --global user.name "내이름"\n$ git config --global user.email "내이메일@example.com"\n\n# 3. 프로젝트 폴더에서 Git 사용 시작\n$ git init</code></pre>` },
        { "title": "GitHub 계정 만들기", "content": `<p>GitHub는 Git으로 관리하는 프로젝트를 저장하고 공유하는 웹 서비스입니다.</p><ol style='list-style-type: decimal; padding-left: 40px; text-align: left;'><li>[github.com](https://github.com/)에 접속하여 가입합니다.</li><li>이메일 인증을 완료합니다.</li><li>프로필 사진과 간단한 소개를 추가하면 좋습니다.</li><li>보안을 위해 2단계 인증(2FA) 설정을 강력히 권장합니다.</li></ol>` },
        { "title": "GitHub 기본 용어", "content": `<ul style='text-align: left; display: inline-block;'><li><b>Repository (저장소):</b> 프로젝트 파일들이 저장되는 폴더. 줄여서 'Repo'라고 불러요.</li><li><b>Commit (커밋):</b> 변경된 코드 내용을 하나의 버전(스냅샷)으로 저장하는 행위.</li><li><b>Push (푸시):</b> 내 컴퓨터(로컬)에서 작업한 커밋들을 GitHub(원격) 저장소에 업로드하는 것.</li><li><b>Branch (브랜치):</b> 기존 코드를 그대로 복사해서 새로운 기능 개발 등을 독립적으로 진행하는 평행 세계.</li></ul>` },
        { "title": "AI 에이전트 Caret 소개", "content": `<p>Caret은 여러분의 코딩 파트너입니다.</p><ul><li><b>코드 생성:</b> "헤더와 푸터가 있는 기본 HTML 구조 만들어줘" 처럼 자연어로 요청하면 코드를 뚝딱 만들어줘요.</li><li><b>코드 설명:</b> 이해하기 어려운 코드를 쉽게 풀어서 설명해줘요.</li><li><b>리팩토링:</b> 비효율적인 코드를 더 깔끔하고 효율적으로 개선해줘요.</li></ul><p>막히는 부분이 있다면, 주저 말고 Caret에게 물어보세요!</p>` },
        { "title": "GitHub Pages가 뭔가요?", "content": `<p>GitHub에서 제공하는 <b>정적 사이트 무료 호스팅 서비스</b>입니다.</p><ul><li><b>정적 사이트:</b> HTML, CSS, JavaScript 파일로만 구성된, 서버 로직이 없는 간단한 웹사이트. (우리가 만들 사이트!)</li><li><b>무료 호스팅:</b> 별도 서버 비용 없이 웹사이트를 운영할 수 있어요.</li><li><b>자동 배포:</b> 코드를 GitHub에 Push하기만 하면 자동으로 웹사이트에 반영됩니다.</li></ul>` },
        { "title": "첫 배포 준비 — 저장소 만들기", "content": `<p>개인 소개 페이지를 위한 특별한 규칙이 있어요.</p><ul style='text-align: left; display: inline-block;'><li>✅ <b>저장소 이름:</b> 반드시 \`내GitHub아이디.github.io\` 형식으로 만들어야 합니다.</li><li>✅ <b>Public 설정:</b> 외부에서 접속해야 하므로 Public(공개)으로 설정합니다.</li><li>✅ <b>README 파일:</b> 'Add a README file'을 체크하면 프로젝트 설명 파일을 포함하여 저장소를 만들 수 있습니다.</li></ul>` },
        { "title": "index.html 기본 구조", "content": `<p>모든 웹페이지의 기본 뼈대입니다.</p><pre style='text-align: left; font-size: 0.9rem;'><code><!DOCTYPE html>\n<html lang="ko">\n  <head>\n    <meta charset="UTF-8">\n    <title>여기에 페이지 제목이 나와요</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <h1>안녕하세요!</h1>\n  </body>\n</html></code></pre><p style='font-size: 1rem;'><b>head</b>는 설정 정보, <b>body</b>는 실제 눈에 보이는 콘텐츠를 담아요.</p>` },
        { "title": "로컬에서 확인 (Live Server)", "content": `<p>코드를 수정하면서 바로바로 결과를 확인하는 방법입니다.</p><ol style='list-style-type: decimal; padding-left: 40px; text-align: left;'><li>VSCode에서 \`index.html\` 파일을 엽니다.</li><li>우측 하단의 \`Go Live\` 버튼을 클릭합니다.</li><li>웹 브라우저에 여러분의 페이지가 열립니다.</li><li>이제 코드를 수정하고 저장(Ctrl+S)하면, 브라우저가 자동으로 새로고침되어 변경사항이 즉시 반영됩니다.</li></ol>` },
        { "title": "초기 커밋 & 원격 업로드", "content": `<p>내 컴퓨터의 코드를 GitHub에 처음으로 올리는 과정입니다.</p><pre style='text-align: left; font-size: 1rem;'><code># 1. 모든 변경사항을 스테이징(임시 저장)\n$ git add .\n\n# 2. "첫 커밋"이라는 메시지와 함께 버전 생성\n$ git commit -m "Initial commit"\n\n# 3. 원격 저장소 주소 연결 (URL은 GitHub에서 복사)\n$ git remote add origin https://github.com/내아이디/내아이디.github.io.git\n\n# 4. 원격 저장소의 main 브랜치로 코드 푸시(업로드)\n$ git push -u origin main</code></pre>` },
        { "title": "GitHub Pages 활성화", "content": `<p>GitHub 저장소에서 몇 번의 클릭만으로 웹사이트를 활성화할 수 있습니다.</p><ol style='list-style-type: decimal; padding-left: 40px; text-align: left;'><li>해당 저장소의 <b>Settings</b> 탭으로 이동합니다.</li><li>왼쪽 메뉴에서 <b>Pages</b>를 클릭합니다.</li><li><b>Source</b> 항목에서 브랜치를 <b>main</b>으로 선택하고 <b>Save</b>를 누릅니다.</li><li>잠시 후(1~2분) 페이지 상단에 초록색으로 배포된 주소가 나타납니다.</li></ol>` },
        { "title": "배포 확인과 문제 해결 팁", "content": `<p>처음엔 누구나 겪는 문제들이에요. 당황하지 마세요!</p><ul style='text-align: left; display: inline-block;'><li><b>404 Not Found:</b> 파일 이름이 \`index.html\`이 맞는지, 저장소 이름 규칙(\`아이디.github.io\`)이 맞는지 확인하세요.</li><li><b>CSS가 적용 안 돼요:</b> \`index.html\`의 \`<link>\` 태그 경로가 \`style.css\`로 정확히 되어있는지, 파일 이름에 오타가 없는지 확인하세요.</li><li><b>변경사항이 반영 안 돼요:</b> 배포에는 몇 분 정도 시간이 걸릴 수 있습니다. 브라우저 캐시(Ctrl+Shift+R)를 삭제하고 다시 확인해보세요.</li></ul>` },
        { "title": "홈페이지 기획의 중요성", "content": `<p>코딩 전에 '무엇을 만들지' 명확히 하는 것이 중요합니다.</p><ul><li><b>목적 정의:</b> 이 홈페이지는 왜 만드나요? (예: 나를 알리기 위한 포트폴리오)</li><li><b>핵심 콘텐츠:</b> 꼭 들어가야 할 내용은 무엇인가요? (예: 내 기술 스택, 작업물, 연락처)</li><li><b>참고 자료:</b> 마음에 드는 다른 사람의 홈페이지나 디자인을 찾아보세요. 좋은 영감을 얻을 수 있습니다.</li></ul>` },
        { "title": "요구사항 문서 (간단 템플릿)", "content": `<p>거창할 필요 없어요. 메모장에 간단히 정리해보세요.</p><ul style='text-align: left; display: inline-block; border: 1px solid #ccc; padding: 20px; border-radius: 8px;'><li><b>목표:</b> 나를 소개하는 심플한 원페이지 프로필</li><li><b>필수 요소:</b> 이름, 직업, 간단 소개, GitHub/블로그 링크, 이메일 주소</li><li><b>디자인 톤:</b> 민트색을 포인트로 한 깔끔하고 미니멀한 스타일</li><li><b>참고 사이트:</b> [링크]</li></ul>` },
        { "title": "와이어프레임 (페이지 구조 설계)", "content": `<p>손으로 슥슥 그려보는 것만으로도 충분합니다.</p><div style='border: 2px dashed #ccc; padding: 20px; width: 60%; margin: auto;'><b>Header</b> (내 이름, 네비게이션)<hr><b>Main</b><br>- Section 1 (자기소개)<br>- Section 2 (프로젝트)<br>- Section 3 (연락처)<hr><b>Footer</b> (카피라이트, SNS 링크)</div><p style='margin-top: 1rem;'>어떤 내용을 어디에 배치할지 미리 정하면 코딩이 훨씬 수월해집니다.</p>` },
        { "title": "HTML 기본 태그 (요약)", "content": `<p>콘텐츠의 '의미'를 부여하는 태그들입니다.</p><ul style='text-align: left; display: inline-block;'><li><b>시맨틱 태그:</b> \`<header>\`, \`<main>\`, \`<footer>\`, \`<section>\` 등. 영역의 의미를 명확히 하여 검색엔진과 스크린리더에 도움을 줍니다.</li><li><b>이미지:</b> \`<img src="이미지경로" alt="이미지설명">\`. \`alt\` 속성은 이미지가 보이지 않을 때 대신 표시되는 텍스트로, 웹 접근성에 매우 중요합니다.</li><li><b>링크:</b> \`<a href="https://caret.run">캐럿 사이트</a>\`. 다른 페이지나 외부 사이트로 연결합니다.</li></ul>` },
        { "title": "CSS 적용 기초", "content": `<p>HTML로 뼈대를 만들고, CSS로 옷을 입힙니다.</p><ul style='text-align: left; display: inline-block;'><li><b>외부 CSS 연결:</b> HTML \`<head>\` 안에 \`<link rel="stylesheet" href="style.css">\`를 추가하여 연결합니다.</li><li><b>선택자:</b> 특정 요소에 스타일을 주기 위해 사용합니다. <ul><li>\`h1 { color: blue; }\` (모든 h1 태그)</li><li>\`.title { font-size: 20px; }\` (class가 title인 요소)</li><li>\`#profile { border: 1px solid black; }\` (id가 profile인 요소)</li></ul></li></ul>` },
        { "title": "레이아웃 기초 — Flexbox", "content": `<p>요소들을 가로나 세로로 쉽게 정렬하는 강력한 도구입니다.</p><p>부모 요소에 \`display: flex;\`를 적용하는 것으로 시작합니다.</p><pre style='text-align: left; font-size: 1rem;'><code>.container {\n  display: flex;\n  justify-content: space-around; /* 가로 정렬 */\n  align-items: center;         /* 세로 정렬 */\n}</code></pre><p style='font-size: 1rem;'>\`justify-content\`와 \`align-items\` 두 가지만 잘 써도 대부분의 레이아웃을 만들 수 있습니다.</p>` },
        { "title": "반응형 웹 기본 (Mobile-first)", "content": `<p>다양한 화면 크기(모바일, 태블릿, 데스크탑)에서 잘 보이게 만드는 기술입니다.</p><ul style='text-align: left; display: inline-block;'><li><b>Viewport 설정:</b> HTML \`<head>\`에 \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`를 꼭 추가해야 합니다.</li><li><b>미디어 쿼리:</b> 특정 화면 크기에서만 다른 CSS를 적용하게 해줍니다. <pre style='font-size: 0.9rem;'><code>/* 화면 너비가 768px 이상일 때 */\n@media (min-width: 768px) {\n  .container {\n    flex-direction: row; /* 가로 배치 */\n  }\n}</code></pre></li></ul>` },
        { "title": "접근성(Accessibility) 기본", "content": `<p>모든 사용자가 웹사이트를 동등하게 이용할 수 있도록 보장하는 것입니다.</p><ul style='text-align: left; display: inline-block;'><li>✅ <b>\`alt\` 속성:</b> 모든 \`<img>\` 태그에 의미 있는 대체 텍스트를 제공하세요.</li><li>✅ <b>컬러 대비:</b> 배경색과 글자색의 대비를 충분히 높여 글자가 잘 보이게 하세요.</li><li>✅ <b>키보드 조작:</b> 마우스 없이 키보드(Tab, Enter)만으로도 모든 기능을 이용할 수 있어야 합니다.</li><li>✅ <b>시맨틱 HTML:</b> 의미에 맞는 태그를 사용하면 스크린리더 사용자가 콘텐츠 구조를 파악하기 쉬워집니다.</li></ul>` },
        { "title": "Caret 프롬프트 예시 (HTML)", "content": `<p>AI에게 작업을 시킬 땐, 최대한 구체적으로 명확하게 요청하는 것이 중요합니다.</p><p style='font-style: italic;'>"깔끔한 개인 포트폴리오 사이트를 위한 index.html 파일을 만들어줘. 헤더, 자기소개 섹션, 연락처 섹션, 푸터를 포함해줘. 각 섹션은 시맨틱 태그를 사용하고, style.css 파일을 연결해줘. 각 부분에 대한 설명 주석도 달아줘."</p><p>이렇게 요청하면, AI가 훨씬 더 정확한 결과물을 만들어줍니다.</p>` },
        { "title": "Caret 프롬프트 예시 (CSS)", "content": `<p>디자인에 대한 요청도 구체적일수록 좋습니다.</p><p style='font-style: italic;'>"style.css 파일을 만들어줘. 전체적으로 모던하고 미니멀한 디자인으로. 기본 폰트는 'Noto Sans KR'을 사용하고, 메인 컬러는 #68d8d6 민트색으로 해줘. 모바일 화면에서도 잘 보이도록 반응형 디자인을 적용해줘. 특히 헤더는 화면 상단에 고정시켜줘."</p><p>원하는 폰트, 색상, 레이아웃을 명시하면 만족스러운 결과를 얻을 확률이 높아집니다.</p>` },
        { "title": "버튼·링크·이미지 추가", "content": `<p>페이지를 풍부하게 만드는 요소들입니다.</p><ul style='text-align: left; display: inline-block;'><li><b>링크:</b> \`<a href="https://github.com/내아이디" target="_blank">GitHub 프로필</a>\` <br>\`target="_blank"\`는 새 탭에서 링크를 열어줍니다.</li><li><b>버튼:</b> \`<button class="contact-btn">문의하기</button>\`<br>CSS로 예쁘게 꾸며서 사용자의 클릭을 유도할 수 있습니다.</li><li><b>이미지:</b> \`<img src="profile.jpg" alt="내 프로필 사진">\`<br>이미지 파일은 프로젝트 폴더에 함께 넣어두고 경로를 지정합니다.</li></ul>` },
        { "title": "Git으로 변경사항 저장", "content": `<p>코드를 수정한 후, 그 변경 내용을 Git에 기록하는 2단계 과정입니다.</p><ol style='list-style-type: decimal; padding-left: 40px; text-align: left;'><li><b>\`git add .\`</b><br>수정한 파일들을 '장바구니'에 담는 과정이라고 생각하세요. 어떤 변경사항을 저장할지 선택하는 단계입니다. \`.\`은 모든 변경사항을 의미합니다.</li><li><b>\`git commit -m "메시지"\`</b><br>장바구니에 담은 물건들을 '계산'하고 영수증을 발행하는 과정입니다. \`-m\` 뒤의 메시지는 어떤 작업을 했는지 기록하는 영수증 내용과 같습니다. (예: \`"프로필 이미지 추가"\`)</li></ol>` },
        { "title": "GitHub로 업로드(Push)", "content": `<p>내 컴퓨터(로컬 저장소)에 저장한 커밋들을 GitHub(원격 저장소)에 업로드하여 동기화하는 작업입니다.</p><pre><code>$ git push origin main</code></pre><p>이 명령어를 실행하면, 다른 사람들도 내가 수정한 코드를 볼 수 있게 되고, GitHub Pages를 사용한다면 웹사이트에 변경사항이 자동으로 반영되기 시작합니다.</p>` },
        { "title": "자동 배포 (GitHub Pages)", "content": `<p>GitHub Pages의 가장 큰 장점은 '자동 배포'입니다.</p><p><b>\`git push\`</b> 명령어를 실행하고 나면, GitHub가 알아서 웹사이트를 업데이트합니다.</p><ul style='text-align: left; display: inline-block;'><li><b>배포 과정 확인:</b> 저장소의 <b>Actions</b> 탭에서 배포가 진행되는 과정을 실시간으로 볼 수 있습니다.</li><li><b>적용 시간:</b> 보통 1~2분 안에 완료되지만, 가끔 조금 더 걸릴 수도 있습니다.</li><li><b>확인:</b> 배포 완료 후 \`내아이디.github.io\`에 접속하여 새로고침하면 변경된 내용이 보입니다.</li></ul>` },
        { "title": "사이트 수정 & 재배포 흐름", "content": `<p>이제 웹사이트를 유지보수하는 것은 이 흐름의 반복입니다.</p><div style='font-size: 1.5rem; font-weight: bold;'>코드 수정 ➡️ \`git add .\` ➡️ \`git commit\` ➡️ \`git push\` ➡️ 자동 배포</div><p>이 사이클에 익숙해지면, 여러분은 버전 관리를 통해 안정적으로 웹사이트를 운영할 수 있게 됩니다.</p>` },
        { "title": "커스텀 도메인 연결 (선택)", "content": `<p>\`내아이디.github.io\` 대신 나만의 도메인(예: \`my-awesome-site.com\`)을 연결할 수 있습니다.</p><ul style='text-align: left; display: inline-block;'><li><b>도메인 구매:</b> 가비아, 호스팅KR 등 도메인 판매 사이트에서 원하는 주소를 구매합니다.</li><li><b>DNS 설정:</b> 구매한 도메인 관리 페이지에서 CNAME 레코드를 \`내아이디.github.io\`로 설정합니다.</li><li><b>GitHub 설정:</b> 저장소 Settings > Pages의 Custom domain 항목에 구매한 도메인을 입력하고 저장합니다.</li></ul><p>자세한 방법은 GitHub 공식 문서를 참고하세요.</p>` },
        { "title": "사이트 개선 아이디어", "content": `<p>기본 사이트를 완성했다면, 이렇게 발전시켜 보세요.</p><ul><li><b>콘텐츠 확장:</b> 'About Me', 'Projects', 'Blog' 등 별도의 페이지를 만들어 더 많은 정보를 담아보세요.</li><li><b>인터랙션 추가:</b> JavaScript를 이용해 스크롤 애니메이션이나 동적인 요소를 추가해보세요.</li><li><b>디자인 개선:</b> [Google Fonts](https://fonts.google.com/)에서 멋진 폰트를 적용하거나, [Color Hunt](https://colorhunt.co/)에서 세련된 색상 조합을 찾아보세요.</li></ul>` },
        { "title": "AI 활용 확장", "content": `<p>AI는 코딩뿐만 아니라 콘텐츠 제작에도 훌륭한 파트너입니다.</p><ul><li><b>코드 리팩토링:</b> Caret에게 "이 CSS 코드 더 효율적으로 만들어줘"라고 요청해보세요.</li><li><b>콘텐츠 생성:</b> "내 포트폴리오 사이트에 들어갈 자기소개 문구 초안 3개 작성해줘"</li><li><b>SEO 최적화:</b> "내 사이트가 검색에 잘 걸리도록 HTML meta 태그를 추천해줘"</li></ul>` },
        { "title": "자주 만나는 문제 해결", "content": `<p>이런 문제가 생겼나요? 해결책은 가까이 있습니다.</p><ul style='text-align: left; display: inline-block;'><li><b>CSS가 안 먹혀요:</b> 십중팔구 경로 문제입니다. \`link\` 태그의 \`href\` 속성값과 실제 파일 이름/위치가 일치하는지 확인하세요. 또는 브라우저 개발자 도구(F12)의 Console 탭에서 에러를 확인하세요.</li><li><b>한글이 깨져요:</b> HTML \`<head>\` 안에 \`<meta charset="UTF-8">\`이 있는지 확인하세요. 이 코드는 브라우저에게 이 문서가 UTF-8 방식으로 인코딩되었음을 알려줍니다.</li><li><b>레이아웃이 깨져요:</b> 개발자 도구(F12)의 Elements 탭에서 해당 요소의 CSS 속성(특히 \`width\`, \`margin\`, \`padding\`)을 확인하고 수정해보세요.</li></ul>` },
        { "title": "마무리 & 다음 단계", "content": `<p>축하합니다! 여러분은 웹 개발과 배포의 전 과정을 경험했습니다.</p><ul><li>✅ GitHub Pages로 나만의 사이트를 배포했습니다.</li><li>✅ HTML/CSS의 기본 구조를 이해했습니다.</li><li>✅ AI와 협업하여 개발하는 경험을 했습니다.</li></ul><p><b>🎯 다음 목표:</b> 오늘 배운 것을 바탕으로 여러분의 포트폴리오를 더 풍성하게 채우거나, 나만의 기술 블로그를 만들어보세요!</p>` }
    ];

    function renderSlides() {
        slideContainer.innerHTML = '';
        slideData.forEach((data, index) => {
            const slideElement = document.createElement('div');
            slideElement.classList.add('slide');
            if (index === 0) {
                slideElement.innerHTML = `<h1>${data.title}</h1><div>${data.content}</div>`;
            } else {
                slideElement.innerHTML = `<h2>${data.title}</h2><div>${data.content}</div>`;
            }
            slideContainer.appendChild(slideElement);
        });
        slides = document.querySelectorAll('.slide');
        showSlide(0);
    }

    function showSlide(index) {
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides.forEach((slide, i) => {
            if (i === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        slideCounter.textContent = `${currentSlide + 1} / ${slides.length}`;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // 초기 슬라이드 렌더링
    renderSlides();
});
