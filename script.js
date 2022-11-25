// CONSTANTS (HTML ELEMENTS)
const infoTextElement = document.querySelector("#infoText");
const imageElement = document.querySelector("#image");
const scoreElement = document.querySelector("#score");
const inputElement = document.querySelector("#input");
const resetButton = document.querySelector("#reset")
const startButton = document.querySelector("#start")
const actionSection = document.querySelector(".actions")

// QUESTIONS IN ARRAY
const questions = [
  {
    title: "Včela",
    answer: "bee",
    src: "./images/bee.jpg",
    mp3: "./media/bee.mp3"
  },
  {
    title: "Jelen",
    answer: "deer",
    src: "./images/deer.jpg",
    mp3: "./media/deer.mp3"
  },
  {
    title: "Papoušek",
    answer: "parrot",
    src: "./images/parrot.jpg",
    mp3: "./media/parrot.mp3"
  },
  {
    title: "Vlk",
    answer: "wolf",
    src: "./images/wolf.jpg",
    mp3: "./media/wolf.mp3"
  }
];

// WHEN START BUTTON IS PRESSED
startButton.addEventListener("click", () => {

  // HIDE START BUTTON AND DISPLAY INPUT AREA
  actionSection.style.display = "flex";
  startButton.style.display = "none";

  // SET FIRST QUESTION (IF UNDEFINED)
  if (localStorage.getItem("question") == undefined) localStorage.setItem("question", `${Math.abs(Math.floor(Math.random()*questions.length))}`);

  // DISPLAY QUESTION
  infoTextElement.innerHTML = questions[Number(localStorage.getItem("question"))].title;
  imageElement.src = questions[Number(localStorage.getItem("question"))].src;
  scoreElement.innerHTML = localStorage.getItem("score");

  // AUTO SELECT ANSWER TEXT
  inputElement.select();
  inputElement.focus();

  // PRESS RESET BUTTON = RESET SCORE
  resetButton.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  })


  // WHEN ENTER IS PRESSED
  document.addEventListener("keypress", (event) => {

    // IF KEY IS NOT ENTER, DO NOTHING
    if (event.key !== "Enter") return;

    // IF ANSWER IS CORRECT
    if (`${inputElement.value}`.toLowerCase() === questions[Number(localStorage.getItem("question"))].answer) {
      // INCREASE SCORE
      localStorage.setItem("score", `${Number(localStorage.getItem("score")) + 1}`);

      // NOT SAME QUESTION IN A ROW (LOGIC)
      let nextQuestion = `${Math.abs(Math.floor(Math.random()*questions.length))}`;
      if (nextQuestion === localStorage.getItem("question") && localStorage.getItem("question") !== "0") nextQuestion = `${Math.abs(Number(nextQuestion) - 1)}`;
      if (nextQuestion === localStorage.getItem("question") && localStorage.getItem("question") === "0") nextQuestion = `${Math.abs(Number(nextQuestion) + 1)}`;

      // IF QUESTION HAVE MP3 FILE
      if (questions[Number(localStorage.getItem("question"))].mp3) {
        // LOAD MP3 FILE AND PLAY IT
        var audio = new Audio(questions[Number(localStorage.getItem("question"))].mp3);
        audio.loop = false;
        audio.play(); 
      }

      // SET NEXT QUESTION
      localStorage.setItem("question", nextQuestion);
    }

    // AUTO SELECT ANSWER TEXT
    inputElement.select();
    inputElement.focus();

    // DISPLAY NEXT QUESTION
    infoTextElement.innerHTML = questions[Number(localStorage.getItem("question"))].title;
    imageElement.src = questions[Number(localStorage.getItem("question"))].src;
    scoreElement.innerHTML = localStorage.getItem("score");
  })

})
