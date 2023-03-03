const intermission = (duration = 30) => {
    return new Alarm(duration, ()=>{})
}

/*=============/
    ENEMIES
==============*/

/*=============/
    WAVE 01
==============*/

// W1P1

const w1p1 = () => {
    const spawn = (game) => {
        const enemy = new PotShot(0,false);
        enemy.x = getRandom(200, 600);
        enemy.speed = 4;
        enemy.points = 9;
        enemy.styles = setColors(white, aqua, enemy);

        game.Actors.push(enemy);
    }
    return new Interval(60, spawn, 480)
}

// W1P2

const w1p2 = () => {
    const spawn = (game) => {
        const enemy = new PotShot(0,false,60,shootAtPlayer(-1,4,90));
        enemy.x = getRandom(200, 600);
        enemy.health = 3;
        enemy.speed = 3;
        enemy.points = 10;
        enemy.styles = setColors(yellow, aqua, enemy);

        game.Actors.push(enemy);
    }
    return new Interval(60, spawn, 480);
}

// W1P3

const w1p3 = () => {
    const spawn = (game) => {
        const enemy = new Gunner(viewport.width/2, false, 20, 120, shootSpread(60, 4, 5, 20, 90));
        enemy.dropType = 's';
        enemy.styles = setColors(red, gold, enemy);

        game.Actors.push(enemy);
    }
    return [
        new Alarm(0,spawn),
        new Alarm(300, ()=>{})
    ]
}

// W1P4

const w1p4 = () => {
    const spawn = (game) => {
        // Spawn a flying V of potShots, with one potShot selected at random to be a 'healer'
        const enemies = [ new PotShot(viewport.width/2) ];
        const xOffset = enemies[0].drawW, yOffset = enemies[0].drawH / 2;
        enemies.push(
            new PotShot(enemies[0].x + xOffset),
            new PotShot(enemies[0].x - xOffset),
            new PotShot(enemies[0].x + (xOffset * 2)),
            new PotShot(enemies[0].x - (xOffset * 2))
        );
        enemies[1].y -= yOffset;
        enemies[2].y -= yOffset;
        enemies[3].y -= yOffset * 2;
        enemies[4].y -= yOffset * 2;

        const healerIndex = getRandom(0, 4);

        for(const enemy of enemies){
            enemy.speed = 4;
            if( healerIndex === enemies.indexOf(enemy)){
                enemy.healer = true;
                enemy.points = 14;
                enemy.styles = setColors(lime, white, enemy);
            } else {
                enemy.points = 9;
                enemy.styles = setColors(white, lime, enemy);
            }
        }

        game.Actors.push(...enemies);
    }
    return new Interval(120, spawn, 360);
}

const Wave01 = () => new Timeline([
    w1p1(),
    intermission(120),
    w1p2(),
    ...w1p3(),
    w1p2(),
    w1p4()
]);