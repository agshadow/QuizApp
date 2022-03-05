const highScoresList = document.getElementById("highScoresList");

//load high scores from local storage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = (
    highScores
        .map(score => {
            return `<li class="high-score">${score.name} - ${score.score}</li>`;
        })
        .join("")
);


// MY CODE
/*
for (let i=0; i<highScores.length; i++) {
    console.log(`${highScores[i].name} - ${highScores[i].score}`);
    let scoreText = `${highScores[i].name} - ${highScores[i].score}`;
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(scoreText));
    highScoresList.appendChild(li);
}
//highScoresList.innerText = highScores[0][name];*/