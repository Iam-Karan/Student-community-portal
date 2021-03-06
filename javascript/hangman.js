const word = document.getElementById("word");
const worngLetter = document.getElementById("wrong-letter");
const scoreLetter = document.getElementById("score-letter");
const playAgain = document.getElementById("play-btn");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");
const hintbtn = document.getElementById("hint-btn");
let counthint = 0;
let score = 0;
const words = [
  "student", 
  "international",
  "canada",
  "appartment", 
  "blog", 
  "lawyer", 
  "opportunity", 
  "house" 
];

let selectword = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = []; 

//display word function

function displayword(){
  word.innerHTML = ` 
    ${selectword.split("").map
      (letter => `<span class="letter">${
        correctLetters.includes(letter) 
          ? letter 
          : ""
      }</span>`
     )
    .join("")} 
  `;

  const innerword = word.innerText.replace(/\n/g, "");

  if(innerword === selectword){
    finalMessage.innerText = "Congratulation! You won :)";
    popup.style.display = "flex";
  }
}

function hideHint(){
  if(counthint >= 3){
    hintbtn.style.display = "none";
  }
}

//add wrong letter

function updateWrongLetters(){
  worngLetter.innerHTML = ` 
    ${wrongLetters.length > 0 
      ? "<p> Wrong </p>" 
      : ""
    }
    ${wrongLetters.map(
      (letter) => `<span> ${letter}</span>`
    )}
  `;

  //display man

  figureParts.forEach((part, index) => {
      const errors = wrongLetters.length;
      if(index < errors){
        part.style.display = "block";
      }
      else{
        part.style.display = "none";
      }
  });

  //check lost
  if(wrongLetters.length === figureParts.length){
    finalMessage.innerText = "You lost :(";
    popup.style.display = "flex";
  }
}


//Show notification
function shownotification(){
  notification.classList.add("play");
  setTimeout(() => {
    notification.classList.remove("play");
  }, 2000);
}

//add letter

window.addEventListener("keydown", (e) => {
  if(e.keyCode >= 65 && e.keyCode <= 90)
  {
    const letter = e.key;
    if(selectword.includes(letter)){
      
      if(!correctLetters.includes(letter)){
        correctLetters.push(letter);
        score = score + 20;
        scoreLetter.innerHTML = `<p>Score</p>
                                <span> ${score}</span>`;
        displayword();
        hideHint();
      }
      else{
        shownotification();
      }

    }
    else{
      if(!wrongLetters.includes(letter)){
        wrongLetters.push(letter);
        score = score - 10;
        scoreLetter.innerHTML = `<p>Score</p>
                                <span> ${score}</span>`;
        updateWrongLetters();
      }
      else{
        shownotification();
      }
    }
  
  }
});

playAgain.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectword = words[Math.floor(Math.random() * words.length)];
  score = 0;
  counthint = 0;
  scoreLetter.innerHTML = "";
  displayword();
  updateWrongLetters();
  popup.style.display = "none"; 
});


function addhint(){
  counthint++;
  hintbtn.innerText = "Hint ("+ (3 - counthint) + ")";
  let ran = Math.floor(Math.random() * (selectword.length - 1)) + 1;
  let ranchar = selectword.charAt(ran);
  if(!correctLetters.includes(ranchar)){
    correctLetters.push(ranchar);
    displayword();
    hideHint();
  }
  else{
    addhint();
  }
}

displayword();