// let _Menu;
const _UserInput = trackKeys();
let _Menu;

const main = () => {
    let previousTime;
    let _Game;
    _Menu = renderScoreMenu();
    hideHUD();
    const update = (timeStamp) => {
        // Determine the time between refreshes

        if(!previousTime) previousTime = timeStamp;
        const elapsed = timeStamp - previousTime;
        previousTime = timeStamp;

        if(_Menu){
            _Menu.update(_UserInput);
        } else if (_Game){
            // Execute Game Logic

            if(!_Game.gameOver){
                _Game.update(_UserInput, elapsed);
            } else {
                if(!Menu.isActive){
                    _Menu = renderGameOver();
                    _Game = undefined;
                    requestAnimationFrame(update);
                    return;
                }
            }
            // Draw

            View.renderGame(_Game, _UserInput);
        } else {
            _Game = Game.start();
        }
        // Game Over

        // Loop

        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

main();