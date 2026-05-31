// ============================
//  MOMO WEBSITE — main.js
// ============================

// --- Floating hearts background ---
const messages = [
  "Momo, you are the best thing that ever happened to me. 💖",
  "Every moment with you feels like magic, my love. 🌸",
  "You make my heart skip a beat just by existing. 💕",
  "I'm so lucky to call you mine, Momo. 🌙",
  "Your smile is my favourite sight in the whole world. ✨",
  "Being your Parental Control is the best role I've ever had. 😄💖",
  "You are my home, Momo. Wherever you are, that's where I belong. 🏡",
  "You inspire me to be better every single day. 🌟",
  "I love you more than words can ever say — and I'll keep trying anyway. 💌",
  "You're not just my girlfriend — you're my best friend, Momo. 🤍",
  "I'd choose you a million times over, in every universe. 💫",
  "Momo, you deserve all the happiness in the world. 🌺",
];

function newMessage() {
  const el = document.getElementById('dailyMessage');
  if (!el) return;
  const idx = Math.floor(Math.random() * messages.length);
  el.style.opacity = 0;
  setTimeout(() => {
    el.textContent = messages[idx];
    el.style.transition = 'opacity 0.5s';
    el.style.opacity = 1;
  }, 300);
}

// --- Sliders ---
function initSliders() {
  const sliders = [
    { id: 'loveSlider',  valId: 'loveVal',  labels: ['Still so much… 💖','Growing 💕','A lot 💗','Almost max 💖','100% — MAXIMUM 💖'] },
    { id: 'cuteSlider',  valId: 'cuteVal',  labels: ['Still cute 🌸','Pretty cute 🌸','Very cute 🌸','Incredibly cute 🌸','100% — Off the charts 🌸'] },
    { id: 'thinkSlider', valId: 'thinkVal', labels: ['Thinking of you 🌙','Often 🌙','Most of the time 🌙','Almost always 🌙','99% — Always 🌙'] },
  ];
  sliders.forEach(({ id, valId, labels }) => {
    const slider = document.getElementById(id);
    const valEl  = document.getElementById(valId);
    if (!slider || !valEl) return;
    slider.addEventListener('input', () => {
      const v = parseInt(slider.value);
      const label = labels[Math.min(Math.floor(v / 20), 4)];
      valEl.textContent = `${v}% — ${label}`;
    });
  });
}

// --- Toggles ---
function initToggles() {
  const heartToggle  = document.getElementById('heartToggle');
  const heartStatus  = document.getElementById('heartStatus');
  const beautyToggle = document.getElementById('beautyToggle');
  const beautyStatus = document.getElementById('beautyStatus');

  if (heartToggle && heartStatus) {
    heartToggle.addEventListener('change', () => {
      heartStatus.textContent = heartToggle.checked ? 'ON 💕' : 'OFF (impossible 💔)';
      if (!heartToggle.checked) setTimeout(() => { heartToggle.checked = true; heartStatus.textContent = 'ON 💕'; }, 1800);
    });
  }
  if (beautyToggle && beautyStatus) {
    beautyToggle.addEventListener('change', () => {
      beautyStatus.textContent = beautyToggle.checked ? 'ALWAYS ✨' : "Can't turn this off 🌸";
      if (!beautyToggle.checked) setTimeout(() => { beautyToggle.checked = true; beautyStatus.textContent = 'ALWAYS ✨'; }, 1800);
    });
  }
}

// --- Floating hearts ---
function spawnHearts() {
  const container = document.getElementById('heartsBg');
  if (!container) return;
  const emojis = ['💖','💗','💕','🌸','✨','💫','🌺','💝','⭐','🌙'];
  setInterval(() => {
    const el = document.createElement('span');
    el.className = 'float-heart';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (0.8 + Math.random() * 1.4) + 'rem';
    el.style.animationDuration = (8 + Math.random() * 12) + 's';
    el.style.animationDelay = '0s';
    container.appendChild(el);
    setTimeout(() => el.remove(), 22000);
  }, 600);
}

// --- Quiz engine (used on quiz page) ---
window.QuizEngine = (function() {
  const questions = [
    {
      q: "What is your boyfriend's nickname for you? 😄",
      options: ["My Love", "Parental Control's girl", "Momo", "My sunshine"],
      answer: 2
    },
    {
      q: "What does he call himself to you?",
      options: ["Boo", "Parental Control", "Bestie", "Captain"],
      answer: 1
    },
    {
      q: "How much does he love you?",
      options: ["A little bit", "Quite a lot", "Very much", "More than anything 💖"],
      answer: 3
    },
    {
      q: "What's the best thing about your relationship?",
      options: ["The jokes", "The love 💕", "The food", "All of the above!"],
      answer: 3
    },
    {
      q: "How does he feel when you smile?",
      options: ["Normal", "Happy 😊", "Like the luckiest person alive 🌟", "Excited"],
      answer: 2
    },
  ];

  let current = 0, score = 0;

  function render() {
    const qEl   = document.getElementById('quizQuestion');
    const optsEl = document.getElementById('quizOptions');
    const progEl = document.getElementById('quizProgress');
    const resEl  = document.getElementById('quizResult');
    const boxEl  = document.getElementById('quizBox');

    if (current >= questions.length) {
      // Show final score
      boxEl.innerHTML = `
        <div class="quiz-score-board">
          <div class="big-score">${score}/${questions.length} 💖</div>
          <p>${score === questions.length ? "Perfect score — just like you, Momo! 🌟" : score >= 3 ? "You know us so well 💕" : "We'll make more memories to remember! 🌸"}</p>
          <br/>
          <button class="btn btn-primary" onclick="QuizEngine.reset()">Play Again 🎮</button>
        </div>`;
      return;
    }

    const q = questions[current];
    if (progEl) progEl.textContent = `Question ${current + 1} of ${questions.length}`;
    if (qEl) qEl.textContent = q.q;
    if (resEl) resEl.textContent = '';
    if (optsEl) {
      optsEl.innerHTML = '';
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.onclick = () => choose(i, btn);
        optsEl.appendChild(btn);
      });
    }
  }

  function choose(idx, btn) {
    const allBtns = document.querySelectorAll('.quiz-option');
    allBtns.forEach(b => b.disabled = true);
    const resEl = document.getElementById('quizResult');
    const q = questions[current];
    if (idx === q.answer) {
      btn.classList.add('correct');
      score++;
      if (resEl) resEl.textContent = '✅ Correct! You know us! 💕';
    } else {
      btn.classList.add('wrong');
      allBtns[q.answer].classList.add('correct');
      if (resEl) resEl.textContent = '❌ Oops! But that\'s okay 🌸';
    }
    current++;
    setTimeout(render, 1600);
  }

  function reset() { current = 0; score = 0; render(); }

  return { start: render, reset };
})();

// --- Init on DOM ready ---
document.addEventListener('DOMContentLoaded', () => {
  spawnHearts();
  initSliders();
  initToggles();
  newMessage();

  // Quiz page
  if (document.getElementById('quizBox')) {
    QuizEngine.start();
  }
});
