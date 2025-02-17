/* love.js */

// 1. 获取页面元素
let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

// 2. 获取 URL 参数中的 name（如果需要带上用户名）
const params = new URLSearchParams(window.location.search);
let username = params.get("name");

// 限制用户名长度，避免页面样式崩坏
const maxLength = 20;
const safeUsername = username ? username.substring(0, maxLength) : "??????";

// 如果有用户名，就把它追加到问题文字中
if (username) {
  questionText.innerText = questionText.innerText + safeUsername;
}

// 记录点击 No 的次数
let clickCount = 0;

// No 按钮的文字变化列表
const noTexts = [
  "？你认真的吗…",
  "要不再想想？",
  "不许选这个！",
  "我会很伤心…",
  "不行:("
];

// No 按钮点击事件
noButton.addEventListener("click", function () {
  clickCount++;

  // 让 Yes 按钮变大，每次放大 1.2 倍（叠加效果）
  let yesSize = 1 + clickCount * 1.2;
  yesButton.style.transform = `scale(${yesSize})`;

  // 挤压 No 按钮，每次右移 50px
  let noOffset = clickCount * 50;
  noButton.style.transform = `translateX(${noOffset}px)`;

  // 让图片和文字往上移动
  let moveUp = clickCount * 25;
  mainImage.style.transform = `translateY(-${moveUp}px)`;
  questionText.style.transform = `translateY(-${moveUp}px)`;

  // No 文案变化（前 5 次变化）
  if (clickCount <= 5) {
    noButton.innerText = noTexts[clickCount - 1];
  }

  // 根据点击次数切换图片
  if (clickCount === 1) mainImage.src = "ale.jpeg";  // 震惊
  if (clickCount === 2) mainImage.src = "dd.jpeg";   // 思考
  if (clickCount === 3) mainImage.src = "you.jpg";   // 生气
  if (clickCount === 4) mainImage.src = "www.JPEG";  // 哭
  if (clickCount >= 5) mainImage.src = "www2.jpeg";  // 之后一直是哭
});

// 点击 Yes 后，进入表白成功页面并播放音乐
const loveText = `!!!我喜欢你!! ( >᎑<)♡︎ᐝ  ${
  username ? safeUsername + " ♡︎ᐝ(>᎑< )" : ""
}`;

yesButton.addEventListener("click", function () {
  // 替换整个页面内容
  document.body.innerHTML = `
    <div class="yes-screen">
      <h1 class="yes-text"></h1>
      <img src="imyou.jpeg" alt="拥抱" class="yes-image">
      <!-- 不显示控件，只保留 autoplay -->
      <audio id="love-audio" src="想见你想见你想见你.mp3" autoplay></audio>
    </div>
  `;

  // 设置表白文本
  document.querySelector(".yes-text").innerText = loveText;

  // 禁止页面滚动
  document.body.style.overflow = "hidden";
});
