const renderPauseMenu = () => {
    const container = Menu.container;

    const title = document.createElement('h1');
    title.id = 'title';
    title.innerText = 'Paused';
    container.appendChild(title);

    const options = [
        new Selection('Continue', () => 'play'),
        new Selection('Quit', () => {
            // View.clear();
            // hideHUD();
            return 'game over';
        })
    ]

    const menu = new Menu(options);
    menu.render();

    return menu;
}