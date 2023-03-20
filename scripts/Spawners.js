/*====================/
    CLASS: PotShot
====================*/

const spawnPotShot = (x, invert = false, speed = 4) => {
    const potShot = new PotShot(0, invert);

    if(!x){
        const drawW = potShot.drawW;
        const spawnLimit = drawW / 2 + drawW;
        potShot.x = getRandom(spawnLimit, viewport.width - spawnLimit);
    } else {
        potShot.x = x;
    }

    potShot.speed = speed;
    potShot.points = 9;

    // CHANGE COLORS
    potShot.styles = setColors(white, aqua, potShot);

    return potShot;
}

// Pacifist - Does NOT Shoot

const spawnPotShotPacifist = (x, invert = false, speed = 3) => {
    return spawnPotShot(x, invert, speed);
}

// Sniper - Fires Projectiles targeting the player

const spawnPotShotSniper = (x, invert = false, speed = 3, intensity = 0) => {
    const potShot = spawnPotShot(x, invert, speed, intensity);

    // SHOOTING MECHANICS
    // 90 - intensity * 6 ... 84, 78, 72, 66, 60
    // 4 + intensity * 0.6 ... 4.6, 5.2, 5.8, 6.4, 7
    // MIN = 90 / 4
    // MAX = 60 / 7
    const rof = 90 - (intensity * 6);
    const spd = 4 + (intensity * 0.6);

    potShot.toShoot = 60 - (intensity * 6);
    if(intensity >= 4){
        potShot.shootFunc = shootSpread(rof, spd, 4, 15);
    }else if(intensity >= 2){
        potShot.shootFunc = shootSpread(rof,spd, 2, 30);
    } else {
        potShot.shootFunc = shootAtPlayer(rof, spd);
    }

    potShot.health = 3;
    potShot.points = 15;
    potShot.points += (potShot.points + 1) * intensity;

    // CHANGE COLORS
    potShot.styles = setColors(orange, red, potShot);

    return potShot;
}

// Cover - Fires Projectiles

const spawnPotShotCover = (x, invert = false, speed = 3, intensity = 0) => {
    const potShot = spawnPotShot(x, invert, speed, intensity);

    // SHOOTING MECHANICS
    // 90 - intensity * 6 ... 84, 78, 72, 66, 60
    // 4 + intensity * 0.6 ... 4.6, 5.2, 5.8, 6.4, 7
    // MIN = 90 / 4
    // MAX = 60 / 7
    const rof = 90 - (intensity * 6);
    const spd = 4 + (intensity * 0.6);

    potShot.toShoot = 60 - (intensity * 6);
    if(intensity >= 3){
        potShot.shootFunc = shootArc(rof, spd, 8, 0, 360);
    } else {
        potShot.shootFunc = shootArc(rof, spd, 4, 0, 360);
    }

    potShot.points = 49;
    potShot.points += (potShot.points + 1) * intensity;

    // CHANGE COLORS
    const palette = [
        pink,
        purple,
        aqua,
        yellow,
        orange,
        red,
    ]
    potShot.styles = setColors(aqua, palette[intensity], potShot);

    return potShot;
}

/*====================/
    CLASS: KamiKaze
====================*/

const spawnKamikaze = (x, invert = false, speed = 4, intensity = 1) => {
    const kamikaze = new Kamikaze(0, invert);
    if(!x){
        const drawW = kamikaze.drawW;
        const spawnLimit = drawW / 2 + drawW;
        kamikaze.x = getRandom(spawnLimit, viewport.width - spawnLimit);
    } else {
        kamikaze.x = x;
    }

    kamikaze.speed = speed;
}

// Pacifist

const spawnKamikazePacifist = (x, invert = false, intensity = 1) => {
    const kamikaze = new Kamikaze(0, invert);
    const spawnLimit = kamikaze.drawW /2 + kamikaze.drawW;
    kamikaze.x = getRandom(spawnLimit, viewport.width - spawnLimit);
    // CHANGE COLORS
    return kamikaze
}

// Sniper

// Cover

/*====================/
    CLASS: Gunner
====================*/

const spawnGun001 = (type) => {

}

// SPAWN Flying V Potshots
// SPAWN SPREAD POT SHOTS
// SPAWN AN INVERSION OF THE PREVIOUS
// SPAWN KAMIKAZE SEMI-RANDOMLY
// SPAWN 6 KAMIKAZE at once
// SPAWN an INVERSION OF THE PREVIOUS
// SPAWN ACE THAT PERFORM A U-TURN
// SPAWN ACE THAT PERFORM A 90 DEG TURN
// SPAWN ACE THAT PERFORM A 360 DEG TURN
// SPAWN AN INVERSION OF THE PREVIOUS
// SPAWN TWO MGS
// SPAWN AN INVERSION

const spawnActor = (actor) => {
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