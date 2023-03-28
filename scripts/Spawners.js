/*================
=== FORMATIONS ===
================*/

const defaultMargin = 8;

const formRow = (xOrigin, enemies, margin, center = false) => {
    // x > drawWidth > margin > nextX ...
    const m = margin ? margin : defaultMargin;
    let x;
    if(center){
        let n = Math.floor(enemies.length / 2);
        if(enemies.length % 2){
            //ODD
            x = xOrigin - ((enemies[0].drawW * n) + (m * n))
        } else {
            //EVEN
            // if(n > 1) n--;
            n--;
            x = xOrigin - ((enemies[0].drawW * n) + (enemies[0].drawW / 2) + (m*n) + (m/2))
        }
    } else {
        x = xOrigin;    
    }
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
            x = xOrigin - ((enemies[0].drawW / 2 + mX / 2) * r)
            y -= enemies[0].drawH + mY;
            r++;
        }
    }
}

const spawnActor = (actor) => {
    // Parse Actor Data
    const { className, outline, fill, invert, shootingData } = actor;
    let enemy;
    switch(className){
        case 'potshot':
            enemy = new PotShot(invert);
            break;
        case 'kamikaze':
            enemy = new Kamikaze(invert);
            break;
        case 'ace':
            enemy = new Ace(true);
            // set pos and dir
            if(actor.xPos){
                // If xPos is POSITIVE, ENTER STAGE UP
                if(actor.xPos > 0){
                    enemy.y = 0;
                    enemy.dir = 90;
                } else {
                    enemy.y = viewport.height;
                    enemy.dir = 270;
                }
                enemy.x = Math.abs(actor.xPos);
            }else if(actor.yPos){
                // If yPos is POSITVE, ENTER STAGE LEFT
                if(actor.yPos > 0){
                    enemy.x = 0;
                    enemy.dir = 0;
                } else {
                    enemy.x = viewport.width;
                    enemy.dir = 180;
                }
                enemy.y = Math.abs(actor.yPos);
            }
            // set event data
            for(const moment of actor.momentData){
                enemy.moments.push(Actor.setMoment(moment))
            }
            break;
        case 'gunner':
            enemy = new Gunner(invert);
            enemy.maxHealth = actor.health;
            break;
    }

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
        const { toShoot, interval, speed } = shootingData;
        enemy.toShoot = toShoot;
        switch(shootingData.type){
            case 'player':
                enemy.shootFunc = shootAtPlayer(interval, speed, shootingData.defTarget);
                break;
            case 'spread':
                enemy.shootFunc = shootSpread(interval, speed, shootingData.amount, shootingData.margin, shootingData.defTarget);
                break;
            case 'arc':
                enemy.shootFunc = shootArc(interval, speed, shootingData.amount, shootingData.startAngle, shootingData.endAngle);
                break;
            case 'blank':
                enemy.shootFunc = shoot(interval, speed, shootingData.defTarget, shootingData.amount, shootingData.margin);
                break;
        }
    }
    return enemy;
}

const spawnCluster = (enemy, amount) => {
    const interval = 20;
    const duration = interval * amount;
    const spawn = (game) => {
        game.Actors.push(spawnActor(enemy));
    }
    return new Interval(interval, spawn, duration);
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