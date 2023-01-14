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
    // Get Health from the Player
    // Health is a value between 0 and 100
    // Get the health-bar element from the document
    // Set the size of the element (width = `${health}%`)
    // Set the color of the element
    // Green = 65 - 100 Yellow = 25 - 64 Red = 0 - 24
    const healthBarElement = document.getElementById('health-bar');
    const health = Player ? Player.health : 0;
    healthBarElement.style.width = `${health}%`;
    healthBarElement.style.backgroundColor = `var(--lime)`;
    if(health <= 50) healthBarElement.style.backgroundColor = `var(--yellow)`;
    if(health <= 25) healthBarElement.style.backgroundColor = `var(--red)`;
}