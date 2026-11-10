// 數學觀念練習:介面流程仿「英文單字練習」(首頁選範圍 → 做題 → 結果),紀錄存在這台裝置的瀏覽器
const STATS_KEY = 'math_stats', STAR_KEY = 'math_star', SET_KEY = 'math_settings';
const TOPIC_NAME = Object.fromEntries(TOPICS.map(t => [t.id, t.name]));
const TYPE_NAME = Object.fromEntries(TYPES.map(t => [t.id, t.name]));
// 題庫:固定題 + 隨機題(每個產生器算 2 題)
const ITEMS = [...QUESTIONS, ...GENERATORS.flatMap(g => [{ ...g, gen: true }, { ...g, gen: true }])];
const UNIQUE = [...QUESTIONS, ...GENERATORS];

const $ = id => document.getElementById(id);
function loadJSON(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch { return d; } }
function saveJSON(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

let stats = loadJSON(STATS_KEY, {});            // id → {ok, ng, run(答錯後連續答對次數)}
let stars = new Set(loadJSON(STAR_KEY, []));
let settings = Object.assign({ src: 'all', topics: [], types: [], count: '20', sound: 'on' }, loadJSON(SET_KEY, {}));
function saveSettings() { saveJSON(SET_KEY, settings); }

function rec(id) { return stats[id] || (stats[id] = { ok: 0, ng: 0, run: 0 }); }
function isWeak(id) { const r = stats[id]; return !!r && r.ng > 0 && r.run < 2; }
function record(id, ok) {
  const r = rec(id);
  if (ok) { r.ok++; r.run++; } else { r.ng++; r.run = 0; }
  saveJSON(STATS_KEY, stats);
}

// ---------- 工具 ----------
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function weightedPick(list, n) {   // 不熟、星號的題目比較容易被抽到
  return list.map(it => {
    const r = stats[it.id];
    const w = 1 + (isWeak(it.id) ? 2 + r.ng : 0) + (stars.has(it.id) ? 2 : 0);
    return { it, key: Math.pow(Math.random(), 1 / w) };
  }).sort((a, b) => b.key - a.key).slice(0, n).map(x => x.it);
}
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  window.scrollTo(0, 0);
}
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
// 題目文字:先跳脫 HTML(式子裡的 < 才不會被當成標籤),只保留 <b>
function fmt(s) { return esc(s).replace(/&lt;(\/?)b&gt;/g, '<$1b>'); }
const KATEX_OPT = {
  delimiters: [{ left: '$', right: '$', display: false }],
  throwOnError: false,
  macros: { '\\Q': '\\mathbb{Q}', '\\Qb': '\\overline{\\mathbb{Q}}' },
};
function math(el) { if (window.renderMathInElement) renderMathInElement(el, KATEX_OPT); }
function setMath(el, html) { el.innerHTML = html; math(el); }

let audioCtx = null;
function beep(ok) {
  if (settings.sound === 'off') return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const t = audioCtx.currentTime;
    const notes = ok ? [[880, 0, 0.12], [1320, 0.1, 0.22]] : [[196, 0, 0.32]];
    for (const [freq, start, len] of notes) {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = ok ? 'sine' : 'square'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t + start);
      g.gain.exponentialRampToValueAtTime(ok ? 0.35 : 0.12, t + start + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + start + len);
      o.connect(g).connect(audioCtx.destination);
      o.start(t + start); o.stop(t + start + len + 0.02);
    }
  } catch {}
}

// ---------- 首頁 ----------
function chip(label, sub, on, onclick) {
  const b = document.createElement('button');
  b.className = 'chip' + (on ? ' on' : '');
  b.innerHTML = esc(label) + (sub != null ? `<small>${esc(sub)}</small>` : '');
  b.onclick = onclick;
  return b;
}
function srcFilter(list) {
  if (settings.src === 'weak') return list.filter(it => isWeak(it.id));
  if (settings.src === 'star') return list.filter(it => stars.has(it.id));
  return list;
}
function pool(list = ITEMS) {
  return srcFilter(list).filter(it =>
    (!settings.topics.length || settings.topics.includes(it.topic)) &&
    (!settings.types.length || settings.types.includes(it.type)));
}
function toggleIn(arr, v) { const i = arr.indexOf(v); i < 0 ? arr.push(v) : arr.splice(i, 1); }

