const drawHUD = (game)=>{
    const { Player, Score, hiScore, Lives } = game;
    // Draw High Score
    drawScore(hiScore, 'hi-score');
    // Draw Score
    drawScore(Score, 'score');
    // Draw Health
    drawHealth(Player);
    // Draw Wave
    // Draw Lives
}

const drawScore = (score, elementID) => {
    const scoreElement = document.getElementById(elementID);
    let scoreStr = String(score);
    scoreElement.innerText = scoreStr.padStart(6,'0');
}

const drawHealth = (Player) => {
    const healthBarElement = document.getElementById('health-bar');
    const health = Player ? Player.health : 0;
    healthBarElement.style.width = `${health}%`;
    healthBarElement.style.backgroundColor = `var(--lime)`;
    if(health <= 50) healthBarElement.style.backgroundColor = `var(--yellow)`;
    if(health <= 25) healthBarElement.style.backgroundColor = `var(--red)`;
}

const hideHUD = () => {
    document.getElementById('hud').classList.add('hidden')
}

const showHUD = () => {
    document.getElementById('hud').classList.remove('hidden')
}