// 數學觀念題庫(依「數與式」筆記:絕對值、封閉性、分點公式、算幾不等式、有理數、無理數)
// 一般題:options 第一個是正確答案(出題時會打亂);選解法題:選項順序固定,ans 是正確選項的位置。
// 數學式寫在 $...$ 裡,用 KaTeX 顯示。\Q = 有理數、\Qb = 無理數(巨集在 app.js 設定)。
const R = String.raw;

const TOPICS = [
  { id: 'abs', name: '絕對值' },
  { id: 'closure', name: '封閉性' },
  { id: 'section', name: '分點公式' },
  { id: 'amgm', name: '算幾不等式' },
  { id: 'rational', name: '有理數' },
  { id: 'irrational', name: '無理數・乘法公式' },
];
const TYPES = [
  { id: 'method', name: '選解法' },
  { id: 'cause', name: '因果關係' },
  { id: 'blank', name: '挖空填選' },
  { id: 'judge', name: '判斷對錯' },
  { id: 'calc', name: '計算' },
];
// 首頁的「題型」選擇:觀念題 = 選解法、因果關係、判斷對錯;練習題 = 挖空、計算
const CONCEPT_TYPES = ['method', 'cause', 'judge'];

const M_ABS = ['解法一:討論正負', '解法二:距離法', '解法三:平方法'];
const M_AMGM = ['用途①:和積互換', '用途②:倒數和', '不能直接用算幾'];
const M_CMP = ['平方比', '倒數比(有理化)'];

const QUESTIONS = [];
const counters = {};
function nextId(topic) { counters[topic] = (counters[topic] || 0) + 1; return topic + '-' + counters[topic]; }
// 一般題:opts[0] 為正確答案
function q(topic, type, text, opts, explain) {
  QUESTIONS.push({ id: nextId(topic), topic, type, q: text, options: opts, ans: 0, explain, fixed: false });
}
// 選解法題:固定選項
function mq(topic, text, opts, ans, explain) {
  QUESTIONS.push({ id: nextId(topic), topic, type: 'method', q: text, options: opts, ans, explain, fixed: true });
}

// ================= 絕對值 =================
mq('abs', R`解 $|x-1|<3$,最適合用哪一種方法?`, M_ABS, 1,
  R`形如 $|x-a|<b$($b$ 是正的常數)→ 想成「$x$ 到 $1$ 的距離小於 $3$」。從 $1$ 往左右各走 $3$:$-2<x<4$。`);
mq('abs', R`解 $|x-4|\ge 5$,最適合用哪一種方法?`, M_ABS, 1,
  R`「$x$ 到 $4$ 的距離 $\ge5$」→ $x\ge9$ 或 $x\le-1$。($|x-a|\ge b \iff x\ge a+b$ 或 $x\le a-b$)`);
mq('abs', R`解 $|x+5|<2$,最適合用哪一種方法?`, M_ABS, 1,
  R`$|x-(-5)|<2$:$x$ 到 $-5$ 的距離小於 $2$,所以 $-7<x<-3$。`);
mq('abs', R`解 $|2x-1|<|x+2|$,最適合用哪一種方法?`, M_ABS, 2,
  R`兩邊都是絕對值,一定都 $\ge0$,可以放心平方($|a|\ge|b| \Rightarrow a^2\ge b^2$)。$(2x-1)^2<(x+2)^2 \Rightarrow 3x^2-8x-3<0 \Rightarrow (3x+1)(x-3)<0$,得 $-\frac13<x<3$。`);
mq('abs', R`解 $|x+1|=|2x-4|$,最適合用哪一種方法?`, M_ABS, 2,
  R`兩邊都是絕對值 → 平方法。$(x+1)^2=(2x-4)^2 \Rightarrow 3x^2-18x+15=0 \Rightarrow x^2-6x+5=0$,$x=1$ 或 $x=5$。`);
mq('abs', R`解 $|3x-1|\ge|x+5|$,最適合用哪一種方法?`, M_ABS, 2,
  R`兩邊都是絕對值 → 平方:$(3x-1)^2\ge(x+5)^2 \Rightarrow 8x^2-16x-24\ge0 \Rightarrow (x-3)(x+1)\ge0$,$x\ge3$ 或 $x\le-1$。`);
mq('abs', R`解 $|x+3|\le 2x$,最適合用哪一種方法?`, M_ABS, 0,
  R`右邊 $2x$ 正負不確定。筆記提醒:<b>$|a|\ge b$ 不確定 $b$ 的正負,不可平方</b>,$2x$ 也不是常數,不能直接用距離法 → 討論 $x+3$ 的正負。答案 $x\ge3$。`);
mq('abs', R`解 $|x-1|=2x-5$,最適合用哪一種方法?`, M_ABS, 0,
  R`右邊含 $x$、正負不確定 → 討論正負:$x\ge1$ 時 $x-1=2x-5$,$x=4$ ✓;$x<1$ 時 $1-x=2x-5$,$x=2$(不合)。所以 $x=4$。`);
mq('abs', R`解 $|x-2|+|2x+1|=6$,最適合用哪一種方法?`, M_ABS, 0,
  R`有兩個絕對值、$x$ 的係數又不同,不是單純的距離 → 用分界點 $x=-\frac12$、$x=2$ 分段討論正負。答案 $x=\frac73$ 或 $x=-\frac53$。`);
mq('abs', R`已知 $x<3$,化簡 $|x-3|$,要用哪一種方法?`, M_ABS, 0,
  R`由定義討論正負:$x<3$ 時 $x-3<0$,所以 $|x-3|=-(x-3)=3-x$。`);
mq('abs', R`求滿足 $|x|>x$ 的所有實數 $x$,最適合用哪一種方法?`, M_ABS, 0,
  R`討論正負:$x\ge0$ 時 $|x|=x$,不會大於 $x$;$x<0$ 時 $|x|=-x>0>x$ 成立。所以 $x<0$。`);
mq('abs', R`把「$3\le x\le 7$」改寫成一個絕對值不等式,要用哪一種方法的觀念?`, M_ABS, 1,
  R`距離法③:$n\le x\le m \iff \left|x-\frac{m+n}{2}\right|\le\frac{m-n}{2}$。中點 $5$、距離的一半 $2$,所以 $|x-5|\le2$。`);
mq('abs', R`「數線上點 $x$ 到 $-2$ 的距離不超過 $4$」,求 $x$ 的範圍,最適合用哪一種方法?`, M_ABS, 1,
  R`就是 $|x+2|\le4$:從 $-2$ 往左右各走 $4$,$-6\le x\le2$。`);

q('abs', 'calc', R`解 $|x-1|<3$。`,
  [R`$-2<x<4$`, R`$-4<x<2$`, R`$x<-2$ 或 $x>4$`, R`$2<x<4$`],
  R`$x$ 到 $1$ 的距離小於 $3$:$1-3<x<1+3$。`);
q('abs', 'calc', R`$2\le x\le 8$ 可以寫成哪一個絕對值不等式?`,
  [R`$|x-5|\le3$`, R`$|x-3|\le5$`, R`$|x-5|\le6$`, R`$|x+5|\le3$`],
  R`中點 $\frac{2+8}{2}=5$,距離的一半 $\frac{8-2}{2}=3$。`);
q('abs', 'calc', R`「$x\ge7$ 或 $x\le-1$」可以寫成哪一個絕對值不等式?`,
  [R`$|x-3|\ge4$`, R`$|x-3|\le4$`, R`$|x-4|\ge3$`, R`$|x+3|\ge4$`],
  R`中點 $\frac{7+(-1)}{2}=3$,距離的一半 $\frac{7-(-1)}{2}=4$;在兩端外面 → 用「$\ge$」。`);

q('abs', 'blank', R`距離法:$|x-a|\le b \iff$ ___($b>0$)`,
  [R`$a-b\le x\le a+b$`, R`$x\le a-b$ 或 $x\ge a+b$`, R`$b-a\le x\le a+b$`, R`$-a-b\le x\le b-a$`],
  R`$x$ 到 $a$ 的距離不超過 $b$:從 $a$ 往左右各走 $b$。`);
