// let _Menu;
const _UserInput = trackKeys();

const main = () => {
    let previousTime;
    let _Menu;
    let _Game;
    _Menu = renderTitleMenu();
    hideHUD();
    const update = (timeStamp) => {
        // Determine the time between refreshes

        if(!previousTime) previousTime = timeStamp;
        const elapsed = timeStamp - previousTime;
        previousTime = timeStamp;

        if(Menu.isActive()){
            _Menu.update(_UserInput);
        } else if (_Game){
            // Execute Game Logic

            if(!_Game.gameOver)_Game.update(_UserInput, elapsed);

            // Draw

            View.renderGame(_Game, _UserInput);
        } else {
            _Game = new Game();
        }

        // Restart the Game

        // if(_Game.gameOver && _UserInput['z']) _Game = new Game();      

        // Game Over

        // Loop

        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

main();