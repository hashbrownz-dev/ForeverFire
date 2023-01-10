// While every enemy class has a spawn method, here we will define additional functions for spawning enemies.  This will allow us to create mobs that have the same basic movement functionality, but can have different color configurations and shooting patterns
// So we'll need to do a few things:
// First, we'll need to handle our style override logic FIRST
// Second, we'll need to develop a system that allows us to increase difficulty overtime.  So, for instance, the basic PotShot flies in a straight line and shoots bullets at the player.  While this basic behavior should stay the same, as the game progresses we can modify this behavior to increase difficulty.  This primarily involves increasing the flight speed, rate of fire, and projectile speed.

// EXAMPLE SPAWN FUNCTION

const spawnSample = () => {
    const potShot = new PotShot(0, false, 60, shootAtPlayer(120,3));
    potShot.x = getRandom(potShot.drawW, viewport.width - (potShot.drawW * 2));
    // If we need to adjust the flight speed
    // potShot.speed = 5;
    // Or ANY other properties
    potShot.points = 19;
    // Style Override
    potShot.styles = setColors(red, yellow, potShot);
    return potShot;
}

// PotShots - Flies vertically

const spawnPotShot = (x, invert = false, speed = 2.5, intensity = 0) => {
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
    potShot.points += (potShot.points + 1) * intensity;

    // CHANGE COLORS
    potShot.styles = setColors(white, aqua, potShot);

    return potShot;
}

// Pacifist - Does NOT Shoot

const spawnPotShotPacifist = (x, invert = false, speed = 3) => {
    return spawnPotShot(x, invert, speed, 0);
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

    potShot.points = 19;
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
    potShot.styles = setColors(orange, palette[intensity], potShot);

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

// KAMIKAZE

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