q('abs', 'blank', R`距離法:$|x-a|\ge b \iff$ ___($b>0$)`,
  [R`$x\ge a+b$ 或 $x\le a-b$`, R`$a-b\le x\le a+b$`, R`$x\ge b-a$ 或 $x\le -a-b$`, R`$x\ge a$ 或 $x\le -a$`],
  R`距離至少 $b$ → 在 $a-b$ 的左邊或 $a+b$ 的右邊。`);
q('abs', 'blank', R`$n\le x\le m \iff \left|x-\square\right|\le\frac{m-n}{2}$,$\square$ 是什麼?`,
  [R`$\frac{m+n}{2}$`, R`$\frac{m-n}{2}$`, R`$m+n$`, R`$\frac{n-m}{2}$`],
  R`$\square$ 是兩端點的<b>中點</b> $\frac{m+n}{2}$。`);
q('abs', 'blank', R`$n\le x\le m \iff \left|x-\frac{m+n}{2}\right|\le\square$,$\square$ 是什麼?`,
  [R`$\frac{m-n}{2}$`, R`$\frac{m+n}{2}$`, R`$m-n$`, R`$\frac{n-m}{2}$`],
  R`$\square$ 是<b>距離的一半</b>:大減小再除以 $2$。`);
q('abs', 'blank', R`$x\ge m$ 或 $x\le n$($m>n$)$\iff \left|x-\frac{m+n}{2}\right|$ ___ $\frac{m-n}{2}$`,
  [R`$\ge$`, R`$\le$`, R`$=$`, R`$<$`],
  R`$x$ 在兩端點外面,離中點的距離大於等於一半長 → $\ge$。`);
q('abs', 'blank', R`數線上 $A(a)$、$B(b)$,則 $\overline{AB}=$ ___`,
  [R`$|a-b|$`, R`$a-b$`, R`$b-a$`, R`$a+b$`],
  R`距離一定 $\ge0$,要加絕對值:$\overline{AB}=|a-b|\ge0$。`);
q('abs', 'blank', R`設 $x\in\mathbb{R}$,若 $x\le0$,則 $|x|=$ ___`,
  [R`$-x$`, R`$x$`, R`$0$`, R`$\pm x$`],
  R`討論正負:$x\ge0 \Rightarrow |x|=x$;$x\le0 \Rightarrow |x|=-x$。`);
q('abs', 'cause', R`$\left|x-\frac{m+n}{2}\right|\le\frac{m-n}{2}$ 中,$\frac{m+n}{2}$ 代表 ___`,
  ['兩端點的中點', '兩端點的距離', '兩端點距離的一半', '兩端點的和'],
  R`$\frac{m+n}{2}$ 是中點,$\frac{m-n}{2}$ 才是距離的一半。`);

q('abs', 'judge', R`平方法:下列哪一個推論「不一定」成立?`,
  [R`$|a|\ge b \Rightarrow a^2\ge b^2$`, R`$|a|\ge|b| \Rightarrow a^2\ge b^2$`, R`$a^2\ge b^2 \Rightarrow |a|\ge|b|$`, R`$a\ge|b| \Rightarrow a^2\ge b^2$`],
  R`<b>不確定 $b$ 的正負不可平方。</b>反例:$a=1,\ b=-3$,$|1|\ge-3$ 成立,但 $1^2\ge(-3)^2$ 不成立。`);
q('abs', 'cause', R`已知 $|a|\ge b$,為什麼「不能」直接推出 $a^2\ge b^2$?`,
  [R`因為不確定 $b$ 的正負`, R`因為 $|a|$ 可能是負的`, R`因為 $a^2$ 一定大於 $|a|$`, R`因為不等式兩邊永遠不能平方`],
  R`$|a|\ge0$ 沒問題,但 $b$ 可能是負數,例如 $|1|\ge-3$,平方後 $1\ge9$ 錯。兩邊都 $\ge0$ 才能平方。`);
q('abs', 'cause', R`為什麼 $|a|\ge|b| \Rightarrow a^2\ge b^2$ 一定成立?`,
  [R`因為兩邊都 $\ge0$,平方後大小不變`, R`因為 $a$、$b$ 都是正數`, R`因為 $a\ge b$`, R`因為絕對值可以直接拿掉`],
  R`兩個非負數比大小,平方後大小關係不變,而且 $|a|^2=a^2$。`);
q('abs', 'judge', R`下列敘述何者正確?`,
  [R`$a^2\ge b^2 \Rightarrow |a|\ge|b|$`, R`$a^2\ge b^2 \Rightarrow a\ge b$`, R`$a\ge b \Rightarrow a^2\ge b^2$`, R`$|a|\ge b \Rightarrow a^2\ge b^2$`],
  R`開根號會得到絕對值:$\sqrt{a^2}=|a|$。反例:$a=-3,b=1$ 時 $a^2\ge b^2$ 但 $a<b$;$a=1,b=-3$ 時 $a\ge b$ 但 $a^2<b^2$。`);

// ================= 封閉性 =================
const IN_Q = R`$\in\Q$`, IN_QB = R`$\in\Qb$`;
q('closure', 'cause', R`若 $a\in\Q$、$b\in\Q$,則 $a+b$ ___`,
  [IN_Q, IN_QB, '不一定', '一定是整數'],
  R`有理數對加、減、乘、除(除數 $\ne0$)都有封閉性。`);
q('closure', 'cause', R`若 $a\in\Q$、$b\in\Q$ 且 $b\ne0$,則 $\frac ab$ ___`,
  [IN_Q, IN_QB, '不一定', '一定是整數'],
  R`有理數 ÷ 非零有理數 仍是有理數(封閉性)。`);
q('closure', 'cause', R`若 $a\in\Q$、$b\in\Qb$,則 $a+b$ ___`,
  [IN_QB, IN_Q, '不一定', R`$=0$`],
  R`有理數 + 無理數 = 無理數。(若 $a+b\in\Q$,則 $b=(a+b)-a\in\Q$,矛盾)`);
q('closure', 'cause', R`若 $a\in\Q$、$b\in\Qb$,則 $a-b$ ___`,
  [IN_QB, IN_Q, '不一定', R`$=0$`],
  R`有理數 − 無理數 = 無理數。`);
q('closure', 'cause', R`若 $a\in\Q$、$b\in\Qb$ 且 $a\ne0$,則 $ab$ ___`,
  [IN_QB, IN_Q, '不一定', '一定是正數'],
  R`非零有理數 × 無理數 = 無理數。注意 $a\ne0$:$0\times\sqrt2=0$ 是有理數。`);
q('closure', 'cause', R`若 $a\in\Qb$、$b\in\Qb$,則 $a+b$ ___`,
  ['不一定', IN_QB, IN_Q, R`$=0$`],
  R`無理數沒有封閉性。<b>檢查用 $2+\sqrt3$ 和 $2-\sqrt3$</b>:相加 $=4\in\Q$;而 $\sqrt2+\sqrt3\in\Qb$。`);
q('closure', 'cause', R`若 $a\in\Qb$、$b\in\Qb$,則 $ab$ ___`,
  ['不一定', IN_QB, IN_Q, '一定是負數'],
  R`$(2+\sqrt3)(2-\sqrt3)=4-3=1\in\Q$,但 $\sqrt2\cdot\sqrt3=\sqrt6\in\Qb$。`);
q('closure', 'cause', R`想說明「兩個無理數相加不一定是無理數」,下列哪一組可以當例子?`,
  [R`$2+\sqrt3$ 和 $2-\sqrt3$`, R`$\sqrt2$ 和 $\sqrt3$`, R`$\sqrt2$ 和 $2\sqrt2$`, R`$\pi$ 和 $2\pi$`],
  R`$(2+\sqrt3)+(2-\sqrt3)=4$ 是有理數;其他三組相加都還是無理數。`);
q('closure', 'cause', R`想說明「兩個無理數相乘不一定是無理數」,下列哪一組可以當例子?`,
  [R`$2+\sqrt3$ 和 $2-\sqrt3$`, R`$\sqrt2$ 和 $\sqrt3$`, R`$\sqrt2$ 和 $\sqrt5$`, R`$\pi$ 和 $\sqrt2$`],
  R`$(2+\sqrt3)(2-\sqrt3)=1$ 是有理數。`);
