const tiles = document.querySelectorAll(".tile");
const startBtn = document.getElementById("start");
const restartBtn = document.getElementById("restart");
const status = document.getElementById("status");

let sequence = [];
let playerSequence = [];
let level = 0;
let acceptingInput = false;

function flash(tile) {
  tile.classList.add("flash");
  setTimeout(() => tile.classList.remove("flash"), 500);
}

function playSequence() {
  acceptingInput = false;
  let i = 0;
  const interval = setInterval(() => {
    const tile = tiles[sequence[i]];
    flash(tile);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      acceptingInput = true;
      status.textContent = `Level ${level} — Your turn`;
    }
  }, 800 / difficulty); // faster playback each difficulty
}

function newRound() {
  updateDifficulty();
  playerSequence = [];
  const next = Math.floor(Math.random() * 4);
  sequence.push(next);
  status.textContent = `Watch closely... (Difficulty ${difficulty})`;
  setTimeout(playSequence, 800);
}

function resetGame(message) {
  alert(message);
  startBtn.disabled = false;
  restartBtn.disabled = true;
  sequence = [];
  playerSequence = [];
  level = 0;
  acceptingInput = false;
  status.textContent = "Level: 0";
}

function restartGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  status.textContent = "Restarted. Watch closely...";
  newRound();
}

tiles.forEach(tile => {
  tile.addEventListener("click", () => {
    if (!acceptingInput) return;

    const id = parseInt(tile.dataset.id);
    playerSequence.push(id);
    flash(tile);

    const currentIndex = playerSequence.length - 1;
    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
      resetGame("Wrong tile. You were lost in the maze.");
      return;
    }

    if (playerSequence.length === sequence.length) {
      level++;
      if (level === 100) {
        resetGame("🎉 You escaped the Mind Maze!");
      } else {
        newRound();
      }
    }
  });
});

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  restartBtn.disabled = false;
  level = 0;
  sequence = [];
  newRound();
});

restartBtn.addEventListener("click", () => {
  restartGame();
});

let difficulty = 1; // scales after every 5 levels

function updateDifficulty() {
  difficulty = Math.floor(level / 5) + 1;
}

let highScore = localStorage.getItem("mindmaze-highscore") || 0;
document.getElementById("high-value").textContent = highScore;

function saveHighScore(score) {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("mindmaze-highscore", score);
    document.getElementById("high-value").textContent = score;
  }
}

function updateLeaderboard(username, score) {
  let board = JSON.parse(localStorage.getItem("mindmaze-leaderboard") || "[]");
  board.push({ username, score });
  board.sort((a, b) => b.score - a.score);
  board = board.slice(0, 5); // top 5
  localStorage.setItem("mindmaze-leaderboard", JSON.stringify(board));

  const list = document.getElementById("score-list");
  list.innerHTML = "";
  board.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.username} — ${entry.score}`;
    list.appendChild(li);
  });
}

let playerName = localStorage.getItem("mindmaze-username");
if (!playerName) {
  playerName = prompt("Enter your arcade name:");
  localStorage.setItem("mindmaze-username", playerName);
}

function resetGame(message) {
  alert(message);
  saveHighScore(level);
  updateLeaderboard(playerName, level);
  startBtn.disabled = false;
  restartBtn.disabled = true;
  sequence = [];
  playerSequence = [];
  level = 0;
  acceptingInput = false;
  status.textContent = "Level: 0";
}
