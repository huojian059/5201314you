/* love.js */

// 1. 获取页面元素
let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

// 2. 获取 URL 参数中的 name（如果有）
const params = new URLSearchParams(window.location.search);
let username = params.get("name");

// 限制用户名长度
const maxLength = 20;
const safeUsername = username ? username.substring(0, maxLength) : "??????";

// 如果有用户名，追加到问题文字中
if (username) {
  questionText.innerText = questionText.innerText + safeUsername;
}

// 记录点击 No 的次数
let clickCount = 0;
const noTexts = [
  "？你认真的吗…",
  "要不再想想？",
  "不许选这个！",
  "我会很伤心…",
  "不行:("
];

noButton.addEventListener("click", function () {
  clickCount++;
  // 放大 Yes 按钮
  let yesSize = 1 + clickCount * 1.2;
  yesButton.style.transform = `scale(${yesSize})`;
  
  // No 按钮右移
  let noOffset = clickCount * 50;
  noButton.style.transform = `translateX(${noOffset}px)`;
  
  // 图片和文字上移
  let moveUp = clickCount * 25;
  mainImage.style.transform = `translateY(-${moveUp}px)`;
  questionText.style.transform = `translateY(-${moveUp}px)`;
  
  // 改变 No 按钮文字
  if (clickCount <= 5) {
    noButton.innerText = noTexts[clickCount - 1];
  }
  
  // 切换图片
  if (clickCount === 1) mainImage.src = "ale.jpeg";
  if (clickCount === 2) mainImage.src = "dd.jpeg";
  if (clickCount === 3) mainImage.src = "you.jpg";
  if (clickCount === 4) mainImage.src = "www.jpeg";
  if (clickCount >= 5) mainImage.src = "www2.jpeg";
});

// 表白文本
const loveText = `!!!我喜欢你!! ( >᎑<)♡︎ᐝ  ${
  username ? safeUsername + " ♡︎ᐝ(>᎑< )" : ""
}`;

// 点击 Yes 按钮后
yesButton.addEventListener("click", function () {
  // 创建或获取音乐元素
  let loveAudio = document.getElementById("love-audio");
  if (!loveAudio) {
    loveAudio = document.createElement("audio");
    loveAudio.id = "love-audio";
    loveAudio.src = "想见你想见你想见你.mp3";
    loveAudio.autoplay = true;
    loveAudio.preload = "auto";
  } else {
    loveAudio.play();
  }
  
  // 创建用于过渡的容器
  let contentWrapper = document.createElement("div");
  contentWrapper.id = "content";
  contentWrapper.style.opacity = "1";
  contentWrapper.style.transition = "opacity 1s ease";
  // 确保背景色始终为成功页面的颜色
  contentWrapper.style.backgroundColor = "#7bd2fa";
  contentWrapper.innerHTML = `
    <div class="yes-screen" style="text-align:center;">
      <h1 class="yes-text">${loveText}</h1>
      <img src="imyou.jpeg" alt="拥抱" class="yes-image" style="max-width:80%;">
    </div>
  `;
  
  // 清空整个 body后，立刻设置 body 和 html 的背景色
  document.body.innerHTML = "";
  document.body.style.backgroundColor = "#7bd2fa";
  document.documentElement.style.backgroundColor = "#7bd2fa";
  document.body.appendChild(loveAudio);
  document.body.appendChild(contentWrapper);
  
  // 禁止页面滚动
  document.body.style.overflow = "hidden";
  
  // 5秒后开始过渡到最终页面
  setTimeout(function () {
    // 淡出当前内容
    contentWrapper.style.opacity = "0";
    // 渐变结束后，切换到 iframe 页面
    setTimeout(function () {
      contentWrapper.innerHTML = `
        <iframe src="animation.html" style="width:100%; height:100vh; border:none;"></iframe>
      `;
      // 保持背景色并触发淡入
      contentWrapper.style.opacity = "0";
      setTimeout(function () {
        contentWrapper.style.opacity = "1";
      }, 50);
    }, 1000);
  }, 5000);
});
