const renderTitleMenu = () => {
    // Get the Containing Element
    const container = Menu.container;

    // Draw the title
    const title = document.createElement('h1');
    title.id='title';
    title.innerText = 'Forever Fire';
    container.appendChild(title);

    // DRAW THE MENU
    // MENU FUNCTIONS

    const startGame = () => {
        // clear the current menu
        Menu.clear();
        // show the HUD
        showHUD();
    }

    const showScores = () => {
        console.log('Open a new menu for displaying high scores');
    }
    
    const showInstructions = () => {
        console.log('Open a new menu for displaying game instructions');
    }

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