q('closure', 'cause', R`「$a\in\Q$、$b\in\Qb \Rightarrow ab\in\Qb$」為什麼要加上條件 $a\ne0$?`,
  [R`因為 $0\times b=0$ 是有理數`, R`因為 $0$ 不是有理數`, R`因為分母不能是 $0$`, R`因為 $b$ 可能是 $0$`],
  R`$0$ 乘任何數都是 $0$,而 $0\in\Q$。`);
q('closure', 'cause', R`若 $a\in\Q$,且 $a+b\in\Qb$,則 $b$ ___`,
  [IN_QB, IN_Q, '不一定', R`$=0$`],
  R`反過來想:若 $b\in\Q$,則 $a+b$ 是兩個有理數相加,會是有理數,矛盾。所以 $b\in\Qb$。`);
q('closure', 'cause', R`若 $a\in\Qb$,且 $a+b\in\Q$,則 $b$ ___`,
  [IN_QB, IN_Q, '不一定', R`一定 $=-a$`],
  R`$b=(a+b)-a$ 是「有理數 − 無理數」,所以 $b\in\Qb$。例如 $a=\sqrt2$、$b=3-\sqrt2$。`);
q('closure', 'judge', R`下列敘述何者正確?`,
  [R`有理數對加、減、乘、除(除數 $\ne0$)都有封閉性`, '無理數對加法有封閉性', '無理數對乘法有封閉性', '有理數加無理數可能是有理數'],
  R`有理數有封閉性;無理數沒有(用 $2\pm\sqrt3$ 檢查);有理數 + 無理數一定是無理數。`);
q('closure', 'cause', R`$a\in\Q$、$b\in\Qb \Rightarrow ab\in\Qb$,條件是 ___`,
  [R`$a\ne0$`, R`$b\ne0$`, R`$a>0$`, R`$a$ 是整數`],
  R`筆記:$a\in\Q,\ b\in\Qb \Rightarrow a\pm b,\ a\times b,\ \cdots\in\Qb$ $(a\ne0)$。`);
q('closure', 'judge', R`有理數有稠密性、封閉性;無理數有稠密性,___ 封閉性。`,
  ['沒有', '有', '只有加法有', '只有乘法有'],
  R`無理數沒有封閉性,例如 $\sqrt2\times\sqrt2=2$。`);
q('closure', 'cause', R`$a,b\in\Qb$ 時,$a\pm b$、$ab$ 不一定是無理數,筆記建議用 ___ 來檢查。`,
  [R`$2+\sqrt3$ 和 $2-\sqrt3$`, R`$\sqrt2$ 和 $\sqrt3$`, R`$1$ 和 $\sqrt3$`, R`$0$ 和 $\sqrt3$`],
  R`$(2+\sqrt3)+(2-\sqrt3)=4$、$(2+\sqrt3)(2-\sqrt3)=1$,都變成有理數。($1$、$0$ 不是無理數)`);

// ================= 分點公式 =================
q('section', 'blank', R`數線上 $A(a)$、$B(b)$,$C(c)$ 在 $\overline{AB}$ 上且 $\overline{AC}:\overline{CB}=m:n$,則 $c=$ ___`,
  [R`$\frac{mb+na}{m+n}$`, R`$\frac{ma+nb}{m+n}$`, R`$\frac{mb+na}{m-n}$`, R`$\frac{m+n}{mb+na}$`],
  R`交叉相乘:靠近 $A$ 那段的比 $m$ 乘遠端 $b$,$n$ 乘 $a$,再除以 $m+n$。`);
q('section', 'blank', R`$A(a)$、$B(b)$ 的中點是 ___`,
  [R`$\frac{a+b}{2}$`, R`$\frac{a-b}{2}$`, R`$\frac{b-a}{2}$`, R`$a+b$`],
  R`$m:n=1:1$ 代入分點公式。`);
q('section', 'judge', R`設 $a<b$,下列何者「一定」正確?`,
  [R`$a<\frac{2a+b}{3}<\frac{a+2b}{3}<b$`, R`$a<\frac{a+b}{3}<b$`, R`$a<\frac{a+b}{3}<\frac{a+2b}{3}<b$`, R`$a<\frac{2a+b}{2}<b$`],
  R`$\frac{2a+b}{3}$、$\frac{a+2b}{3}$ 是三等分點(係數和為 $1$),一定在 $a$、$b$ 之間。$\frac{a+b}{3}$ 的係數和是 $\frac23$,不是分點,例如 $a=6,b=9$ 時 $\frac{a+b}{3}=5<a$。`);
q('section', 'cause', R`為什麼 $a<\frac{a+b}{3}<b$ 不一定成立?`,
  [R`$\frac{a+b}{3}$ 不是分點公式(係數和不是 $1$),不一定在兩點之間`, R`因為 $a$、$b$ 可能相等`, R`因為分母 $3$ 太大`, R`因為 $a$、$b$ 一定是正數`],
  R`分點公式 $\frac{mb+na}{m+n}$ 的兩個係數 $\frac{m}{m+n}+\frac{n}{m+n}=1$;$\frac{a+b}{3}=\frac13a+\frac13b$ 係數和 $\frac23$,只是「像」分點。`);
q('section', 'calc', R`$\frac{2a+b}{3}$ 是 $A(a)$、$B(b)$ 之間的哪一個點?`,
  [R`靠近 $A$ 的三等分點($\overline{AC}:\overline{CB}=1:2$)`, R`靠近 $B$ 的三等分點($\overline{AC}:\overline{CB}=2:1$)`, '中點', R`在 $\overline{AB}$ 外面`],
  R`$c=\frac{mb+na}{m+n}$:$b$ 的係數 $m=1$、$a$ 的係數 $n=2$,$m:n=1:2$,靠近 $A$。`);
q('section', 'calc', R`$c=\frac{3a+2b}{5}$,則 $\overline{AC}:\overline{CB}=$?`,
  [R`$2:3$`, R`$3:2$`, R`$1:1$`, R`$5:2$`],
  R`$b$ 的係數是 $m=2$,$a$ 的係數是 $n=3$,所以 $m:n=2:3$。`);

// ================= 算幾不等式 =================
q('amgm', 'cause', R`算幾不等式 $\frac{a+b}{2}\ge\sqrt{ab}$ 的前提條件是 ___`,
  [R`$a,b>0$`, R`$a,b$ 為任意實數`, R`$a>b$`, R`$a+b>0$`],
  R`要 $a,b>0$。例如 $a=b=-1$:左邊 $-1$、右邊 $1$,不成立。`);
q('amgm', 'blank', R`算幾不等式 $\frac{a+b}{2}\ge\sqrt{ab}$,等號成立於 ___`,
  [R`$a=b$`, R`$a=0$`, R`$a=-b$`, R`$ab=1$`],
  R`$\frac{a+b}{2}-\sqrt{ab}=\frac{(\sqrt a-\sqrt b)^2}{2}\ge0$,等號在 $a=b$。`);
q('amgm', 'blank', R`算幾不等式的用途:把「相加」轉換成 ___`,
  ['相乘', '相減', '相除', '平方'],
  R`筆記:相加 → 相乘(左邊是和、右邊是積)。`);
mq('amgm', R`已知 $x,y>0$,$2x+3y=12$,求 $xy$ 的最大值,屬於算幾的哪一種用途?`, M_AMGM, 0,
  R`和 $2x+3y$ 固定 → 積有最大值:和積互換。`);
mq('amgm', R`已知 $x>0$,求 $x+\frac4x$ 的最小值,屬於哪一種用途?`, M_AMGM, 1,
  R`$x\cdot\frac4x=4$ 是定值 → 倒數和有最小值。`);
mq('amgm', R`已知 $x,y>0$,$xy=8$,求 $x+2y$ 的最小值,屬於哪一種用途?`, M_AMGM, 0,
  R`積 $x\cdot2y=16$ 固定 → 和有最小值:$\frac{x+2y}{2}\ge\sqrt{16}=4$,最小值 $8$($x=2y=4$)。`);
