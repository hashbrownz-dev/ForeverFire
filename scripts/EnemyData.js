// const enemy = {
//     className : String (potshot, kamikaze, ace, gunner),
//     health : Number,
//     speed : Number,
//     x : Number,
//     rank : Number,
//     points : Number,
//     drops : String (medal, smallHealth, largeHealth, extraLife, speedUp, speedDown, weaponM, weaponF, weaponS, BFG, invincibility),
//     outline : white Variable,
//     fill : aqua Variable,
//     invert : Boolean,
//     shootingData : {
//         toShoot : Number,
//         type : String (player, spread arc),
//         interval : Number,
//         speed : Number,
//         defTarget : Number
//     }
// }

/*=============
=== POTSHOT ===
=============*/

const ps = {
    className : 'potshot',
    health : 2,
    rank : 1,
    points : 10,
    outline : white,
    fill : red
}

const psPlayer = {
    className : 'potshot',
    health : 2,
    rank : 2,
    points : 15,
    outline : red,
    fill : aqua,
    shootingData : {
        toShoot : 60,
        type : 'player',
        interval : -1,
        speed : 8,
        defTarget : 90
    }
}

const psJugg = {
    className : 'potshot',
    health : 10,
    speed : 3,
    rank : 3,
    points : 20,
    outline : lime,
    fill : red
}

const psSpread = {
    className : 'potshot',
    health : 4,
    rank : 3,
    points : 20,
    outline : orange,
    fill : aqua,
    shootingData : {
        toShoot : 30,
        type : 'spread',
        interval : -1,
        speed : 7,
        amount : 3,
        margin : 30,
        defTarget : 90
    }
}

const psCross = {
    className : 'potshot',
    health : 4,
    rank : 3,
    points : 20,
    outline : aqua,
    fill : pink,
    shootingData : {
        toShoot : 75,
        type : 'arc',
        interval : -1,
        speed : 4,
        amount : 3,
        startAngle : 180,
        endAngle : 450
    }
}

const psX = {
    className : 'potshot',
    health : 4,
    rank : 3,
    points : 20,
    outline : pink,
    fill : aqua,
    shootingData : {
        toShoot : 75,
        type : 'arc',
        interval : -1,
        speed : 4,
        amount : 4,
        startAngle : 45,
        endAngle : 405
    }
}

const psCircle = {
    className : 'potshot',
    health : 4,
    rank : 4,
    points : 30,
    outline : gold,
    fill : red,
    shootingData : {
        toShoot : 75,
        type : 'arc',
        interval : -1,
        speed : 4,
        amount : 12,
        startAngle : 30,
        endAngle : 390
    }
}

const psHeal = {
    className : 'potshot',
    health : 4,
    speed : 3,
    points : 10,
    drops : 'smallHealth',
    outline : lime,
    fill : aqua,
}

/*==============
=== KAMIKAZE ===
==============*/

const kami = {
    className : 'kamikaze',
    speed : 6,
    rank : 1,
    points : 10,
    outline : white,
    fill : red,
}

const kamiPlayer = {
    className : 'kamikaze',
    speed : 6,
    rank : 2,
    points : 15,
    outline : orange,
    fill : aqua,
    shootingData : {
        type : 'player',
        toShoot : 45,
        interval : -1,
        speed : 8,
        defTarget : 90
    }
}

const kamiJugg = {
    className : 'kamikaze',
    speed : 6,
    rank : 3,
    points : 25,
    outline : lime,
    fill : yellow,
}

const kamiDog = {
    className : 'kamikaze',
    speed : 4,
    rank : 4,
    points : 45,
    outline : aqua,
    fill : orange,
    invert : true,
    shootingData : {
        type : 'player',
        toShoot : 60,
        interval : 75,
        speed : 8,
        defTarget : 270
    }
}

const kamiSpread = {
    className : 'kamikaze',
    speed : 4,
    rank : 2,
    points : 25,
    outline : pink,
    fill : aqua,
    shootingData : {
        type : 'spread',
        toShoot : 45,
        interval : -1,
        speed : 8,
        amount : 2,
        margin : 30,
        defTarget : 90
    }
}

/*============
=== GUNNER ===
============*/

const gunM = {
    className : 'gunner',
    health : 20,
    speed : 0.5,
    points : 50,
    drops : 'weaponM',
    outline : lime,
    fill : yellow,
    shootingData : {
        type : 'player',
        toShoot : 120,
        interval : 60,
        speed : 8,
        defTarget : 90
    }
}

