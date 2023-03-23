/*================
=== FORMATIONS ===
================*/

const defaultMargin = 8;

const formRow = (xOrigin, enemies, margin) => {
    // x > drawWidth > margin > nextX ...
    const m = margin ? margin : defaultMargin;
    let x = xOrigin;
    enemies[0].x = x;

    for(let i = 1; i < enemies.length; i++){
        x = x + enemies[i-1].drawW + m;
        enemies[i].x = x;
    }
}

const formCol = (yOrigin, enemies, margin) => {
    // y > drawHeight > margin > nextY ...
    const m = margin || defaultMargin;
    let y = yOrigin;
    enemies[0].y = y;

    for(let i = 1; i < enemies.length; i++){
        y = y + enemies[i-1].drawH + m;
        enemies[i].y = y;
    }
}

const formBox = (xOrigin, enemies, columns = 1, marginX, marginY) => {
    const mX = marginX || defaultMargin,
        mY = marginY || defaultMargin;
    let y = enemies[0].y,
        x = xOrigin;
    
    enemies[0].x = x;

    for(let i = 1; i < enemies.length; i++){
        if(!(i%columns)){
            x = xOrigin;
            y -= enemies[i].drawH + mY;
        } else {
            x += enemies[i].drawW + mY;
        }
        enemies[i].x = x;
        enemies[i].y = y;
    }
}

const formCross = (xOrigin, enemies, marginY, marginX) => {
    const mY = marginY || defaultMargin,
        mX = marginX || defaultMargin;

    enemies.forEach((enemy) => {
        enemy.x = xOrigin;
        enemy.y -= enemy.drawH + mY;
    })

    enemies[1].y += enemies[0].drawH + mY;
    enemies[2].y -= enemies[0].drawH + mY;
    enemies[3].x += enemies[0].drawW + mX;
    enemies[4].x -= enemies[0].drawW + mX;
}

const formV = (xOrigin, enemies, marginX, marginY) => {
    const mX = marginX || defaultMargin,
        mY = marginY || defaultMargin;
    
    enemies.forEach((enemy) => {
        enemy.x = xOrigin;
    })
    let y = enemies[0].y,
        xOffset = 0;
    for(let i = 1; i < enemies.length; i++){
        if( i % 2 ){
            y -= enemies[i-1].drawH + mY;
            xOffset++;
            enemies[i].x = enemies[0].x - ((enemies[i].drawW + mX) * xOffset);
        } else {
            enemies[i].x = enemies[0].x + ((enemies[i].drawW + mX) * xOffset);
        }
        enemies[i].y = y;
    }
}

const formBoat = (xOrigin, enemies, marginX, marginY) => {
    const mX = marginX || defaultMargin,
        mY = marginY || defaultMargin;
    
    enemies.forEach((enemy) => {
        enemy.x = xOrigin;
    })
    let y = enemies[0].y;
    for(let i = 1; i < enemies.length; i++){
        if( i % 2 ){
            y -= enemies[i-1].drawH + mY;
            enemies[i].x = enemies[0].x - enemies[i].drawW - mX;
        } else {
            enemies[i].x = enemies[0].x + enemies[i].drawW + mX;
        }
        enemies[i].y = y;
    }
}

const formTriangle = (xOrigin, enemies, marginX, marginY) => {
    const mX = marginX || defaultMargin,
        mY = marginY || defaultMargin;
    let x, y, r = 1, c = 0;

    x = xOrigin;
    y = enemies[0].y;

    const coords = [];
    for(let i = 0; i < enemies.length; i++){
        enemies[i].x = x;
        enemies[i].y = y;
        c++;

        if(c < r){
            x += enemies[0].drawW + mX;
        } else {
            c = 0;
            x = xOrigin - ((enemies[0].drawW / 2 + mX) * r)
            y -= enemies[0].drawH + mY;
            r++;
        }
    }
}

const spawnActor = (actor, x, speed) => {
    // Parse Actor Data
    const { className, outline, fill, invert, shootingData } = actor;
    let enemy;
    switch(className){
        case 'potshot':
            enemy = new PotShot(invert);
            break;
        case 'kamikaze':
            enemy = new Kamikaze();
            break;
        case 'ace':
            enemy = new Ace();
            break;
        case 'gunner':
            enemy = new Gunner();
            break;
    }

    enemy.x = x;
    enemy.speed = speed;

    if( outline && fill ) {
        enemy.styles = setColors(outline, fill, enemy);
    }

    for(const property in actor){
        // check if the enemy has the property
        if(enemy.hasOwnProperty(property)){
            // if the enemy as the property assign the value of property to it
            enemy[property] = actor[property];
        }
    }
    
    if(shootingData){
        const { interval, speed } = shootingData;
        switch(shootingData.type){
            case 'player':
                enemy.shootFunc = shootAtPlayer(interval, speed, shootingData.defTarget);
                break;
            case 'spread':
                enemy.shootFunc = shootSpread(interval, speed, shootingData.amount, shootingData.space, shootingData.defTarget);
                break;
            case 'arc':
                enemy.shootFunc = shootArc(interval, speed, shootingData.amount, shootingData.startAngle, shootingData.endAngle);
                break;
        }
    }
    return enemy;
}

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const setColors = (outline, fill, actor) => {
    return [
        {
            method : 'stroke',
            defaultColor : actor.outline,
            newColor : outline,
        },
        {
            method : 'fill',
            defaultColor : actor.fill,
            newColor : fill
        },
    ];
}