mq('amgm', R`已知 $x<0$,求 $x+\frac4x$ 的最小值,可以直接用算幾不等式嗎?`, M_AMGM, 2,
  R`算幾要 $a,b>0$。$x<0$ 時 $x$、$\frac4x$ 都是負的,不能直接用。(其實 $x+\frac4x\le-4$,只有最大值)`);
mq('amgm', R`已知 $x>0$,求 $4x+\frac9x$ 的最小值,屬於哪一種用途?`, M_AMGM, 1,
  R`$4x\cdot\frac9x=36$ 是定值:$\frac{4x+\frac9x}{2}\ge6$,最小值 $12$($x=\frac32$)。`);
mq('amgm', R`已知 $a,b>0$,$a+b=10$,求 $ab$ 的最大值,屬於哪一種用途?`, M_AMGM, 0,
  R`和固定 → 積最大:$\frac{a+b}{2}\ge\sqrt{ab}$,$ab\le25$($a=b=5$)。`);
q('amgm', 'calc', R`已知 $x,y>0$,$2x+3y=12$,則 $xy$ 的最大值是?`,
  ['6', '12', '36', '3'],
  R`$\frac{2x+3y}{2}\ge\sqrt{6xy} \Rightarrow 6\ge\sqrt{6xy} \Rightarrow 36\ge6xy \Rightarrow xy\le6$。`);
q('amgm', 'calc', R`已知 $x,y>0$,$2x+3y=12$,$xy$ 有最大值時 $(x,y)=$?`,
  [R`$(3,2)$`, R`$(2,3)$`, R`$(6,4)$`, R`$(1.5,3)$`],
  R`等號成立於 $2x=3y$,又 $2x+3y=12$,所以 $2x=3y=6$,$x=3$、$y=2$。`);
q('amgm', 'calc', R`已知 $x>0$,$x+\frac4x$ 的最小值與此時的 $x$ 是?`,
  [R`最小值 $4$,$x=2$`, R`最小值 $2$,$x=4$`, R`最小值 $4$,$x=4$`, R`最小值 $5$,$x=1$`],
  R`$\frac{x+\frac4x}{2}\ge\sqrt4=2 \Rightarrow x+\frac4x\ge4$;等號 $x=\frac4x$,$x^2=4$,$x=2$。`);
q('amgm', 'calc', R`已知 $x,y>0$,$2x+3y=12$,則 $x^2y$ 的最大值是?(提示:拆成 $x+x+3y$)`,
  [R`$\frac{64}{3}$`, R`$64$`, R`$\frac{32}{3}$`, R`$16$`],
  R`$\frac{x+x+3y}{3}\ge\sqrt[3]{3x^2y} \Rightarrow 4\ge\sqrt[3]{3x^2y} \Rightarrow x^2y\le\frac{64}{3}$;等號 $x=3y=4$,$(x,y)=(4,\frac43)$。`);

// ================= 有理數 =================
q('rational', 'blank', R`循環小數化分數:$a.bc\overline{def}=\dfrac{\square}{99900}$,$\square$ 是?`,
  [R`$abcdef-abc$`, R`$abcdef-ab$`, R`$abcdef$`, R`$def-bc$`],
  R`分子 = 全部數字 − 不循環的部分($abc$)。分母:循環 3 位 → 三個 $9$;小數點後不循環 2 位 → 兩個 $0$。`);
q('rational', 'blank', R`$0.12\overline{345}$ 化成分數時,分母是?`,
  ['99900', '999', '9990000', '99999'],
  R`循環 3 位(345)→ 999;不循環 2 位(12)→ 00。分母 99900。`);
q('rational', 'calc', R`$1.98\overline{7}=$?`,
  [R`$\frac{1987-198}{900}$`, R`$\frac{1987-19}{900}$`, R`$\frac{1987-198}{999}$`, R`$\frac{1987}{900}$`],
  R`循環 1 位 → 一個 9;不循環 2 位(98)→ 兩個 0;分子 $1987-198$。結果 $\frac{1789}{900}$。`);
q('rational', 'cause', R`最簡分數 $\frac pq$ 可以化成有限小數,條件是分母 $q$ ___`,
  [R`只有質因數 $2$ 或 $5$($q=2^m\times5^n$)`, '是偶數', R`是 $10$ 的倍數`, R`只有質因數 $2$ 或 $3$`],
  R`筆記:分母只有 $2^m\times5^n$($m,n$ 為正整數或 $0$)。`);
q('rational', 'judge', R`下列哪一個分數可以化成有限小數?`,
  [R`$\frac{7}{40}$`, R`$\frac{1}{12}$`, R`$\frac{5}{14}$`, R`$\frac{3}{7}$`],
  R`$40=2^3\times5$,只有 2 和 5;$12=2^2\times3$、$14=2\times7$、$7$ 都有其他質因數。`);
q('rational', 'judge', R`下列哪一個分數可以化成有限小數?(小心:先約分!)`,
  [R`$\frac{21}{30}$`, R`$\frac{1}{6}$`, R`$\frac{2}{15}$`, R`$\frac{5}{18}$`],
  R`$\frac{21}{30}=\frac{7}{10}$,分母 $10=2\times5$。其他約分後分母還有 $3$。`);
q('rational', 'judge', R`下列敘述何者正確?`,
  ['無限循環小數是有理數', '無限小數都是無理數', R`$\frac{22}{7}$ 是無理數`, R`$\sqrt4$ 是無理數`],
  R`循環小數都可以化成分數,所以是有理數;無限「不」循環小數才是無理數。`);
q('rational', 'blank', R`有理數具有稠密性和 ___`,
  ['封閉性', '不連續性', '循環性', '有限性'],
  R`筆記:有理數有稠密性、封閉性。`);

// ================= 無理數・乘法公式 =================
q('irrational', 'blank', R`雙重根號:$\sqrt{a+b-2\sqrt{ab}}=$ ___($a,b>0$)`,
  [R`$|\sqrt a-\sqrt b|$`, R`$\sqrt a-\sqrt b$`, R`$\sqrt a+\sqrt b$`, R`$a-b$`],
  R`開根號的結果一定 $\ge0$,所以要加絕對值(大的減小的)。`);
q('irrational', 'calc', R`$\sqrt{5+2\sqrt6}=$?`,
  [R`$\sqrt3+\sqrt2$`, R`$\sqrt5+\sqrt6$`, R`$\sqrt3-\sqrt2$`, R`$\sqrt6+1$`],
  R`找兩數「和 $5$、積 $6$」:$3$ 和 $2$。`);
q('irrational', 'calc', R`$\sqrt{7-2\sqrt{10}}=$?`,
  [R`$\sqrt5-\sqrt2$`, R`$\sqrt2-\sqrt5$`, R`$\sqrt7-\sqrt{10}$`, R`$\sqrt5+\sqrt2$`],
  R`和 $7$、積 $10$:$5$ 和 $2$;減號要大減小:$\sqrt5-\sqrt2$。`);
q('irrational', 'calc', R`$\sqrt{4-2\sqrt3}=$?`,
  [R`$\sqrt3-1$`, R`$1-\sqrt3$`, R`$2-\sqrt3$`, R`$\sqrt3+1$`],
  R`和 $4$、積 $3$:$3$ 和 $1$。$\sqrt3>1$,所以是 $\sqrt3-1$。`);
q('irrational', 'calc', R`$\sqrt{6+4\sqrt2}=$?`,
  [R`$2+\sqrt2$`, R`$\sqrt6+2$`, R`$4+\sqrt2$`, R`$\sqrt3+\sqrt2$`],
  R`先把根號前的係數變成 $2$:$4\sqrt2=2\sqrt8$。和 $6$、積 $8$:$4$ 和 $2$,$\sqrt4+\sqrt2=2+\sqrt2$。`);
q('irrational', 'judge', R`下列敘述何者正確?`,
  [R`$\sqrt{(\sqrt3-\sqrt5)^2}=\sqrt5-\sqrt3$`, R`$\sqrt{(\sqrt3-\sqrt5)^2}=\sqrt3-\sqrt5$`, R`$\sqrt{8-2\sqrt{15}}=\sqrt3-\sqrt5$`, R`$\sqrt{a^2}=a$ 對所有實數 $a$ 都成立`],
  R`$\sqrt{x^2}=|x|$,結果一定 $\ge0$:$|\sqrt3-\sqrt5|=\sqrt5-\sqrt3$。`);