function refreshHome() {
  $('stat-total').textContent = UNIQUE.length;
  $('stat-weak').textContent = UNIQUE.filter(it => isWeak(it.id)).length;
  $('stat-star').textContent = UNIQUE.filter(it => stars.has(it.id)).length;

  const src = $('scope-src'); src.innerHTML = '';
  [['all', '全部題目'], ['weak', '不熟題目'], ['star', '星號題目']].forEach(([v, l]) => {
    const n = srcFilter(UNIQUE).length;
    src.appendChild(chip(l, settings.src === v ? n + ' 題' : null, settings.src === v, () => { settings.src = v; saveSettings(); refreshHome(); }));
  });
  const tp = $('scope-topics'); tp.innerHTML = '';
  TOPICS.forEach(t => {
    const n = srcFilter(UNIQUE).filter(it => it.topic === t.id).length;
    tp.appendChild(chip(t.name, n + ' 題', settings.topics.includes(t.id), () => { toggleIn(settings.topics, t.id); saveSettings(); refreshHome(); }));
  });
  const ty = $('scope-types'); ty.innerHTML = '';
  TYPES.forEach(t => {
    const n = srcFilter(UNIQUE).filter(it => it.type === t.id && (!settings.topics.length || settings.topics.includes(it.topic))).length;
    ty.appendChild(chip(t.name, n + ' 題', settings.types.includes(t.id), () => { toggleIn(settings.types, t.id); saveSettings(); refreshHome(); }));
  });
  const n = pool(UNIQUE).length;
  $('scope-info').textContent = `符合條件的題目:${n} 題` + (GENERATORS.some(g => pool([g]).length) ? '(含隨機出數字的題目)' : '');
  document.querySelectorAll('.seg').forEach(seg => {
    seg.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.value === settings[seg.dataset.name]));
  });
  $('home-msg').textContent = '';
}

