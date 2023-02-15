/*
Score:
Scores will be saved to local Storage as an array whose maximum value will be 10~20.
Each element of this array will be a score object which will contain the following properties:
    Score: the total accrued points at the end of a session,
    Wave: the highest wave the player reached,
    EnemiesSpawned,
    EnemiesSlain,
    KillPercentage,
    PlayTime,
    PowerUpsCollected,
    Date

When displaying the Score, there will be 3 levels of depth:
1 - Points only, (used to display the live score and the hi-score)
2 - Points + Wave + Date (used to display the players best scores on the scoreboard)
3 - All Info ( used when the player wishes to inspect a specific score )

Scores can be accessed from the SCORE option in the main menu.

When a player completes a session, we'll create a score Object based on the data held within the current game instance.
this Score Object will be compared with the Score Objects saved in localStorage.  We'll compare the point total of the current session's Score object with the lowest point total of the Score Objects saved to localStorage.  If the current session's point total is higher, the last element of the Scores array in localStorage will be removed and the new score will be added.  The array will then be sorted in order, starting with the highest point value, and saved to localStorage.

To display SCORES on the SCORE page, we'll create a table for displaying scores.  this table will function similarly to a menu, in the sense that we want to allow the player the option to select specific scores using the arrow keys.  However, we also want to implement mouse functionality for a more pleasant user experience.  Hovering over a table row will 'highlight' it, and clicking on that item will then open up a sub menu that describes these stats in greater detail.

To implement this scoring system, the following changes must be made to the Game object:
Add the following properties:
Wave, EnemiesSpawned, EnemiesSlain, PlayTime, PowerUpsCollected

To finish the basic functionality of the Game prior to wrapping up this Score logic, we'll need to do the following:
1 - Implement Power Ups
2 - Implement Waves
3 - Finish the HUD so that it will draw the Current Wave and the lives of the player
4 - Build a tool for determining play time within the Game class
5 - Build a method for calculating kill percentage within the Game class
*/

// CHECK FOR LOCAL SCORES

const lsKey = 'ff1942scores';

const getScores = () => {
    let scores = localStorage.getItem(lsKey);
    if(!scores){
        scores = seedScores();
        localStorage.setItem(lsKey, JSON.stringify(scores));
    } else {
        scores = JSON.parse(scores);
    }
    return scores
}

const seedScores = () => {
    const scores = [];
    for(let i = 1; i <= 10; i++ ){
        let score = {
            date : Date.now(),
            wave : Math.floor(Math.random() * 10 + 1),
            score : Math.floor(Math.random() * 1000 + 1)
        }
        scores.push(score);
    }
    return scores;
}

const sortScores = (scores) => {
    const compareScore = (a, b) => {
        return b.score - a.score;
    }
    const compareDate = (a, b) => {
        return b.date - a.date;
    }
    const compareWave = (a, b) => {
        return b.wave - a.wave;
    }
    scores.sort(compareDate);
    scores.sort(compareWave);
    scores.sort(compareScore);
    return scores;
}

const getHiScore = () => {
    const scores = sortScores(getScores());
    return scores[0];
}

const updateScores = (score) => {
    // We need to get the current scores
    let scores = getScores();
    // Add the current score
    scores.push(score);
    // Sort them
    sortScores(scores);
    // remove the lowest value
    scores.pop();
    // save these scores to localStorage
    localStorage.setItem(lsKey, JSON.stringify(scores));
    return scores;
}