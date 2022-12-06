const _Game = new Game();
const _Controller = trackKeys();

const main = () => {
    let previousTime;

    const update = (timeStamp) => {
        // Determine the time between refreshes

        if(!previousTime) previousTime = timeStamp;
        const elapsed = timeStamp - previousTime;
        previousTime = timeStamp;

        // Execute Game Logic

        _Game.getInput(_Controller);
        _Game.updateActors();
        _Game.updateProjectiles();

        // Draw

        View.render(_Game);

        // Loop

        requestAnimationFrame(update);
    }
    update();
}

main();