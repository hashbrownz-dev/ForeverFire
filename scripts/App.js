let _Game = new Game();
const _UserInput = trackKeys();

const main = () => {
    let previousTime;

    const update = (timeStamp) => {
        // Determine the time between refreshes

        if(!previousTime) previousTime = timeStamp;
        const elapsed = timeStamp - previousTime;
        previousTime = timeStamp;

        // Execute Game Logic

        if(!_Game.gameOver)_Game.update(_UserInput, elapsed);

        // Restart the Game

        if(_Game.gameOver && _UserInput['z']) _Game = new Game();

        // Draw

        View.render(_Game, _UserInput);

        // Loop

        requestAnimationFrame(update);
    }
    update();
}

main();