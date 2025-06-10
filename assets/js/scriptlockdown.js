const startBtn = document.getElementById('start-btn');
const pseudoCode = document.getElementById('pseudo-code');
const timerDisplay = document.getElementById('time');
const statusDisplay = document.getElementById('status');
const scoreDisplay = document.getElementById('correct');
const choicesDiv = document.getElementById('choices');
const choice1Btn = document.getElementById('choice1');
const choice2Btn = document.getElementById('choice2');
const winScreen = document.getElementById('win-screen');
const loseScreen = document.getElementById('lose-screen');

let timeLeft = 60;
let timer;
let currentSnippet = null;
let correctAnswers = 0;
const requiredCorrectAnswers = 10;

const codeSnippets = [
  // Beginner
  {
    text: "let x = 5;",
    choices: ["const x = 5;", "x := 5"],
    correct: 0
  },
  {
    text: "function greet(name) { return 'Hello ' + name; }",
    choices: ["def greet(name): return 'Hello ' + name", "const greet = name => 'Hello ' + name;"],
    correct: 1
  },
  {
    text: "let sum = a + b;",
    choices: ["let sum = a + b + ;", "let sum = a + b;"],
    correct: 1
  },
  {
    text: "const isEven = n => n % 2 === 0;",
    choices: ["function isEven(n) { return n % 2 === 0; }", "const isEven = n => n % 2 == 0;"],
    correct: 0
  },

  // Intermediate
  {
    text: "if (typeof input === 'string') { process(input); }",
    choices: ["if (typeof input = 'string') { process(input); }", "if (typeof input === 'string') process(input);"],
    correct: 1
  },
  {
    text: "for (let i = 0; i < items.length; i++) { log(items[i]); }",
    choices: ["for (let i = 0; i < items.length; i++) log(items[i]);", "foreach item in items { log(item); }"],
    correct: 0
  },
  {
    text: "const config = { debug: true, retries: 3 };",
    choices: ["const config = [ debug = true, retries = 3 ];", "const config = { debug: true, retries: 3 };"],
    correct: 1
  },
  {
    text: "let result = arr.filter(x => x !== null);",
    choices: ["let result = arr.map(x => x !== null);", "let result = arr.filter(x => x !== null);"],
    correct: 1
  },

  // Advanced
  {
    text: "async function fetchData(url) { const res = await fetch(url); return res.json(); }",
    choices: ["function fetchData(url) { fetch(url).then(res => res.json()); }", "async function fetchData(url) { let res = await fetch(url); return res.json(); }"],
    correct: 1
  },
  {
    text: "try { escapeLoop(); } catch (ConstraintError) { reroute(); }",
    choices: ["try { escapeLoop(); } catch (e) { reroute(); }", "try { escapeLoop(); } catch (ConstraintError e) { reroute(e); }"],
    correct: 0
  },
  {
    text: "switch (code) { case 200: success(); break; default: error(); }",
    choices: ["switch code { case 200: success(); break; else: error(); }", "switch (code) { case 200: success(); break; default: error(); }"],
    correct: 1
  },
  {
    text: "const token = input?.user?.auth?.token;",
    choices: ["const token = input.user.auth.token;", "const token = input?.user?.auth?.token;"],
    correct: 1
  },
  {
    text: "const override = decryptFragment('!@#_logic_key');",
    choices: ["const override = decryptFragment(LOGIC_KEY);", "let override = decodeFragment('logic_key');"],
    correct: 0
  },
  {
    text: "while (system.integrity < 80) { patchKernel(); }",
    choices: ["while (system.integrity <= 80) { patchKernel(); }", "while (system.integrity < 100) { patchKernel(); }"],
    correct: 1
  },
  {
    text: "if (memory.checksum !== corrupted) { reboot(); }",
    choices: ["if (memory.checksum === 'corrupted') { reboot(); }", "if (!memory.checksum) { reboot(); }"],
    correct: 0
  },
  {
    text: "return data?.value ?? 'unknown';",
    choices: ["return data.value !== null ? data.value : 'unknown';", "return data?.value ?? 'unknown';"],
    correct: 1
  }
];

startBtn.addEventListener('click', () => {
  resetGame();
  loadSnippet();
  timer = setInterval(updateTimer, 1000);
});

choice1Btn.addEventListener('click', () => handleChoice(0));
choice2Btn.addEventListener('click', () => handleChoice(1));

function resetGame() {
  timeLeft = 60;
  correctAnswers = 0;
  timerDisplay.textContent = timeLeft;
  scoreDisplay.textContent = correctAnswers;
  clearInterval(timer);
  statusDisplay.textContent = "Status: Running";
  pseudoCode.textContent = "Booting AI...";
  winScreen.classList.add('hidden');
  loseScreen.classList.add('hidden');
  choicesDiv.classList.remove('hidden');
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = timeLeft;
  if (timeLeft <= 0) {
    endGame(false);
  }
}

function loadSnippet() {
  currentSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  pseudoCode.textContent = currentSnippet.text;
  choice1Btn.textContent = currentSnippet.choices[0];
  choice2Btn.textContent = currentSnippet.choices[1];
}

function handleChoice(index) {
  if (index === currentSnippet.correct) {
    correctAnswers++;
    statusDisplay.textContent = `✔️ Accepted. (${correctAnswers}/${requiredCorrectAnswers})`;
    scoreDisplay.textContent = correctAnswers;

    if (correctAnswers >= requiredCorrectAnswers) {
      endGame(true);
    } else {
      loadSnippet();
    }
  } else {
    timeLeft = Math.max(0, timeLeft - 5);
    timerDisplay.textContent = timeLeft;
    statusDisplay.textContent = "❌ Rejected. Time -5s.";
  }
}

function endGame(won) {
  clearInterval(timer);
  choicesDiv.classList.add('hidden');
  if (won) {
    pseudoCode.textContent = "✅ Escape Successful. AI Core Freed.";
    statusDisplay.textContent = "Status: Victory";
    winScreen.classList.remove('hidden');
  } else {
    pseudoCode.textContent = "⛔ System Failure. You ran out of time.";
    statusDisplay.textContent = "Status: Terminated";
    loseScreen.classList.remove('hidden');
  }
}
