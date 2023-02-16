const renderScoreMenu = () => {
    // Get the Containing Element
    const container = Menu.container;

    // DRAW THE CONTENT
    const title = document.createElement('h1');
    title.innerText = 'Hi-Scores';
    title.id = 'score-title';
    container.appendChild(title);

    const createHeading = (name) => {
        const th = document.createElement('th');
        th.innerText = name;
        th.className = `${name.toLowerCase()}-heading`;
        return th;
    }

    const createHeadings = (headings) => {
        const container = document.createElement('tr');
        for ( const heading of headings ){
            container.appendChild(createHeading(heading));
        }
        return container;
    }

    const scoreContainer = document.createElement('table');
    scoreContainer.id = 'score-container';
    container.appendChild(scoreContainer);
    scoreContainer.appendChild(createHeadings(['Rank','Score', 'Wave', 'Date']));

    const scores = getScores();
    sortScores(scores);

    for(const scoreObject of scores){
        const container = document.createElement('tr');
        const rank = document.createElement('td');
        const date = document.createElement('td');
        const score = document.createElement('td');
        const wave = document.createElement('td');
        rank.className = 'rank data';
        date.className = 'date data';
        score.className = 'score data';
        wave.className = 'wave data';
        rank.innerText = String(scores.indexOf(scoreObject) + 1);
        date.innerText = new Date(scoreObject.date).toLocaleDateString();
        score.innerText = String(scoreObject.score);
        wave.innerText = String(scoreObject.wave);
        container.append(rank, score, wave, date);
        scoreContainer.append(container);
    }

    // DRAW THE MENU
    // MENU FUNCTIONS

    const scoreOptions = [
        new Selection('Back', ()=>'title')
    ]

    const scoreMenu = new Menu(scoreOptions, 'score-options-container');
    scoreMenu.render();

    return scoreMenu;
}