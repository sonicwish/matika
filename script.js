let score = 0;
let streak = 0;
let combo = 1;
let correct = 0;
let active = false;

/* 📌 REFS */
const digitsA = document.getElementById("digitsA");
const digitsB = document.getElementById("digitsB");

const operation = document.getElementById("operation");

const aEl = document.getElementById("a");
const bEl = document.getElementById("b");
const opEl = document.getElementById("op");

const answer = document.getElementById("answer");

const mainBtn = document.getElementById("mainBtn");

const scoreEl = document.getElementById("score");
const streakEl = document.getElementById("streak");
const comboEl = document.getElementById("combo");

const rank = document.getElementById("rank");

const fill = document.getElementById("fill");

const gameOverBox = document.getElementById("gameOver");

/* 🔊 ZVUK */
const ctx = new (window.AudioContext || window.webkitAudioContext)();

function beep(type){

    const o = ctx.createOscillator();
    const g = ctx.createGain();

    o.connect(g);
    g.connect(ctx.destination);

    if(type === "good"){
        o.frequency.value = 700;
    }

    if(type === "bad"){
        o.frequency.value = 180;
    }

    if(type === "win"){
        o.frequency.value = 1000;
    }

    g.gain.value = 0.15;

    o.start();

    setTimeout(()=>{
        o.stop();
    },120);
}

/* 🔥 DROPDOWNY */
for(let i = 1; i <= 9; i++){

    digitsA.innerHTML += `
        <option value="${i}">
            ${i}
        </option>
    `;

    digitsB.innerHTML += `
        <option value="${i}">
            ${i}
        </option>
    `;
}

/* výchozí hodnoty */
digitsA.value = 1;
digitsB.value = 1;

/* 🌗 THEME */
function toggleTheme(){

    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");

}

/* 🎮 START / KONTROLA */
function mainAction(){

    ctx.resume();

    if(!active){

        generate();

        active = true;

        mainBtn.innerText = "KONTROLA";

    }else{

        check();

    }
}

/* 🎲 RANDOM */
function rand(d){

    let min;

    if(d == 1){
        min = 0;
    }else{
        min = 10 ** (d - 1);
    }

    let max = (10 ** d) - 1;

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}

/* 🧠 GENEROVÁNÍ */
function generate(){

    let op = operation.value;

    let a = rand(+digitsA.value);
    let b = rand(+digitsB.value);

    if(op == "-" && b > a){
        [a,b] = [b,a];
    }

    if(op == "/" && b == 0){
        b = 1;
    }

    correct = eval(`${a}${op}${b}`);

    answer.value = "";
    answer.focus();

    let lenA = String(a).length;
    let lenB = String(b).length;

    /* ➕➖× malé příklady */
    if(op != "/"){

        if(lenA <= 2 && lenB <= 2){

            simpleView.style.display = "block";
            columnView.classList.add("hidden");
            divView.classList.add("hidden");

            simpleView.innerText = `${a} ${op} ${b} =`;

        }
        else{

            simpleView.style.display = "none";
            columnView.classList.remove("hidden");
            divView.classList.add("hidden");

            numA.innerText = a;
            numB.innerText = op + " " + b;
        }

    }

    /* ➗ DĚLENÍ */
    if(op == "/"){

        simpleView.style.display = "none";
        columnView.classList.add("hidden");
        divView.classList.remove("hidden");

        divA.innerText = `${b} ) ${a}`;
        divB.innerText = "";
        divResult.innerText = "";

    }
}

        /* 📌 SLOUPCOVÝ ZÁPIS */
        document.getElementById("simpleView").style.display = "none";
        document.getElementById("columnView").classList.remove("hidden");

        document.getElementById("numA").innerText = a;
        document.getElementById("numB").innerText = op + " " + b;
    }
}

/* ✔ KONTROLA */
function check(){

    let u = Number(
        answer.value.replace(/\s+/g,"")
    );

    let box = document.querySelector(".container");

    if(u === correct){

        score++;
        streak++;
        combo++;

        beep("good");

        if(combo >= 5){
            beep("win");
        }

        box.style.boxShadow =
            "0 0 40px rgba(0,255,0,0.7)";

    }else{

        streak = 0;
        combo = 1;

        beep("bad");

        box.style.boxShadow =
            "0 0 40px rgba(255,0,0,0.7)";

        gameOver();
    }

    update();

    setTimeout(()=>{
        box.style.boxShadow = "none";
    },400);

    active = false;

    mainBtn.innerText = "START";
}

/* 🏆 UPDATE UI */
function update(){

    scoreEl.innerText = score;
    streakEl.innerText = streak;
    comboEl.innerText = combo;

    let rankName = "Bronz";
    let progress = 0;

    if(score >= 5){
        rankName = "Stříbro";
        progress = 25;
    }

    if(score >= 10){
        rankName = "Zlato";
        progress = 50;
    }

    if(score >= 20){
        rankName = "Diamant";
        progress = 75;
    }

    if(score >= 35){
        rankName = "God Mode";
        progress = 100;
    }

    rank.innerText = rankName;

    fill.style.width = progress + "%";
}

/* 💀 GAME OVER */
function gameOver(){

    gameOverBox.classList.remove("hidden");

}

/* 🔁 RESET */
function resetGame(){

    score = 0;
    streak = 0;
    combo = 1;

    update();

    gameOverBox.classList.add("hidden");

}

/* ⌨️ ENTER */
document.addEventListener("keydown",(e)=>{

    if(e.key === "Enter"){

        if(gameOverBox.classList.contains("hidden")){

            mainAction();

        }else{

            resetGame();

        }
    }
});

/* 🚀 START */
update();
