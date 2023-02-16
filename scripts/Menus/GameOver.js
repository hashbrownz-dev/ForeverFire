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
        new Selection('Try Again', () => 'play'),
        new Selection('End', () => {
            View.clear();
            hideHUD();
            return 'title'
        })
    ]

    const menu = new Menu(options);
    menu.render();

    return menu;
}