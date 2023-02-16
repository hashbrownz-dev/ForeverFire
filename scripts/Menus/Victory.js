const renderVictory = (game) => {
    const { Score } = game;
    const container = Menu.container;

    const title = document.createElement('h1');
    title.id='title';
    title.innerText = 'Mission Complete';
    container.appendChild(title);

    const score = document.createElement('p');
    score.className = 'final-score';
    score.innerHTML = `Final Score : <strong>${Score}</strong>`;
    container.appendChild(score);

    const options = [
        new Selection('Play Again', () => 'play'),
        new Selection('Return to Title', () => {
            View.clear();
            hideHUD();
            return 'title'
        })
    ]

    const menu = new Menu(options);
    menu.render();

    return menu;
}