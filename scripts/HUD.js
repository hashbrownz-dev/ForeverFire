const drawHUD = (game)=>{
    const { Player, Score, hiScore, Lives, Wave } = game;
    // Draw High Score
    drawScore(hiScore, 'hi-score');
    // Draw Score
    drawScore(Score, 'score');
    // Draw Health
    drawHealth(Player);
    // Draw Wave
    drawWave(Wave);
    // Draw Lives
    drawLives(Lives);
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

const drawWave = (wave) => {
    const waveElement = document.getElementById('wave');
    let waveStr = String(wave+1);
    waveElement.innerText = waveStr.padStart(2, '0');
}

const drawLives = (lives) => {
    const livesElement = document.getElementById('lives');
    let livesStr = String(lives);
    livesElement.innerText = livesStr.padStart(2, '0');
}

const hideHUD = () => {
    document.getElementById('hud').classList.add('hidden')
}

const showHUD = () => {
    document.getElementById('hud').classList.remove('hidden')
}