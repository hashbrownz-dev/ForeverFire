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

    const titleOptions = [
        new Selection('Start', ()=>'play'),
        new Selection('Scores', ()=>'score'),
        new Selection('How to Play', ()=>'score')
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