q('irrational', 'cause', R`相等原則:$a+b\sqrt2=c+d\sqrt2 \Rightarrow a=c,\ b=d$,前提是 ___`,
  [R`$a,b,c,d$ 都是有理數`, R`$a,b,c,d$ 都是正數`, R`$a,b,c,d$ 都是無理數`, R`$a\ne c$`],
  R`反例:$3+0\cdot\sqrt2=1+\sqrt2\cdot\sqrt2$,但 $3\ne1$(這裡 $d=\sqrt2$ 不是有理數)。`);
q('irrational', 'calc', R`若 $x,y\in\Q$,$(x-1)+(y+2)\sqrt3=4+5\sqrt3$,則 $(x,y)=$?`,
  [R`$(5,3)$`, R`$(3,5)$`, R`$(5,7)$`, R`$(4,5)$`],
  R`相等原則:$x-1=4$、$y+2=5$。`);
q('irrational', 'judge', R`無理數的小數表示是 ___`,
  ['無限不循環小數', '無限循環小數', '有限小數', '有限或循環小數'],
  R`能寫成分數(有限或循環小數)的是有理數;無限不循環小數才是無理數。`);
mq('irrational', R`比較 $\sqrt3+\sqrt7$ 與 $\sqrt2+\sqrt8$ 的大小,最適合用?`, M_CMP, 0,
  R`兩邊都是正數相加 → 平方比:$10+2\sqrt{21}$ 對 $10+2\sqrt{16}$,所以 $\sqrt3+\sqrt7$ 較大。`);
mq('irrational', R`比較 $\sqrt7-\sqrt6$ 與 $\sqrt6-\sqrt5$ 的大小,最適合用?`, M_CMP, 1,
  R`根號相減 → 倒數比(有理化):$\frac{1}{\sqrt7-\sqrt6}=\sqrt7+\sqrt6$ 較大;倒數大的反而小,所以 $\sqrt7-\sqrt6<\sqrt6-\sqrt5$。`);
mq('irrational', R`比較 $\sqrt5+\sqrt{11}$ 與 $\sqrt6+\sqrt{10}$ 的大小,最適合用?`, M_CMP, 0,
  R`平方:$16+2\sqrt{55}$ 對 $16+2\sqrt{60}$,所以 $\sqrt6+\sqrt{10}$ 較大。`);
mq('irrational', R`比較 $\sqrt{11}-\sqrt{10}$ 與 $\sqrt{10}-3$ 的大小,最適合用?`, M_CMP, 1,
  R`倒數:$\sqrt{11}+\sqrt{10}$ 對 $\sqrt{10}+\sqrt9$,前者較大,所以 $\sqrt{11}-\sqrt{10}$ 較小。`);
q('irrational', 'calc', R`$\sqrt3+\sqrt7$ 和 $\sqrt2+\sqrt8$ 哪個大?`,
  [R`$\sqrt3+\sqrt7$ 較大`, R`$\sqrt2+\sqrt8$ 較大`, '一樣大', '無法比較'],
  R`平方:$10+2\sqrt{21}$ 對 $10+2\sqrt{16}$,$21>16$。`);
q('irrational', 'calc', R`$\sqrt7-\sqrt6$ 和 $\sqrt6-\sqrt5$ 哪個大?`,
  [R`$\sqrt6-\sqrt5$ 較大`, R`$\sqrt7-\sqrt6$ 較大`, '一樣大', '無法比較'],
  R`倒數比:$\sqrt7+\sqrt6>\sqrt6+\sqrt5$,倒數大的原數小。`);
q('irrational', 'blank', R`根數比大小,筆記上的兩種方法是 ___`,
  ['平方比、倒數比', '通分比、約分比', '直接相減比', '取絕對值比'],
  R`相加的用平方比,相減的用倒數比(有理化)。`);
q('irrational', 'blank', R`乘法公式:$a^3+b^3=(a+b)(\ \square\ )$`,
  [R`$a^2-ab+b^2$`, R`$a^2+ab+b^2$`, R`$a^2+2ab+b^2$`, R`$a^2-2ab+b^2$`],
  R`立方和:$(a+b)(a^2-ab+b^2)$,中間是「減」。`);
q('irrational', 'blank', R`乘法公式:$a^3-b^3=(a-b)(\ \square\ )$`,
  [R`$a^2+ab+b^2$`, R`$a^2-ab+b^2$`, R`$a^2-2ab+b^2$`, R`$a^2+2ab+b^2$`],
  R`立方差:$(a-b)(a^2+ab+b^2)$,中間是「加」。`);
q('irrational', 'blank', R`乘法公式:$(a+b)^3=a^3+b^3+\square$`,
  [R`$3ab(a+b)$`, R`$3ab(a-b)$`, R`$3ab$`, R`$ab(a+b)$`],
  R`$(a+b)^3=a^3+3a^2b+3ab^2+b^3=a^3+b^3+3ab(a+b)$。`);
q('irrational', 'blank', R`乘法公式:$(a-b)^3=a^3-b^3-\square$`,
  [R`$3ab(a-b)$`, R`$3ab(a+b)$`, R`$3ab$`, R`$-3ab(a-b)$`],
  R`$(a-b)^3=a^3-3a^2b+3ab^2-b^3=a^3-b^3-3ab(a-b)$。`);
q('irrational', 'blank', R`乘法公式:$(a+b+c)^2=a^2+b^2+c^2+\square$`,
  [R`$2ab+2bc+2ca$`, R`$ab+bc+ca$`, R`$2abc$`, R`$2(a+b+c)$`],
  R`每兩個相乘再乘 $2$。`);
q('irrational', 'calc', R`若 $a+b=3$、$ab=1$,則 $a^3+b^3=$?`,
  ['18', '27', '24', '36'],
  R`$a^3+b^3=(a+b)^3-3ab(a+b)=27-9=18$。`);
q('irrational', 'calc', R`若 $a-b=2$、$ab=3$,則 $a^3-b^3=$?`,
  ['26', '8', '14', '-10'],
  R`$(a-b)^3=a^3-b^3-3ab(a-b) \Rightarrow a^3-b^3=8+18=26$。`);
q('irrational', 'calc', R`若 $x+\frac1x=3$,則 $x^3+\frac1{x^3}=$?`,
  ['18', '27', '36', '24'],
  R`$\left(x+\frac1x\right)^3=x^3+\frac1{x^3}+3\left(x+\frac1x\right) \Rightarrow 27=x^3+\frac1{x^3}+9$。`);
q('irrational', 'calc', R`若 $a+b+c=6$、$ab+bc+ca=11$,則 $a^2+b^2+c^2=$?`,
  ['14', '25', '36', '58'],
  R`$(a+b+c)^2=a^2+b^2+c^2+2(ab+bc+ca) \Rightarrow 36=a^2+b^2+c^2+22$。`);

// ================= 更多觀念題 =================
q('abs', 'cause', R`為什麼 $a\ge|b| \Rightarrow a^2\ge b^2$ 成立?`,
  [R`因為 $a\ge|b|\ge0$,兩邊都不是負數,可以平方`, R`因為 $a$ 一定比 $b$ 大,大的平方就比較大`, R`因為 $b$ 一定是正數`, R`因為 $a^2\ge|b|$`],
  R`$|b|\ge0$,所以 $a\ge|b|\ge0$:兩邊都非負才能平方,平方後 $a^2\ge|b|^2=b^2$。(只說「$a$ 比 $b$ 大」不夠,例如 $1>-3$ 但 $1<9$)`);
q('abs', 'judge', R`下列哪一個不等式可以「直接」兩邊平方?`,
  [R`$|x-1|\ge|x+2|$`, R`$|x-1|\ge x$`, R`$|x+3|\le 2x-1$`, R`$|2x|>x-5$`],
  R`兩邊都是絕對值(都 $\ge0$)才能直接平方。其他三個右邊含 $x$,正負不確定,要先討論正負。`);
