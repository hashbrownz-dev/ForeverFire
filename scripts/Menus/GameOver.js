/*
<!-- PARENT -->
<div id="menu">
    <h1>Game Over</h1>
</div>
*/

const renderGameOver = (game) => {
    const { Score } = game;
    const container = Menu.container;
    
    const title = document.createElement('h1');
    title.id='title';
    title.innerText = 'Game Over';
    container.appendChild(title);

    const score = document.createElement('p');
    score.className = 'final-score';
    score.innerHTML = `Final Score : <strong>${Score}</strong>`;
    container.appendChild(score);

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