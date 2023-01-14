const drawHUD = (game)=>{
    const { Player, Score, Lives } = game;
    // Draw High Score

    // Draw Score
    drawScore(Score);
    // Draw Health
}

const drawHighScore = (game) => {
    // Get High Score from the game
    // NOTE We need to change the game object so that it contains a reference to the current high score.  high score will either be a value stored in localStorage or retrieved using our high score API
    // Compare High Score to Current Score
    // Display the Highest of the two values on the DOM
    // Get the hi score element
    // Convert score to a string
    // pad the string so that it is at least 8 characters long
    // update the dom element
}

const drawScore = (score) => {
    // Get Score from Player
    // Display Score on the DOM
    // Get the Score Element
    // Convert score to a string
    // Pad the string so that it is at least 8 characters long
    // Update the Score Element
    const scoreElement = document.getElementById('score');
    let scoreStr = String(score);
    scoreElement.innerText = scoreStr.padStart(6,'0');
}

const drawHealth = (health) => {
    // Get Health from the Player
    // Health is a value between 0 and 100
    // Get the health-bar element from the document
    // Set the size of the element (width = `${health}%`)
    // Set the color of the element
    // Green = 65 - 100 Yellow = 25 - 64 Red = 0 - 24
}