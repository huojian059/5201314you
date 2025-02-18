/* love.js */

// 1. 获取页面元素
const yesButton = document.getElementById("yes");
const noButton = document.getElementById("no");
const questionText = document.getElementById("question");
const mainImage = document.getElementById("mainImage");
const container = document.querySelector(".container");

// 2. 如果需要带上用户名（URL 参数）
const params = new URLSearchParams(window.location.search);
let username = params.get("name");
const maxLength = 20;
const safeUsername = username ? username.substring(0, maxLength) : "??????";
if (username) {
  questionText.innerText += safeUsername;
}

// 3. “不要”按钮点击次数
let clickCount = 0;
const noTexts = [
  "？你认真的吗…",
  "要不再想想？",
  "不许选这个！",
  "我会很伤心…",
  "不行:("
];

// “不要”按钮点击逻辑
noButton.addEventListener("click", function () {
  clickCount++;

  // 让 “可以” 按钮变大
  let yesSize = 1 + clickCount * 1.2;
  yesButton.style.transform = `scale(${yesSize})`;

  // 挤压 “不要” 按钮，每次右移 50px
  let noOffset = clickCount * 50;
  noButton.style.transform = `translateX(${noOffset}px)`;

  // 让图片和文字往上移动
  let moveUp = clickCount * 25;
  mainImage.style.transform = `translateY(-${moveUp}px)`;
  questionText.style.transform = `translateY(-${moveUp}px)`;

  // No 按钮文字切换
  if (clickCount <= noTexts.length) {
    noButton.innerText = noTexts[clickCount - 1];
  }

  // 根据点击次数切换图片
  if (clickCount === 1) mainImage.src = "ale.jpeg";  // 震惊
  if (clickCount === 2) mainImage.src = "dd.jpeg";   // 思考
  if (clickCount === 3) mainImage.src = "you.jpg";   // 生气
  if (clickCount === 4) mainImage.src = "www.jpeg";  // 哭
  if (clickCount >= 5) mainImage.src = "www2.jpeg";  // 之后一直是哭
});

// 4. “可以”按钮：先显示表白成功，再 5 秒后淡出切换到 animation.html
const loveText = `!!!我喜欢你!! ( >᎑<)♡︎ᐝ ${
  username ? safeUsername + " ♡︎ᐝ(>᎑< )" : ""
}`;

yesButton.addEventListener("click", function () {
  // 创建 / 获取 音乐元素
  let loveAudio = document.getElementById("love-audio");
  if (!loveAudio) {
    loveAudio = document.createElement("audio");
    loveAudio.id = "love-audio";
    loveAudio.src = "想见你想见你想见你.mp3";
    loveAudio.preload = "auto";
  }
  // 播放音乐
  loveAudio.autoplay = true;
  loveAudio.play();

  // 让 .container 覆盖全屏，以便后续 iframe 也全屏
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100vw";
  container.style.height = "100vh";
  container.style.zIndex = "9999"; // 确保在最上层
  container.style.transition = "opacity 1s ease";
  container.style.opacity = "1";

  // 替换 container 内部为表白成功页面
  container.innerHTML = `
    <!-- 保持居中，可在此处自定义样式 -->
    <div style="
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    ">
      <h1 class="yes-text" style="font-size:24px;">${loveText}</h1>
      <img src="imyou.jpeg" alt="拥抱" style="max-width:50%; margin-top:20px;">
    </div>
  `;

  // 把音乐元素添加到 body，避免后续 container 替换时被移除
  document.body.appendChild(loveAudio);

  // 5 秒后淡出，再切换到 iframe
  setTimeout(() => {
    // 淡出
    container.style.opacity = "0";

    // 等 1 秒（过渡时间）后，替换成 iframe
    setTimeout(() => {
      container.innerHTML = `
        <iframe
          src="animation.html"
          style="
            width: 100vw;
            height: 100vh;
            border: none;
            margin: 0;
            padding: 0;
          "
          frameborder="0"
          scrolling="no"
        ></iframe>
      `;
      // 替换完后，先保持透明
      container.style.opacity = "0";
      // 稍作延时触发淡入
      setTimeout(() => {
        container.style.opacity = "1";
      }, 50);
    }, 1000);
  }, 5000);
});
