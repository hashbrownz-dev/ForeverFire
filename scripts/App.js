let _Menu;
let _Game;
const _UserInput = trackKeys();

const main = () => {
    let previousTime;
    _Menu = renderTitleMenu();
    hideHUD();
    const update = (timeStamp) => {
        // Determine the time between refreshes

        if(!previousTime) previousTime = timeStamp;
        const elapsed = timeStamp - previousTime;
        previousTime = timeStamp;

        // Title

        if(_Menu){
            _Menu.update(_UserInput);
        }

        // Game

        if(_Game){
            // Execute Game Logic

            if(!_Game.gameOver)_Game.update(_UserInput, elapsed);

            // Restart the Game

            if(_Game.gameOver && _UserInput['z']) _Game = new Game();

            // Draw

            View.renderGame(_Game, _UserInput);
        }

        // Game Over

        // Loop

        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

main();