q('abs', 'cause', R`為什麼 $|x-a|<b$ 的解是 $a-b<x<a+b$?`,
  [R`因為 $|x-a|$ 代表數線上 $x$ 到 $a$ 的距離`, R`因為絕對值符號可以直接拿掉`, R`因為 $x$ 一定比 $a$ 大`, R`因為兩邊平方後就會得到`],
  R`距離法:$|x-a|$ 是 $x$ 到 $a$ 的距離;距離小於 $b$ → 在 $a$ 左右各 $b$ 的範圍內。`);
q('abs', 'cause', R`解 $|x+3|\le 2x$ 時,為什麼不能直接用距離法寫成 $-3-2x\le x\le -3+2x$ 就結束?`,
  [R`因為右邊 $2x$ 不是固定的正數,正負不確定`, R`因為 $x+3$ 不是 $x-a$ 的形式`, R`因為距離法只能用在等式`, R`因為 $2x$ 一定是負數`],
  R`距離法的 $b$ 要是「確定的正數」才代表距離。$2x$ 含未知數,要討論正負。`);
q('abs', 'judge', R`$|x-1|<-2$ 的解是?`,
  ['無解', R`$-1<x<3$`, R`$3<x<-1$`, '所有實數'],
  R`絕對值(距離)一定 $\ge0$,不可能小於負數,所以無解。`);
q('abs', 'judge', R`$|x-1|\ge-2$ 的解是?`,
  ['所有實數', '無解', R`$x\ge-1$`, R`$x=1$`],
  R`距離一定 $\ge0>-2$,任何 $x$ 都成立。`);
q('closure', 'judge', R`$\sqrt2\times\sqrt8=4$,這個例子說明了什麼?`,
  ['無理數對乘法沒有封閉性', '有理數對乘法有封閉性', R`$\sqrt2$ 其實是有理數`, '無理數乘無理數一定是有理數'],
  R`兩個無理數相乘得到有理數 $4$,所以無理數乘法不封閉。但也不是「一定」是有理數,例如 $\sqrt2\times\sqrt3=\sqrt6$。`);
q('closure', 'cause', R`若 $a\in\Q$、$a\ne0$,且 $ab\in\Q$,則 $b$ ___`,
  [IN_Q, IN_QB, '不一定', R`$=1$`],
  R`$b=\frac{ab}{a}$ 是「有理數 ÷ 非零有理數」,所以 $b\in\Q$。`);
q('closure', 'judge', R`若 $a+b\in\Q$ 且 $a-b\in\Q$,則下列何者正確?`,
  [R`$a$、$b$ 都是有理數`, R`$a$、$b$ 都是無理數`, '不一定', R`$a$、$b$ 一個有理數、一個無理數`],
  R`$a=\frac{(a+b)+(a-b)}{2}$、$b=\frac{(a+b)-(a-b)}{2}$,都由有理數加減除以 $2$ 得到,所以都是有理數。`);
q('section', 'cause', R`設 $p,q>0$,$pa+qb$ 一定落在 $a$、$b$ 之間的條件是?`,
  [R`$p+q=1$`, R`$p=q$`, R`$p+q=2$`, R`$p>q$`],
  R`分點公式 $\frac{n}{m+n}a+\frac{m}{m+n}b$ 的兩個係數都正而且加起來 $=1$。`);
q('section', 'judge', R`設 $a<b$,下列哪一個「一定」在 $a$、$b$ 之間?`,
  [R`$\frac{3a+b}{4}$`, R`$\frac{a+b}{4}$`, R`$\frac{3a+b}{2}$`, R`$\frac{a+3b}{3}$`],
  R`$\frac{3a+b}{4}=\frac34a+\frac14b$,係數和 $=1$,是 $1:3$ 的分點。其他的係數和分別是 $\frac12$、$2$、$\frac43$。`);
q('amgm', 'cause', R`用算幾不等式求最小值時,為什麼要檢查「等號能不能成立」?`,
  ['等號成立,才真的取得到這個最小值', '因為等號成立時兩數一定是 0', '因為不等式不能有等號', '不用檢查,算出來的一定是最小值'],
  R`$\ge$ 只說明「不會比這個小」;要有某個 $x$ 讓等號成立,這個值才是取得到的最小值。`);
q('amgm', 'judge', R`$a,b>0$ 且 $a+b$ 固定時,$ab$ 什麼時候最大?`,
  [R`$a=b$ 時`, R`$a$ 越大越好`, R`$a=0$ 時`, R`$ab$ 是固定的`],
  R`$\sqrt{ab}\le\frac{a+b}{2}$,等號成立於 $a=b$:和固定時,兩數相等積最大。`);
mq('amgm', R`已知 $x>1$,求 $x+\frac{1}{x-1}$ 的最小值,屬於哪一種用途?`, M_AMGM, 1,
  R`改寫成 $(x-1)+\frac{1}{x-1}+1$,$(x-1)>0$ 且 $(x-1)\cdot\frac1{x-1}=1$ 是定值 → 倒數和。最小值 $2+1=3$($x=2$)。`);
q('rational', 'judge', R`下列哪一個是無理數?`,
  [R`$\sqrt2+1$`, R`$0.\overline{3}$`, R`$\sqrt9$`, R`$\frac{22}{7}$`],
  R`有理數 + 無理數 = 無理數。$0.\overline3=\frac13$、$\sqrt9=3$、$\frac{22}{7}$ 都是有理數。`);
q('rational', 'cause', R`為什麼循環小數一定是有理數?`,
  ['因為它一定可以化成分數', '因為它的位數是無限的', '因為它沒有根號', '因為它一定比 1 小'],
  R`用 $\frac{\text{全部}-\text{不循環}}{99\cdots900\cdots0}$ 就能化成分數,能寫成分數的就是有理數。`);
q('rational', 'cause', R`$\frac13$ 不能化成有限小數,原因是?`,
  [R`最簡分數的分母有質因數 $3$`, R`分子是 $1$`, R`分母是奇數`, R`$3$ 比 $10$ 小`],
  R`最簡分數的分母只有 $2$、$5$ 才是有限小數。注意不是「奇數」的問題:$\frac15=0.2$。`);
q('irrational', 'cause', R`根號「相減」比大小(如 $\sqrt7-\sqrt6$ 對 $\sqrt6-\sqrt5$),為什麼用倒數比?`,
  ['有理化後變成根號相加,容易比大小', '因為相減的數一定是負數', '因為平方後一定相等', '因為倒數一定比較大'],
  R`$\frac{1}{\sqrt7-\sqrt6}=\sqrt7+\sqrt6$,變成相加好比較;倒數大的,原數小。`);
q('irrational', 'cause', R`為什麼 $\sqrt{x^2}=|x|$,要加絕對值?`,
  [R`因為根號的結果一定 $\ge0$`, R`因為 $x$ 一定是負數`, R`因為平方後會變大`, R`因為 $x$ 一定是無理數`],
  R`$\sqrt{\ }$ 取的是非負的平方根。例如 $\sqrt{(-3)^2}=3=|-3|$。`);
q('irrational', 'judge', R`$\sqrt{a+b-2\sqrt{ab}}=\sqrt a-\sqrt b$($a,b>0$)什麼時候成立?`,
  [R`$a\ge b$ 時`, R`$a\le b$ 時`, '永遠成立', '永遠不成立'],
  R`左邊 $\ge0$,所以右邊也要 $\ge0$:$\sqrt a\ge\sqrt b$,即 $a\ge b$。一般寫成 $|\sqrt a-\sqrt b|$。`);
q('irrational', 'cause', R`$3+0\cdot\sqrt2=1+\sqrt2\cdot\sqrt2$,但 $3\ne1$。這說明相等原則需要什麼條件?`,
  [R`係數 $a,b,c,d$ 都要是有理數`, R`係數都要是正數`, R`$\sqrt2$ 要換成 $\sqrt3$`, '兩邊要先平方'],
  R`這裡 $d=\sqrt2$ 不是有理數,所以不能用 $a=c$、$b=d$。`);

