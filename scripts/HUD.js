const drawHUD = (game)=>{
    const { Player } = game;
    // Draw Health
    drawHealth(Player);
    // Draw Timer
    drawTimer(Player);
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

const hideTimer = () => {
    document.getElementById('timer-container').classList.add('hidden');
    document.getElementById('timer-label').classList.add('hidden');
}

const showTimer = (type) => {
    const timerContainer = document.getElementById('timer-container');
    const timerLabel = document.getElementById('timer-label');
    timerContainer.classList.remove('hidden');
    timerLabel.classList.remove('hidden');
    switch(type){
        case 'bfg':
            timerContainer.style.color = `var(--gold)`;
            timerLabel.innerText = 'BFG';
            break;
        case 'inv':
            timerContainer.style.color = `var(--purple)`;
            timerLabel.innerText = 'Invincibility';
            break;
    }
}

const drawTimer = (Player) => {
    if(Player){
        const { BFG, inv } = Player;
        const timer = document.getElementById('timer');
        const max = 500;
        const setWidth = (val) => {
            return `${(val/max) * 100}%`
        }
        if(BFG){
            timer.className = 'bfg';
            timer.style.width = setWidth(BFG);
        }
        if(inv){
            timer.className = 'inv';
            timer.style.width = setWidth(inv);
        }
    }
}

const drawWave = (wave) => {
    const waveElement = document.getElementById('wave');
    waveElement.innerText = String(wave).padStart(2, '0');
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