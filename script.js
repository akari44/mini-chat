// ===========================================================
// Mini Chat STEP 2 · JavaScript（完成版）
// ブラウザの中だけで動きます。保存はしていないので、
// 再読み込みすると追加した投稿は消えます。
// ===========================================================

const form = document.getElementById('composer');
const nameInput = document.getElementById('name');
const textInput = document.getElementById('text');
const messages = document.getElementById('messages');

// 投稿ボタン（フォーム送信）が押されたときの処理
form.addEventListener('submit', (event) => {
  event.preventDefault(); // ページ遷移（再読み込み）を止める

  const name = nameInput.value.trim();
  const text = textInput.value.trim();
  if (name === '' || text === '') return; // 空なら何もしない

  addMessage(name, text); // 画面に1件追加
  nameInput.value = '';    // 入力欄をクリア
  textInput.value = '';
});

// メッセージを画面（DOM）に1件追加する
// 安全のため textContent を使い、入力をHTMLとして解釈させない（XSS対策）
function addMessage(name, text) {
  const article = document.createElement('article');
  article.className = 'message';

  const meta = document.createElement('div');
  meta.className = 'message__meta';

  const nameEl = document.createElement('span');
  nameEl.className = 'message__name';
  nameEl.textContent = name;

  const timeEl = document.createElement('time');
  timeEl.className = 'message__time';
  timeEl.textContent = formatNow();

  meta.append(nameEl, timeEl);

  const body = document.createElement('p');
  body.className = 'message__body';
  body.textContent = text;

  article.append(meta, body);
  messages.append(article);
  messages.scrollTop = messages.scrollHeight; // 一番下までスクロール
}

// 現在時刻を "HH:MM" で返す
function formatNow() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}