// ================= 隨機產生的題目(每次數字不同) =================
const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
function absX(a) { return a === 0 ? '|x|' : a > 0 ? `|x-${a}|` : `|x+${-a}|`; }
// 正確答案 + 錯誤選項(去掉重複),湊滿 4 個
function opts(correct, wrongs) {
  const out = [correct];
  for (const w of wrongs) if (w != null && !out.includes(w) && out.length < 4) out.push(w);
  // 數字答案不夠 4 個時,用附近的數字補
  for (let d = 1; out.length < 4 && /^-?\d+$/.test(correct) && d < 20; d++)
    for (const v of [+correct + d, +correct - d]) if (out.length < 4 && !out.includes(String(v))) out.push(String(v));
  return out;
}

const GENERATORS = [
  { id: 'g-abs-ineq', topic: 'abs', type: 'calc', make() {
    const a = pick([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]), b = ri(1, 6);
    const op = pick(['<', '\\le', '>', '\\ge']);
    const inside = op === '<' || op === '\\le';
    const lo = a - b, hi = a + b;
    const inner = (l, h) => `$${l} ${op} x ${op} ${h}$`;
    const outOp = op === '>' ? ['<', '>'] : ['\\le', '\\ge'];
    const inOp = op === '<' ? '<' : '\\le';
    const outer = (l, h, o) => `$x ${o[0]} ${l}$ 或 $x ${o[1]} ${h}$`;
    const inn = (l, h) => `$${l} ${inOp} x ${inOp} ${h}$`;
    let correct, wrongs;
    if (inside) {
      correct = inner(lo, hi);
      wrongs = [outer(lo, hi, op === '<' ? ['<', '>'] : ['\\le', '\\ge']), inner(-a - b, -a + b), inner(-b, b)];
    } else {
      correct = outer(lo, hi, outOp);
      wrongs = [inn(lo, hi), outer(-a - b, -a + b, outOp), outer(-b, b, outOp)];
    }
    return {
      q: `解 $${absX(a)}${op}${b}$。`,
      options: opts(correct, wrongs),
      explain: `距離法:$x$ 到 $${a}$ 的距離${inside ? (op === '<' ? '小於' : '不超過') : (op === '>' ? '大於' : '至少')} $${b}$,從 $${a}$ 往左右各走 $${b}$ 得到 $${lo}$ 和 $${hi}$,${inside ? '答案在中間' : '答案在兩邊外面'}。`,
    };
  } },
  { id: 'g-abs-interval', topic: 'abs', type: 'calc', make() {
    let c, r;
    do { c = ri(-5, 6); r = ri(1, 6); } while (c === 0 || c === r || c === -r);
    const n = c - r, m = c + r;
    const inside = Math.random() < 0.6;
    const sym = inside ? '\\le' : '\\ge';
    const f = (cc, rr, s = sym) => `$${absX(cc)}${s}${rr}$`;
    return {
      q: inside ? `$${n}\\le x\\le ${m}$ 可以寫成哪一個絕對值不等式?` : `「$x\\le ${n}$ 或 $x\\ge ${m}$」可以寫成哪一個絕對值不等式?`,
      options: opts(f(c, r), [f(r, c > 0 ? c : null), f(c, 2 * r), f(-c, r), f(c, r, inside ? '\\ge' : '\\le')].filter(x => !x.includes('null'))),
      explain: `中點 $\\frac{${m}+(${n})}{2}=${c}$,距離的一半 $\\frac{${m}-(${n})}{2}=${r}$;${inside ? '在中間用「$\\le$」' : '在兩端外面用「$\\ge$」'}。`,
    };
  } },
  { id: 'g-section', topic: 'section', type: 'calc', make() {
    const [m, n] = pick([[1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2], [1, 1], [3, 4]]);
    const k = ri(1, 3), a = ri(-8, 6), b = a + (m + n) * k;
    const c = a + m * k;
    return {
      q: `數線上 $A(${a})$、$B(${b})$,$C$ 在 $\\overline{AB}$ 上且 $\\overline{AC}:\\overline{CB}=${m}:${n}$,則 $C$ 的坐標是?`,
      options: opts(String(c), [String(a + n * k), String(c + 1), String(c - 1), String(b - m * k + 2)]),
      explain: `$c=\\frac{mb+na}{m+n}=\\frac{${m}\\times(${b})+${n}\\times(${a})}{${m + n}}=${c}$。`,
    };
  } },
  { id: 'g-amgm-sum', topic: 'amgm', type: 'calc', make() {
    let p, qq; do { p = ri(1, 4); qq = ri(1, 4); } while (p === qq && Math.random() < 0.7);
    const t = ri(1, 3), S = 2 * p * qq * t, mx = p * qq * t * t;
    const px = p === 1 ? '' : p, qy = qq === 1 ? '' : qq;
    return {
      q: `已知 $x,y>0$,$${px}x+${qy}y=${S}$,則 $xy$ 的最大值是?`,
      options: opts(String(mx), [String(S * S / 4), String(2 * mx), String(mx * 4), String(mx + p + qq)]),
      explain: `$\\frac{${px}x+${qy}y}{2}\\ge\\sqrt{${p * qq}xy} \\Rightarrow ${S / 2}\\ge\\sqrt{${p * qq}xy} \\Rightarrow xy\\le\\frac{${(S / 2) ** 2}}{${p * qq}}=${mx}$。等號在 $${px}x=${qy}y=${S / 2}$,即 $x=${S / 2 / p}$、$y=${S / 2 / qq}$。`,
    };
  } },
  { id: 'g-amgm-recip', topic: 'amgm', type: 'calc', make() {
    const a = pick([1, 1, 2, 3, 4]), k = ri(1, 5), b = a * k * k, mn = 2 * a * k;
    const ax = a === 1 ? '' : a;
    return {
      q: `已知 $x>0$,$${ax}x+\\frac{${b}}{x}$ 的最小值是?`,
      options: opts(String(mn), [String(a * k), String(a + b), String(2 * b), String(mn + 2)]),
      explain: `倒數和:$\\frac{${ax}x+\\frac{${b}}{x}}{2}\\ge\\sqrt{${a * b}}=${a * k}$,所以最小值 $${mn}$,等號在 $${ax}x=\\frac{${b}}{x}$,$x=${k}$。`,
    };
  } },
  { id: 'g-rep-decimal', topic: 'rational', type: 'calc', make() {
    const nr = ri(0, 2), L = ri(1, 2);
    let non = '', rep = '';
    for (let i = 0; i < nr; i++) non += ri(0, 9);
    do { rep = ''; for (let i = 0; i < L; i++) rep += ri(0, 9); } while (/^0+$|^9+$/.test(rep) || (L === 2 && rep[0] === rep[1]) || (non && non.slice(-1) === rep.slice(-1)));
    const all = parseInt(non + rep, 10), nonV = parseInt(non || '0', 10);
    const num = all - nonV;
    const den = '9'.repeat(L) + '0'.repeat(nr);
    return {
      q: `$0.${non}\\overline{${rep}}=\\dfrac{\\square}{${den}}$,$\\square$ 是?`,
      options: opts(String(num), [String(all), String(parseInt(rep, 10)), String(num + 9), String(num - 1), String(num + 10)]),
      explain: `分子 = 全部數字 − 不循環部分 $=${non + rep}-${non || 0}=${num}$;分母:循環 ${L} 位 → ${L} 個 9,不循環 ${nr} 位 → ${nr} 個 0。`,
    };
  } },
  { id: 'g-finite', topic: 'rational', type: 'judge', make() {
    const goodDen = [8, 16, 20, 25, 40, 50, 80, 125, 32, 5, 4];
    const badDen = [6, 12, 14, 15, 18, 21, 24, 35, 45, 7, 9, 11, 13, 22, 28, 30];
    const frac = d => { let n; do { n = ri(1, d - 1); } while (gcd(n, d) !== 1); return [n, d]; };
    let [n, d] = frac(pick(goodDen));
    const trap = Math.random() < 0.4;
    let note = '';
    if (trap) { const f = pick([3, 7]); note = `$\\frac{${n * f}}{${d * f}}=\\frac{${n}}{${d}}$ 先約分,`; n *= f; d *= f; }
    const wrongs = [];
    while (wrongs.length < 3) { const [a, b] = frac(pick(badDen)); const s = `$\\frac{${a}}{${b}}$`; if (!wrongs.includes(s)) wrongs.push(s); }
    return {
      q: '下列哪一個分數可以化成有限小數?' + (trap ? '(小心:先約分)' : ''),
      options: opts(`$\\frac{${n}}{${d}}$`, wrongs),
      explain: `${note}最簡分數的分母只有質因數 2、5 才是有限小數。其他選項的分母有 3、7、11、13 等質因數。`,
    };
  } },
  { id: 'g-double-root', topic: 'irrational', type: 'calc', make() {
    const [a, b] = pick([[3, 2], [5, 2], [5, 3], [6, 1], [7, 2], [7, 3], [6, 5], [3, 1], [5, 1], [7, 5], [11, 2], [2, 1]]);
    const rt = x => x === 1 ? '1' : `\\sqrt{${x}}`;
    const plus = Math.random() < 0.5, s = plus ? '+' : '-';
    const correct = `$${rt(a)}${s}${rt(b)}$`;
    return {
      q: `$\\sqrt{${a + b}${s}2\\sqrt{${a * b}}}=$?`,
      options: opts(correct, [plus ? `$${rt(a)}-${rt(b)}$` : `$${rt(b)}-${rt(a)}$`, `$\\sqrt{${a + b}}${s}\\sqrt{${a * b}}$`, plus ? `$${rt(a + b)}+1$` : `$${rt(a)}+${rt(b)}$`]),
      explain: `找兩數「和 $${a + b}$、積 $${a * b}$」:$${a}$ 和 $${b}$。${plus ? '' : '減號要大減小,結果才會 $\\ge0$。'}`,
    };
  } },
  { id: 'g-equal', topic: 'irrational', type: 'calc', make() {
    const r = pick([2, 3, 5]), p = ri(-4, 4), qq = ri(-4, 4), x = ri(-3, 6), y = ri(-3, 6);
    const A = x + p, B = y + qq;
    const lin = (v, k) => k === 0 ? v : k > 0 ? `${v}+${k}` : `${v}-${-k}`;
    return {
      q: `若 $x,y\\in\\Q$,$(${lin('x', p)})+(${lin('y', qq)})\\sqrt${r}=${A}${B >= 0 ? '+' : ''}${B}\\sqrt${r}$,則 $(x,y)=$?`,
      options: opts(`$(${x},${y})$`, [`$(${y},${x})$`, `$(${A + p},${B + qq})$`, `$(${A},${B})$`, `$(${x + 1},${y - 1})$`, `$(${-x},${-y})$`, `$(${x},${y + 2})$`, `$(${x - 2},${y})$`]),
      explain: `相等原則(係數都是有理數):$${lin('x', p)}=${A}$、$${lin('y', qq)}=${B}$。`,
    };
  } },
];

