/*
<!-- PARENT -->
<div id="menu">
    <h1>Game Over</h1>
</div>
*/

const renderGameOver = () => {
    const container = Menu.container;
    
    const title = document.createElement('h1');
    title.id='title';
    title.innerText = 'Game Over';
    container.appendChild(title);

    const options = [
        new Selection('Try Again', () => { Menu.clear() }),
        new Selection('End', () => {
            View.clear();
            Menu.clear();
            _Menu = renderTitleMenu();
            console.log('ook')
        })
    ]

    const menu = new Menu(options);
    menu.render();

    return menu;
}