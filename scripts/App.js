// let _Menu;
const _UserInput = trackKeys();

const main = () => {
    // let previousTime;
    let _Game, _Menu, _PrevState, _State = 'title';

    hideHUD();
    const update = (timeStamp) => {
        // Determine the time between refreshes

        // if(!previousTime) previousTime = timeStamp;
        // const elapsed = timeStamp - previousTime;
        // previousTime = timeStamp;

        if(_State !== _PrevState){
            if (_State !== 'play'){
                Menu.clear();
                _Menu = undefined;
                switch(_State){
                    case 'title':
                        _Menu = renderTitleMenu();
                        break;
                    case 'score':
                        _Menu = renderScoreMenu();
                        break;
                    case 'how to':
                        break;
                    case 'pause':
                        _Menu = renderPauseMenu();
                        break;
                    case 'game over':
                        _Menu = renderGameOver(_Game);
                        _Game = undefined;
                        break;
                    case 'victory':
                        _Menu = renderVictory(_Game);
                        _Game = undefined;
                }
            } else {
                Menu.clear();
                hideTimer();
                showHUD();
            }
            _PrevState = _State;
        }

        if(_State === 'play'){
            // Start a New Game
            if(!_Game) _Game = Game.start();
            // Execute Game Logic
            if(!_Game.gameOver){
                if(_UserInput['p']){
                    _State = 'pause';
                    sfxPause.play();
                    requestAnimationFrame(update);
                    return;
                }
                _Game.update(_UserInput);
            } else {
                // Update Score
                updateScores({
                    date : Date.now(),
                    wave : _Game.currentWave,
                    score : _Game.Score
                });
                _State = _Game.Player ? 'victory' : 'game over';
                requestAnimationFrame(update);
                return;
            }
            // Draw
            View.renderGame(_Game, _UserInput);
        } else {
            let s = _Menu.update(_UserInput);
            if(s){
                _State = s;
            }
        }
        // Loop
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

main();