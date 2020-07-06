const username = document.getElementById("username");
const saveScorebtn = document.getElementById("saveScorebtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MaxHighScores = 5;

finalScore.innerText = "You scored " + mostRecentScore + " points";

username.addEventListener("keyup", () => {
  saveScorebtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();
  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);

  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
};