const gunF = {
    className : 'gunner',
    health : 20,
    speed : 0.5,
    points : 50,
    drops : 'weaponF',
    outline : orange,
    fill : yellow,
    shootingData : {
        type : 'arc',
        toShoot : 120,
        interval : 90,
        speed : 4,
        amount : 8,
        startAngle : 45,
        endAngle : 415
    }
}

const gunS = {
    className : 'gunner',
    health : 20,
    speed : 0.5,
    points : 50,
    drops : 'weaponS',
    outline : red,
    fill : aqua,
    shootingData : {
        type : 'spread',
        toShoot : 120,
        interval : 90,
        speed : 4,
        amount : 5,
        margin : 20,
        defTarget : 90
    }
}

const gunLH = {
    className : 'gunner',
    health : 40,
    speed : 1,
    points : 50,
    drops : 'largeHealth',
    outline : aqua,
    fill : pink,
}

const gunHog = {
    className : 'gunner',
    health : 40,
    speed : 0.5,
    rank : 5,
    points : 100,
    outline : pink,
    fill : aqua,
    shootingData : {
        type : 'blank',
        toShoot : 120,
        interval : 75,
        speed : 8,
        amount : 2,
        margin : 80,
        defTarget : 90
    }
}

const gunDog = {
    className : 'gunner',
    health : 10,
    speed : 1.5,
    rank : 5,
    points : 150,
    outline : lime,
    fill : red,
    invert : true,
    shootingData : {
        type : 'spread',
        toShoot : 240,
        interval : 75,
        speed : 6,
        amount : 3,
        margin : 15,
        defTarget : 270
    }
}

/*=============
===== ACE =====
=============*/

// FLIGHT PATTERNS

const testAce = {
    className : 'ace',
    health : 2,
    speed : 5,
    xPos : 700,
    // yPos : 100,
    rank : 2,
    points : 25,
    outline : red,
    fill : orange,
    shootingData : {
        type : 'player',
        toShoot : -1,
        interval : -1,
        speed : 8,
        defTarget : 90
    },
    momentData : [
        { type : 'straight', duration : 15},
        { type : 'shoot' },
        // { type : 'turn', duration : 120, turnDegree : 180},
        { type : 'chase', duration : 240},
        { type : 'straight', duration : 30},
        { type : 'shoot' },
        { type : 'exit'}
    ]
}

const aceUVert = (xPos, mirror, invert) => {
    const getXPos = () => {
        let output = xPos ? xPos : getRandom(50,350);
        if(mirror) output = viewport.width - output;
        if(invert) output =- output;
        return output;
    }
    const getDeg = (deg) => {
        let output = deg;
        if(mirror) output =- output;
        if(invert) output =- output;
        return output;
    }
    return {
        className : 'ace',
        health : 2,
        speed : 5,
        xPos : getXPos(),
        rank : 2,
        points : 25,
        outline : aqua,
        fill : pink,
        shootingData : {
            type : 'player',
            toShoot : -1,
            interval : -1,
            speed : 8,
            defTarget : 90
        },
        momentData : [
            { type : 'straight', duration : 50 },
            { type : 'shoot' },
            { type : 'straight', duration : 50 },
            { type : 'turn', turnDegree : getDeg(-180), duration : 45 },
            { type : 'straight', duration : 75 },
            { type : 'shoot' },
            { type : 'exit' },
        ]
    }
}

const aceUHor = (yPos, mirror, invert) => {
    const getYPos = () => {
        let output = yPos ? yPos : getRandom(50,350);
        if(mirror) output = viewport.height - output;
        if(invert) output =- output;
        return output;
    }
    const getDeg = (deg) => {
        let output = deg;
        if(mirror) output =- output;
        if(invert) output =- output;
        return output;
    }
    return {
        className : 'ace',
        health : 2,
        speed : 5,
        yPos : getYPos(),
        rank : 2,
        points : 25,
        outline : pink,
        fill : aqua,
        shootingData : {
            type : 'player',
            toShoot : -1,
            interval : -1,
            speed : 8,
            defTarget : 90
        },
        momentData : [
            { type : 'straight', duration : 65 },
            { type : 'shoot' },
            { type : 'straight', duration : 65 },
            { type : 'turn', turnDegree : getDeg(180), duration : 45 },
            { type : 'straight', duration : 45 },
            { type : 'shoot' },
            { type : 'exit' },
        ]
    }
}

const aceChase = (pos) => {
    let xPos = pos ? pos : getRandom(50, 750);
    return {
        className : 'ace',
        health : 4,
        speed : 5,
        xPos : xPos,
        rank : 4,
        points : 35,
        outline : gold,
        fill : red,
        momentData : [
            { type : 'straight', duration : 30 },
            { type : 'chase', duration : 240 },
            { type : 'exit' },
        ]
    }
}

