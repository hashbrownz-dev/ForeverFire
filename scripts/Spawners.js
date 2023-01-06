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
    potShot.styles = [
        // Override outline
        { method: 'stroke', defaultColor:potShot.outline, newColor:'#32CD32'},
        // Override cokpit color
        { method: 'fill', defaultColor: potShot.fill, newColor: '#30D5C8'}
    ]
    // We can do it in our spawn function AFTER we instantiate our enemy
    // Finally we return our instantiated object so that it can be pushed into Game.Actors
    return potShot;
}

// PotShots - Flies vertically

const spawnPotShot = (x, invert = false, intensity = 1) => {
    const potShot = new PotShot(0, invert);
    if(!x){
        const drawW = potShot.drawW;
        const spawnLimit = drawW / 2 + drawW;
        potShot.x = getRandom(spawnLimit, viewport.width - spawnLimit);
    } else {
        potShot.x = x;
    }
    potShot.speed = 2 + (0.5 * intensity);
    // CHANGE COLORS
    // potShot.styles = [];
    // potShot.styles.push({
    //     method:'stroke',
    //     defaultColor:potShot.outline,
    //     newColor: enemyColors[intensity - 1]
    // })
    return potShot;
}

// Pacifist - Does NOT Shoot

const spawnPotShotPacifist = (x, invert = false, intensity = 1) => {
    return spawnPotShot(x, invert, intensity);
}

// Sniper - Fires Projectiles targeting the player

const spawnPotShotSniper = (x, invert = false, intensity = 1) => {
    const potShot = spawnPotShot(x, invert, intensity);
    // SHOOTING MECHANICS
    potShot.toShoot = 60;
    potShot.shootFunc = shootAtPlayer(120,3);
    // CHANGE COLORS
    // potShot.styles.push({
    //     method:'fill',
    //     defaultColor:potShot.fill,
    //     newColor: enemyColors[intensity - 1]
    // })
    return potShot;
}

// Cover - Fires Projectiles

// KAMIKAZE

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