// 觀念整理(依筆記)
const NOTES = {
  abs: [
    R`討論正負:$x\ge0 \Rightarrow |x|=x$;$x\le0 \Rightarrow |x|=-x$`,
    R`距離法:$\overline{AB}=|a-b|\ge0$`,
    R`$|x-a|\le b \iff a-b\le x\le a+b$`,
    R`$|x-a|\ge b \iff x\ge a+b$ 或 $x\le a-b$`,
    R`$n\le x\le m \iff \left|x-\frac{m+n}{2}\right|\le\frac{m-n}{2}$(中點、距離的一半)`,
    R`平方法:① $|a|\ge|b| \Rightarrow a^2\ge b^2$ ✓;② $a\ge|b| \Rightarrow a^2\ge b^2$ ✓;③ $|a|\ge b$ 不確定 $b$ 的正負,<b>不可平方</b>`,
  ],
  closure: [
    R`$a\in\Q,\ b\in\Q \Rightarrow a\pm b,\ a\times b,\ a\div b\in\Q$`,
    R`$a\in\Q,\ b\in\Qb \Rightarrow a\pm b,\ a\times b,\ \cdots\in\Qb$ $(a\ne0)$`,
    R`$a\in\Qb,\ b\in\Qb \Rightarrow$ 不一定,檢查用 $2+\sqrt3$ 和 $2-\sqrt3$`,
  ],
  section: [
    R`$\overline{AC}:\overline{CB}=m:n \Rightarrow c=\frac{mb+na}{m+n}$`,
    R`✗ $a<\frac{a+b}{3}<b$(不是分點,不一定在中間)`,
    R`✓ $a<\frac{2a+b}{3}<\frac{a+2b}{3}<b$`,
  ],
  amgm: [
    R`$a,b>0$,則 $\frac{a+b}{2}\ge\sqrt{ab}$,等號成立於 $a=b$`,
    R`相加 → 相乘`,
    R`用途①和積互換:例 $2x+3y=12$ 求 $xy$ 最大`,
    R`用途②倒數和:例 $x>0$,求 $x+\frac4x$ 最小($x=2$ 時最小值 $4$)`,
  ],
  rational: [
    R`循環小數:$a.bc\overline{def}=\frac{abcdef-abc}{99900}$(循環幾位幾個 9,不循環幾位幾個 0)`,
    R`有限小數:最簡分數的分母只有 $2^m\times5^n$`,
    R`有稠密性、封閉性`,
  ],
  irrational: [
    R`$\sqrt{a+b\pm2\sqrt{ab}}=|\sqrt a\pm\sqrt b|$`,
    R`相等原則:$a+b\sqrt2=c+d\sqrt2 \Rightarrow a=c,\ b=d$($a,b,c,d\in\Q$)`,
    R`有稠密性、<b>沒有封閉性</b>`,
    R`根數比大小:平方比 或 倒數比`,
    R`$a^3+b^3=(a+b)(a^2-ab+b^2)$;$a^3-b^3=(a-b)(a^2+ab+b^2)$`,
    R`$(a+b)^3=a^3+b^3+3ab(a+b)$;$(a-b)^3=a^3-b^3-3ab(a-b)$`,
    R`$(a+b+c)^2=a^2+b^2+c^2+2ab+2bc+2ac$`,
  ],
};

// 精華題:用最少的題目涵蓋筆記上每一個觀念(照筆記順序出題)
const ESSENTIAL = [
  // 絕對值
  'abs-23',     // 討論正負:定義
  'abs-31',     // 距離法:|x-a| 是距離 → |x-a|<b
  'abs-18',     // 距離法:|x-a|≥b
  'abs-12',     // 距離法③:n≤x≤m 改寫(中點、距離的一半)
  'abs-7',      // 右邊正負不確定 → 討論正負
  'abs-4',      // 兩邊都是絕對值 → 平方法
  'abs-29',     // 平方法②:a≥|b| ⇒ a²≥b²
  'abs-25',     // 平方法③:|a|≥b 不可平方
  // 封閉性
  'closure-13', // 有理數有封閉性、無理數沒有
  'closure-5',  // Q×Q̄ ∈ Q̄ 要 a≠0
  'closure-6',  // Q̄+Q̄ 不一定,用 2±√3 檢查
  'closure-11', // 反推:a∈Q、a+b∈Q̄ ⇒ b∈Q̄
  // 分點公式
  'section-1',  // c=(mb+na)/(m+n)
  'section-3',  // 判斷對錯:(a+b)/3 ✗、三等分點 ✓
  // 算幾不等式
  'amgm-7',     // 前提 a,b>0
  'amgm-2',     // 等號成立於 a=b
  'amgm-4',     // 用途①和積互換
  'amgm-5',     // 用途②倒數和
  // 有理數
  'rational-1', // 循環小數化分數
  'rational-6', // 有限小數:分母只有 2、5(先約分)
  'rational-7', // 循環小數是有理數
  // 無理數・乘法公式
  'irrational-1',  // 雙重根號(要加絕對值)
  'irrational-7',  // 相等原則(係數要是有理數)
  'irrational-10', // 根數比大小:平方比
  'irrational-11', // 根數比大小:倒數比
  'irrational-17', // 立方和
  'irrational-20', // (a-b)³
  'irrational-21', // (a+b+c)²
];

if (typeof module !== 'undefined') module.exports = { TOPICS, TYPES, CONCEPT_TYPES, ESSENTIAL, QUESTIONS, GENERATORS, NOTES };