const aceChaseInv = (pos) => {
    let xPos = pos ? pos : getRandom(50, 750);
    xPos =- xPos;
    return {
        className : 'ace',
        health : 10,
        speed : 4,
        xPos : xPos,
        rank : 5,
        points : 50,
        outline : gold,
        fill : red,
        momentData : [
            { type : 'straight', duration : 110 },
            { type : 'chase', duration : 240 },
            { type : 'exit' },
        ]
    }
}

const aceSnake = (pos, mirror, invert) => {
    let xPos = pos ? pos : getRandom(50, 400);
    let deg = 50;
    if(mirror){
        xPos = viewport.width -xPos;
        deg =- deg;
    }
    if(invert){
        xPos =- xPos;
        deg =- deg;
    }
    return {
        className : 'ace',
        health : 4,
        speed : 5,
        xPos : xPos,
        rank : 3,
        points : 25,
        outline : lime,
        fill : red,
        shootingData : {
            type : 'player',
            toShoot : -1,
            interval : -1,
            speed : 8,
            defTarget : 90
        },
        momentData : [
            { type : 'straight' , duration : 10},
            { type : 'turn', turnDegree : -deg, duration : 45},
            { type : 'straight' , duration : 10},
            { type : 'turn', turnDegree : deg, duration : 30},
            { type : 'shoot'},
            { type : 'turn', turnDegree : deg, duration : 30},
            { type : 'straight', duration : 10},
            { type : 'turn', turnDegree : -deg, duration : 45},
            { type : 'exit'},
        ]
    }
}

const ace90Hor = (pos, mirror, invert) => {
    let yPos = pos ? pos : getRandom(50, 300);
    let deg = 90;
    if(mirror){
        yPos = viewport.height - yPos;
        deg =- deg;
    }
    if(invert){
        yPos =- yPos;
        deg =- deg;
    }
    return {
        className : 'ace',
        health : 2,
        speed : 5,
        yPos : yPos,
        rank : 2,
        points : 25,
        outline : red,
        fill : orange,
        shootingData : {
            type : 'player',
            toShoot : -1,
            interval : -1,
            speed : 8,
            defTarget : 90
        },
        momentData : [
            { type : 'straight', duration : 105 },
            { type : 'turn', turnDegree : deg, duration : 55 },
            { type : 'straight', duration : 15 },
            { type : 'shoot' },
            { type : 'exit' },
        ]
    }
}

const ace90Vert = (pos, mirror, invert) => {
    let xPos = pos ? pos : getRandom(50, 400);
    let deg = -90;
    if(mirror){
        xPos = viewport.width - xPos;
        deg =- deg;
    }
    if(invert){
        xPos =- xPos;
        deg =- deg;
    }
    return {
        className : 'ace',
        health : 2,
        speed : 4,
        xPos : xPos,
        rank : 2,
        points : 25,
        outline : red,
        fill : orange,
        shootingData : {
            type : 'player',
            toShoot : -1,
            interval : -1,
            speed : 8,
            defTarget : 90
        },
        momentData : [
            { type : 'straight', duration : 60 },
            { type : 'turn', turnDegree : deg, duration : 60 },
            { type : 'straight', duration : 15 },
            { type : 'shoot' },
            { type : 'exit' },
        ]
    }
}

const aceCircle = (invert) => {
    let xPos = invert ? 150 : 650;
    let deg = invert ? -90 : 90;
    let dur = 75;
    return {
        className : 'ace',
        health : 2,
        speed : 5,
        xPos : xPos,
        rank : 4,
        points : 25,
        outline : yellow,
        fill : orange,
        shootingData : {
            type : 'player',
            toShoot : -1,
            interval : -1,
            speed : 6,
            defTarget : 90
        },
        momentData : [
            { type : 'straight', duration : 60},
            { type : 'turn', turnDegree : deg, duration : dur},
            { type : 'shoot'},
            { type : 'turn', turnDegree : deg, duration : dur},
            { type : 'shoot'},
            { type : 'turn', turnDegree : deg, duration : dur},
            { type : 'shoot'},
            { type : 'turn', turnDegree : deg, duration : dur},
            { type : 'shoot'},
            { type : 'turn', turnDegree : deg, duration : dur},
            { type : 'shoot'},
            { type : 'turn', turnDegree : deg, duration : dur},
            { type : 'exit'}
        ]
    }
}