/* love.js */

// 1. 获取页面元素
let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");
// 如果页面中存在容器，可用它来包裹主要内容（本示例中我们后续会重建一个容器）
let container = document.querySelector(".container");

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
  if (clickCount === 2) mainImage.src = "dd.jpeg";     // 思考
  if (clickCount === 3) mainImage.src = "you.jpg";     // 生气
  if (clickCount === 4) mainImage.src = "www.jpeg";    // 哭
  if (clickCount >= 5) mainImage.src = "www2.jpeg";     // 之后一直是哭
});

// 表白文本
const loveText = `!!!我喜欢你!! ( >᎑<)♡︎ᐝ  ${
  username ? safeUsername + " ♡︎ᐝ(>᎑< )" : ""
}`;

// 点击 Yes 后：显示表白成功页面、播放音乐，并在5秒后进行柔和渐变切换到 animation.html
yesButton.addEventListener("click", function () {
  // 创建或获取音乐元素，确保音乐持续播放
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

  // 创建一个新的内容容器，用于显示表白成功页面及后续加载的动画页面
  let contentWrapper = document.createElement("div");
  contentWrapper.id = "content";
  contentWrapper.style.opacity = "1"; // 初始状态完全显示
  contentWrapper.style.transition = "opacity 1s ease";
  contentWrapper.innerHTML = `
    <div class="yes-screen" style="text-align:center;">
      <h1 class="yes-text">${loveText}</h1>
      <img src="imyou.jpeg" alt="拥抱" class="yes-image" style="max-width:80%;">
    </div>
  `;

  // 清空整个 body，并先添加音乐元素，再添加内容容器
  document.body.innerHTML = "";
  document.body.appendChild(loveAudio);
  document.body.appendChild(contentWrapper);

  // 禁止页面滚动
  document.body.style.overflow = "hidden";

  // 5秒后开始柔和渐变切换到另一个页面
  setTimeout(function () {
    // 先让当前内容淡出
    contentWrapper.style.opacity = "0";
    // 等待1秒（渐变时间），再更换内容
    setTimeout(function () {
      contentWrapper.innerHTML = `
        <iframe src="animation.html" style="width:100%; height:100vh; border:none;"></iframe>
      `;
      // 更换内容后，先保持隐藏，再淡入显示
      contentWrapper.style.opacity = "0";
      // 稍作延时触发淡入效果
      setTimeout(function () {
        contentWrapper.style.opacity = "1";
      }, 50);
    }, 1000);
  }, 5000);
});