// ---------- 測驗 ----------
let quiz = null;
// 把題目變成一題實際要考的內容(隨機題現在產生數字;選項打亂)
function instantiate(it) {
  const base = it.gen ? { ...it.make(), id: it.id, topic: it.topic, type: it.type, ans: 0, fixed: false } : it;
  const order = base.fixed ? base.options.map((_, i) => i) : shuffle(base.options.map((_, i) => i));
  return { ...base, opts: order.map(i => base.options[i]), correct: order.indexOf(base.ans) };
}
function startQuiz(items) {
  if (!items.length) { $('home-msg').textContent = '沒有符合條件的題目'; return false; }
  const n = settings.count === 'all' ? items.length : Math.min(+settings.count, items.length);
  const chosen = weightedPick(items, n);
  quiz = { list: chosen.map(instantiate), src: chosen, i: 0, right: 0, wrong: [] };
  show('quiz');
  renderQuestion();
  return true;
}
function renderQuestion() {
  const q = quiz.list[quiz.i];
  quiz.answered = false;
  $('progress').textContent = `${quiz.i + 1}/${quiz.list.length}`;
  $('q-tags').innerHTML = `<span class="tag">${esc(TOPIC_NAME[q.topic])}</span><span class="tag type">${esc(TYPE_NAME[q.type])}</span>`;
  setMath($('q-text'), fmt(q.q));
  const box = $('options'); box.innerHTML = '';
  q.opts.forEach((o, i) => {
    const b = document.createElement('button');
    b.className = 'opt';
    b.innerHTML = `<span class="lbl">${'ABCD'[i]}</span>` + fmt(o);
    b.onclick = () => answer(i);
    box.appendChild(b);
  });
  math(box);
  $('feedback').innerHTML = '';
  $('btn-action').classList.add('hidden');
  updateStar();
}
function answer(i) {
  if (quiz.answered) return;
  quiz.answered = true;
  const q = quiz.list[quiz.i], ok = i === q.correct;
  const btns = $('options').children;
  [...btns].forEach((b, k) => {
    if (k === q.correct) b.classList.add(ok ? 'correct' : 'missed');
    else if (k === i) b.classList.add('wrong');
    else b.classList.add('faded');
  });
  record(q.id, ok);
  beep(ok);
  if (ok) quiz.right++; else quiz.wrong.push({ q, src: quiz.src[quiz.i] });
  setMath($('feedback'), `<div class="res ${ok ? 'ok' : 'ng'}">${ok ? '✓ 答對了' : '✘ 答錯了'}</div>` +
    (q.explain ? `<div class="explain">${fmt(q.explain)}</div>` : ''));
  const act = $('btn-action');
  act.textContent = quiz.i + 1 < quiz.list.length ? '下一題' : '看結果';
  act.classList.remove('hidden');
  setTimeout(() => $('feedback').scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
}
function next() {
  if (quiz.i + 1 < quiz.list.length) { quiz.i++; renderQuestion(); window.scrollTo(0, 0); }
  else showResult();
}
function updateStar() {
  const q = quiz.list[quiz.i], on = stars.has(q.id);
  $('btn-star').textContent = on ? '★' : '☆';
}
function toggleStar() {
  const id = quiz.list[quiz.i].id;
  stars.has(id) ? stars.delete(id) : stars.add(id);
  saveJSON(STAR_KEY, [...stars]);
  updateStar();
}
function showResult() {
  const done = quiz.answered ? quiz.i + 1 : quiz.i;
  const pct = done ? Math.round(quiz.right / done * 100) : 0;
  $('score-pct').textContent = pct + '%';
  $('score-detail').textContent = `做了 ${done} 題,答對 ${quiz.right} 題`;
  const ul = $('wrong-list'); ul.innerHTML = '';
  if (!quiz.wrong.length) ul.innerHTML = '<li class="empty">全部答對!</li>';
  quiz.wrong.forEach(({ q }) => {
    const li = document.createElement('li');
    li.innerHTML = `<div>${fmt(q.q)}</div><div class="ans">正解:${fmt(q.opts[q.correct])}</div>`;
    ul.appendChild(li);
  });
  math(ul);
  $('wrong-title').classList.toggle('hidden', !quiz.wrong.length);
  $('btn-retry-wrong').classList.toggle('hidden', !quiz.wrong.length);
  show('result');
}

// ---------- 觀念整理 ----------
function openNotes() {
  const box = $('notes-list'); box.innerHTML = '';
  TOPICS.forEach(t => {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.innerHTML = `<h4>${esc(t.name)}</h4><ol>${NOTES[t.id].map(s => `<li>${fmt(s)}</li>`).join('')}</ol>`;
    const b = document.createElement('button');
    b.className = 'link-btn';
    b.textContent = `練習「${t.name}」›`;
    b.onclick = () => { settings.topics = [t.id]; settings.types = []; settings.src = 'all'; saveSettings(); refreshHome(); startQuiz(pool()); };
    card.appendChild(b);
    box.appendChild(card);
  });
  math(box);
  show('notes');
}

// ---------- 事件 ----------
document.querySelectorAll('.seg').forEach(seg => seg.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  settings[seg.dataset.name] = b.dataset.value; saveSettings(); refreshHome();
}));
$('btn-start').onclick = () => startQuiz(pool());
$('btn-notes').onclick = openNotes;
$('stat-weak-box').onclick = () => { settings.src = 'weak'; saveSettings(); refreshHome(); };
$('stat-star-box').onclick = () => { settings.src = 'star'; saveSettings(); refreshHome(); };
$('btn-action').onclick = next;
$('btn-end').onclick = showResult;
$('btn-back').onclick = () => { refreshHome(); show('home'); };
$('btn-star').onclick = toggleStar;
$('btn-retry-wrong').onclick = () => {
  const items = quiz.wrong.map(w => w.src);
  const keep = settings.count; settings.count = 'all';
  startQuiz(items); settings.count = keep;
};
$('btn-home').onclick = () => { refreshHome(); show('home'); };
document.querySelectorAll('.btn-to-home').forEach(b => b.onclick = () => { refreshHome(); show('home'); });
$('btn-reset').onclick = () => {
  if (!confirm('確定要清除所有練習紀錄(不熟、星號)嗎?')) return;
  stats = {}; stars = new Set(); saveJSON(STATS_KEY, stats); saveJSON(STAR_KEY, []);
  refreshHome(); show('home');
};
$('app-ver').textContent = document.querySelector('meta[name=app-version]').content;

refreshHome();
show('home');
