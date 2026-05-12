let score = 0;
let streak = 0;
let combo = 1;

let correct = 0;
let active = false;

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

const gameOverBox = document.getElementById("gameOver");

function initDigits(){

  digitsA.innerHTML = "";
  digitsB.innerHTML = "";

  for(let i = 1; i <= 9; i++){

    digitsA.innerHTML += `
      <option value="${i}">${i}</option>
    `;

    digitsB.innerHTML += `
      <option value="${i}">${i}</option>
    `;
  }

  digitsA.value = 1;
  digitsB.value = 1;
}

function toggleTheme(){

  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

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

function mainAction(){

  if(!active){

    generate();
    active = true;
updateUI();
