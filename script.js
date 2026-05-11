let score = 0;
let streak = 0;
let combo = 1;
let correctAnswer = 0;
let gameActive = false;

/* 🎵 zvuky */
const sounds = {
    correct: new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b7f7c5c1.mp3"),
    wrong: new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_3f3a5c1b8d.mp3"),
    win: new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_2c1b1d3f7a.mp3")
};

/* 🔓 unlock audio */
function unlockAudio() {
    for (let s in sounds) {
        sounds[s].play().then(() => {
            sounds[s].pause();
            sounds[s].currentTime = 0;
        }).catch(() => {});
    }
}

/* 🌗 theme */
function toggleTheme() {
    document.body.classList.add("theme-anim");

    setTimeout(() => {
        document.body.classList.toggle("dark");
        document.body.classList.toggle("light");

        document.getElementById("themeBtn").innerText =
            document.body.classList.contains("dark") ? "🌗 Světlý" : "🌙 Tmavý";
    }, 150);

    setTimeout(() => {
        document.body.classList.remove("theme-anim");
    }, 500);
}

/* 🎮 start / check */
function mainAction() {
    unlockAudio();

    if (!gameActive) {
        generate();
        gameActive = true;
        document.getElementById("mainBtn").innerText = "CHECK";
    } else {
        check();
    }
}

/* 🎲 generate */
function getRandom(d) {
    let min = d === 1 ? 0 : Math.pow(10, d - 1);
    let max = Math.pow(10, d) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate() {
    let op = document.getElementById("operation").value;

    let a = getRandom(+document.getElementById("digitsA").value);
    let b = getRandom(+document.getElementById("digitsB").value);

    if (op === "-") if (b > a) [a, b] = [b, a];
    if (op === "/") if (b === 0) b = 1;

    document.getElementById("task").innerText = `${a} ${op} ${b}`;
    correctAnswer = eval(`${a}${op}${b}`);

    document.getElementById("answer").value = "";
}

/* ✔ check */
function check() {
    let user = Number(document.getElementById("answer").value.replace(/\s+/g, ""));
    let container = document.querySelector(".container");

    if (user === correctAnswer) {
        score++;
        streak++;
        combo++;

        sounds.correct.currentTime = 0;
        sounds.correct.play();

        if (combo >= 5) {
            sounds.win.currentTime = 0;
            sounds.win.play();
        }

        container.classList.add("correct-flash");
    } else {
        streak = 0;
        combo = 1;

        sounds.wrong.currentTime = 0;
        sounds.wrong.play();

        container.classList.add("wrong-flash");
        gameOver();
    }

    updateUI();

    setTimeout(() => {
        container.classList.remove("correct-flash", "wrong-flash");
    }, 400);

    gameActive = false;
    document.getElementById("mainBtn").innerText = "START";
}

/* 🏆 rank + progress */
function updateUI() {
    document.getElementById("score").innerText = score;
    document.getElementById("streak").innerText = streak;
    document.getElementById("combo").innerText = combo;

    let rank = "🥉 Bronze";
    let next = 5;
    let prev = 0;

    if (score >= 35) { rank = "👑 God Mode"; prev = 35; next = 35; }
    else if (score >= 20) { rank = "💎 Diamond"; prev = 20; next = 35; }
    else if (score >= 10) { rank = "🥇 Gold"; prev = 10; next = 20; }
    else if (score >= 5) { rank = "🥈 Silver"; prev = 5; next = 10; }

    document.getElementById("rank").innerText = rank;

    let percent = ((score - prev) / (next - prev)) * 100;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;

    document.getElementById("progressFill").style.width = percent + "%";
}

/* 💀 game over */
function gameOver() {
    document.getElementById("gameOver").classList.remove("hidden");
}

/* 🔁 reset */
function resetGame() {
    score = 0;
    streak = 0;
    combo = 1;

    updateUI();

    document.getElementById("gameOver").classList.add("hidden");
    document.getElementById("mainBtn").innerText = "START";
}

/* ⌨️ ENTER */
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (!document.getElementById("gameOver").classList.contains("hidden")) {
            resetGame();
        } else {
            mainAction();
        }
    }
});

updateUI();