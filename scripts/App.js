// let _Menu;
const _UserInput = trackKeys();
let _Menu;

const main = () => {
    // let previousTime;
    let _Game, _PrevState, _State = 'title';

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
                        break;
                    case 'game over':
                        _Menu = renderGameOver();
                        _Game = undefined;
                        break;
                }
            } else {
                Menu.clear();
                showHUD();
            }
            _PrevState = _State;
        }

        if(_State === 'play'){
            // Start a New Game
            if(!_Game) _Game = Game.start();
            // Execute Game Logic
            if(!_Game.gameOver){
                _Game.update(_UserInput);
            } else {
                _State = 'game over'
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