const trackKeys = (keys = ['w','a','s','d','z','ArrowLeft','ArrowUp','ArrowRight','ArrowDown',` `, 'x', 'c']) => {
    let down = Object.create(null);
    const track = (event) => {
        if(keys.includes(event.key)){
            event.preventDefault();
            down[event.key] = event.type == 'keydown';
        }
    }
    window.addEventListener('keydown', track);
    window.addEventListener('keyup', track);
    return down;
}