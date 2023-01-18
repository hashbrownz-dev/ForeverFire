const startGame = () => {
    // clear the current menu
    _Menu = _Menu.clear();
    // show the HUD
    showHUD();
    // create a new game
    _Game = new Game();
}

const showScores = () => {
    console.log('Open a new menu for displaying high scores');
}

const showInstructions = () => {
    console.log('Open a new menu for displaying game instructions');
}

const renderTitleMenu = () => {
    // Get the Containing Element
    const container = document.getElementById('menu');
    container.classList.remove('hidden');

    // Draw the title
    const title = document.createElement('h1');
    title.id='title';
    title.innerText = 'Forever Fire';
    container.appendChild(title);

    // Draw the menu
    const titleOptions = [
        new Selection('Start', startGame),
        new Selection('Scores', showScores),
        new Selection('How to Play', showInstructions)
    ];

    const titleMenu = new Menu(titleOptions, 'title-options-container');
    titleMenu.render();

    // Draw the Instructions
    const instructions = document.createElement('p');
    instructions.classList.add('menu-instructions');
    instructions.innerHTML = 'Move cursor with the Arrow Keys | Press "Z" to confirm selection';
    container.appendChild(instructions);

    // Return the Menu Object
    return titleMenu;
}