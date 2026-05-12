let score = 0;
let streak = 0;
let combo = 1;

let correct = 0;
let active = false;

/* ELEMENTY */
const digitsA = document.getElementById("digitsA");
const digitsB = document.getElementById("digitsB");

const operation = document.getElementById("operation");

const simpleView = document.getElementById("simpleView");
const columnView = document.getElementById("columnView");
const divView = document.getElementById("divView");

const numA = document.getElementById("numA");
const numB = document.getElementById("numB");

const divA = document.getElementById("divA");

const answer = document.getElementById("answer");

const mainBtn = document.getElementById("mainBtn");

const scoreEl = document.getElementById("score");
const streakEl = document.getElementById("streak");
const comboEl = document.getElementById("combo");

const rankEl = document.getElementById("rank");

const fill = document.getElementById("fill");

const gameOver = document.getElementById("gameOver");

/* 🔥 CIFRY */
function initDigits(){

    digitsA.innerHTML = "";
    digitsB.innerHTML = "";

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

    digitsA.value = 1;
    digitsB.value = 1;
}

/* 🌗 THEME */
function toggleTheme(){

    if(document.body.classList.contains("dark")){

        document.body.classList.remove("dark");
        document.body.classList.add("light");

    }else{

        document.body.classList.remove("light");
        document.body.classList.add("dark");
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

/* 🎮 START / CHECK */
function mainAction(){

    if(!active){

        generate();

        active = true;

        mainBtn.innerText = "KONTROLA";

    }else{

        check();
    }
}

/* 🧠 GENERATE */
function generate(){

    let op = operation.value;

    let a = rand(+digitsA.value);
    let b = rand(+digitsB.value);

    /* bez mínusu */
    if(op == "-" && b > a){
        [a,b] = [b,a];
    }

    /* bez dělení nulou */
    if(op == "/" && b == 0){
        b = 1;
    }

    correct = Math.round(
        eval(`${a}${op}${b}`)
    );

    answer.value = "";

    /* reset views */
    simpleView.classList.add("hidden");
    columnView.classList.add("hidden");
    divView.classList.add("hidden");

    /* ➗ DĚLENÍ */
    if(op == "/"){

        divView.classList.remove("hidden");

        divA.innerText = `${a} ÷ ${b}`;

    }

    /* 📌 malé */
    else if(
        String(a).length <= 2 &&
        String(b).length <= 2
    ){

        simpleView.classList.remove("hidden");

        simpleView.innerText =
            `${a} ${op} ${b} =`;

    }

    /* 📌 velké */
    else{

        columnView.classList.remove("hidden");

        numA.innerText = a;
        numB.innerText = op + " " + b;
    }

    answer.focus();
}

/* ✔ CHECK */
function check(){

    let user = Number(
        answer.value.replace(/\s+/g,"")
    );

    if(user === correct){

        score++;
        streak++;
        combo++;

    }else{

        streak = 0;
        combo = 1;

        gameOver.classList.remove("hidden");
    }

    updateUI();

    active = false;

    mainBtn.innerText = "START";
}

/* 🏆 UPDATE */
function updateUI(){

    scoreEl.innerText = score;
    streakEl.innerText = streak;
    comboEl.innerText = combo;

    let rank = "Bronz";
    let progress = 0;

    if(score >= 5){
        rank = "Stříbro";
        progress = 25;
    }

    if(score >= 10){
        rank = "Zlato";
        progress = 50;
    }

    if(score >= 20){
        rank = "Diamant";
        progress = 75;
    }

    if(score >= 35){
        rank = "God Mode";
        progress = 100;
    }

    rankEl.innerText = rank;

    fill.style.width = progress + "%";
}

/* 🔁 RESET */
function resetGame(){

    score = 0;
    streak = 0;
    combo = 1;

    updateUI();

    gameOver.classList.add("hidden");
}

/* ⌨️ ENTER */
document.addEventListener("keydown",(e)=>{

    if(e.key === "Enter"){

        if(gameOver.classList.contains("hidden")){

            mainAction();

        }else{

            resetGame();
        }
    }
});

/* 🚀 START */
initDigits();
updateUI();
