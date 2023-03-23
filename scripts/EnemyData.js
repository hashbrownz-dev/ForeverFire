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
    drops : 'BFG',
    outline : lime,
    fill : red
}

const psSpread = {
    className : 'potshot',
    health : 2,
    rank : 2,
    points : 15,
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
    rank : 2,
    points : 15,
    outline : aqua,
    fill : pink,
    shootingData : {
        toShoot : 75,
        type : 'arc',
        interval : -1,
        speed : 6,
        amount : 4,
        startAngle : 90,
        endAngle : 450
    }
}

const psX = {
    className : 'potshot',
    health : 4,
    rank : 2,
    points : 15,
    outline : pink,
    fill : aqua,
    shootingData : {
        toShoot : 75,
        type : 'arc',
        interval : -1,
        speed : 6,
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
        speed : 6,
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