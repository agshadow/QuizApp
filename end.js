const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

//localStorage.setItem("highScores", JSON.stringify([10,20,30]));
// get highScores form local storage OR return a empty array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

finalScore.innerText = mostRecentScore;


username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("clicked the save button111");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    // sort the high scores array.  note arrow functions have implicit return
    highScores.sort( (a,b) =>  b.score - a.score)

    // keep only top 5 scores
    highScores.splice(5);

    // update high scores
    localStorage.setItem("highScores", JSON.stringify(highScores));

    window.location.assign("/");
};
