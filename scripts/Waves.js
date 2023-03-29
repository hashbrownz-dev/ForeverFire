const intermission = (duration = 30) => {
    return new Alarm(duration, ()=>{})
}

const Wave01 = () => new Timeline([
    spawnCluster(ps, 4),
    intermission(120),
    spawnCluster(psPlayer, 4),
    intermission(120),
    spawnCluster(ps, 6),
    intermission(120),
    spawnCluster(psPlayer,6),
    new Alarm(120, (game)=>{
        const enemy = spawnActor(gunS);
        enemy.x = 400;
        game.Actors.push(enemy);
    }),
    new Alarm(1, (game)=>{
        game.Actors.push(spawnActor(ace90Vert(100, false, true)));
        game.Actors.push(spawnActor(ace90Vert(100, true, true)));
    }),
    intermission(240),
    spawnCluster(ps, 8),
    intermission(60),
    spawnCluster(psPlayer, 8)
]);

const Wave02 = () => new Timeline([
    intermission(30),
    new Interval(20, (game)=>{
        game.Actors.push(spawnActor(kami))
    }, 300),
    intermission(120),
    new Interval(25, (game)=>{
        if(Math.round(Math.random())){
            game.Actors.push(spawnActor(psPlayer));
        }else{
            game.Actors.push(spawnActor(kami));
        }
    }, 450),
    intermission(120),
    spawnCluster(ps, 4),
    spawnCluster(kami, 4),
    intermission(120),
    spawnCluster(kamiPlayer, 4),
    spawnCluster(psPlayer, 6),
    new Alarm(120, (game)=>{
        const enemy = spawnActor(gunS);
        enemy.x = 400;
        game.Actors.push(enemy);
    }),
    new Alarm(1, (game)=>{
        game.Actors.push(spawnActor(ace90Vert(100, false, true)));
        game.Actors.push(spawnActor(ace90Vert(100, true, true)));
    }),
    intermission(240),
    spawnCluster(psPlayer, 6),
    intermission(30),
    spawnCluster(psPlayer, 6),
    intermission(30),
    spawnCluster(kami, 8),
    spawnCluster(psPlayer, 8),
    intermission(30),
    spawnCluster(psHeal, 4),
    intermission(15),
    spawnCluster(psHeal, 4),
    intermission(15),
    spawnCluster(psHeal, 4),
    intermission(30),
])

const Wave03 = () => new Timeline([
    new Interval(20, (game) => {
        game.Actors.push(spawnActor(ace90Hor(50,false,true)))
    }, 60),
    intermission(120),
    new Interval(20, (game) => {
        game.Actors.push(spawnActor(aceUVert(100, true, true)))
    }, 60),
    intermission(120),
    new Interval(20, (game) => {
        game.Actors.push(spawnActor(ace90Hor(50,false,false)))
    }, 60),
    intermission(120),
    new Interval(20, (game) => {
        game.Actors.push(spawnActor(aceUVert(100, false, true)))
    }, 60),
    new Alarm(120, (game)=>{
        const enemy = spawnActor(gunM);
        enemy.x = 400;
        game.Actors.push(enemy);
    }),
    new Interval(20, (game)=>{
        game.Actors.push(spawnActor(ace90Vert(100, false, true)));
        game.Actors.push(spawnActor(ace90Vert(100, true, true)));
    }, 80),
    intermission(240),
    spawnCluster(kamiPlayer, 8),
    intermission(120),
    spawnCluster(psPlayer, 8),
    intermission(100),
    spawnCluster(kamiPlayer, 8),
    intermission(80),
    spawnCluster(psHeal, 8),
    intermission(120),
])

const Wave04 = () => new Timeline([
    new Alarm(120, (game) => {
        const enemies = [spawnActor(gunM)];
        formBoat(400, enemies);
        game.Actors.push(...enemies);
    }),
    intermission(120),
    new Interval(20, (game) => {
        const enemies = [
            spawnActor(ace90Vert(50, true, false)),
            spawnActor(ace90Vert(50)),
        ]
        game.Actors.push(...enemies);
    },40),
    intermission(240),
    new Interval(20, (game) => {
        const enemies = [
            spawnActor(ace90Vert(50, true, false)),
            spawnActor(ace90Vert(50)),
        ]
        game.Actors.push(...enemies);
    }, 80),
    intermission(120),
    spawnCluster(ps, 8),
    spawnCluster(kami, 8),
    intermission(120),
    // BOATS
    new Interval(120, (game) => {
        const enemies = [spawnActor(psJugg)];
        for(let i = 4; i > 0; i--){
            enemies.push(spawnActor(ps));
        }
        for(let i = 2; i > 0; i--){
            const enemy = spawnActor(psPlayer);
            enemy.toShoot *= 2;
            enemies.push(enemy);
        }
        formBoat(getRandom(150,650), enemies, false, 20);
        game.Actors.push(...enemies);
    }, 1200),
    // HEALING WALL
    new Interval(40, (game) => {
        const enemies = [];
        for(let i = 10; i > 0; i--){
            const n = getRandom(1,10);
            n === 1 ? enemies.push(spawnActor(psJugg)) : enemies.push(spawnActor(psHeal));
        }
        formRow(400, enemies, 16, true);
        game.Actors.push(...enemies);
    }, 240)
])

const Wave05 = () => new Timeline([
    new Alarm(60, (game) => {
        const enemies = [];
        for(let i = 5; i > 0; i--){
            enemies.push(spawnActor(psJugg));
        }
        formRow(400, enemies, 40, true);
        game.Actors.push(...enemies);
    }),
    new Alarm(120, (game) => {
        const enemies = [spawnActor(gunS), spawnActor(gunS)];
        enemies[0].x = 250;
        enemies[1].x = 550;
        game.Actors.push(...enemies);
    }),
    intermission(240),
    new Interval(20, (game) => {
        const enemies = [
            spawnActor(aceUVert(450)),
            spawnActor(aceUVert(450,true)),
        ]
        game.Actors.push(...enemies);
    }, 60),
    new Alarm(120, (game) => {
        const enemies = [];
        for(let i = 5; i > 0; i--){
            enemies.push(spawnActor(psHeal));
        }
        formV(400, enemies);
        game.Actors.push(...enemies);
    }),
    intermission(120),
    new Interval(20, (game) => {
        game.Actors.push(spawnActor(ps))
    }, 200),
    intermission(60),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(kami))
    }, 150),
    intermission(60),
    new Interval(20, (game) => {
        game.Actors.push(spawnActor(psPlayer));
    }, 200),
    intermission(60),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(kamiPlayer))
    }, 150),
    intermission(60),
    new Interval(20, (game) => {
        game.Actors.push(spawnActor(psSpread))
    }, 200),
    intermission(60),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(kamiSpread))
    }, 150),
    new Alarm(150, (game) => {
        const enemies = [spawnActor(gunF), spawnActor(gunF)];
        enemies[0].x = 300;
        enemies[1].x = 500;
        game.Actors.push(...enemies);
    }),
    new Alarm(360, (game) => {
        const enemies = [];
        for(let i = 10; i > 0; i--){
            enemies.push(spawnActor(psHeal));
        }
        formTriangle(400, enemies);
        game.Actors.push(...enemies);
    })
])

// Celebrate the flame shot by spawning enemies in triangle, boat, and rows
const Wave06 = () => new Timeline([
    intermission(60),
    new Interval(60, (game) => {
        const enemies = [];
        for(let i = 4; i>0; i--){
            enemies.push(spawnActor(ps));
        }
        formRow(getRandom(50,500), enemies, 16, false);
        game.Actors.push(...enemies);
    }, 600),
    intermission(120),
    new Interval(60, (game) => {
        const enemies = [
            spawnActor(psPlayer),
            spawnActor(psPlayer),
            spawnActor(psPlayer),
        ]
        formTriangle(getRandom(100,700), enemies, 16,20);
        game.Actors.push(...enemies);
    }, 600),
    intermission(120),
    new Interval(30, (game) => {
        const enemies = [
            spawnActor(kamiPlayer),
            spawnActor(kami),
            spawnActor(kami),
        ]
        formTriangle(getRandom(100,700), enemies, 16, 20);
        game.Actors.push(...enemies);
    }, 600),
    intermission(240),
    new Interval(30, (game) => {
        const x = game.Player ? game.Player.x : 400;
        const enemies = [
            spawnActor(psCircle),
            spawnActor(kami),
            spawnActor(kami),
            spawnActor(kami),
            spawnActor(kami),
        ]
        formV(x, enemies);
        enemies[0].speed = 6;
        game.Actors.push(...enemies);
    },600),
    new Alarm(120, (game) => {
        const enemies = [];
        for(let i = 4; i > 0; i--){
            enemies.push(spawnActor(gunHog));
        }
        formRow(400, enemies, 100, true);
        game.Actors.push(...enemies);
    }),
    new Alarm(240, (game) => {
        const enemies = [
            spawnActor(gunDog),
            spawnActor(gunDog),
            spawnActor(gunDog),
        ]
        formRow(400, enemies, 200, true);
        game.Actors.push(...enemies);
    }),
    new Alarm(300, (game) => {
        const enemy = spawnActor(gunS);
        enemy.x = 400;
        game.Actors.push(enemy);
    }),
    new Interval(30, (game) => {
        game.Actors.push(spawnActor(psHeal));
    }, 600),
    intermission(60)
])

// approxmately 5 minutes of gameplay

const Wave07 = () => new Timeline([
    intermission(60),
    new Interval(30, (game) => {
        const enemies = [];
        for(let i = 3; i > 0; i--){
            enemies.push(spawnActor(ps));
        }
        formRow(getRandom(50,650), enemies);
        game.Actors.push(...enemies)
    }, 300),
    new Interval(20, (game) => {
        const enemies = [];
        for(let i = 3; i > 0; i--){
            enemies.push(spawnActor(kami));
        }
        formRow(getRandom(50,650), enemies);
        game.Actors.push(...enemies)
    }, 420),
    intermission(120),
    new Interval(30, (game) => {
        const enemies = [];
        for(let i = 3; i > 0; i--){
            enemies.push(spawnActor(psPlayer));
        }
        formRow(getRandom(50,650), enemies);
        game.Actors.push(...enemies)
    }, 450),
    intermission(60),
    new Interval(20, (game) => {
        const enemies = [];
        for(let i = 3; i > 0; i--){
            enemies.push(spawnActor(kamiPlayer));
        }
        const x = game.Player ? game.Player.x : 400;
        formRow(x, enemies, 54, true);
        game.Actors.push(...enemies)
    }, 460),
    new Alarm(120, (game) => {
        const enemies = [];
        for(let i = 4; i > 0 ; i--){
            enemies.push(spawnActor(gunHog));
        }
        formRow(400, enemies, 100, true);
        game.Actors.push(...enemies);
    }),
    new Interval(20, (game) => {
        const enemy = spawnActor(kamiPlayer);
        enemy.x = 400;
        game.Actors.push(enemy);
    }, 400),
    new Interval(20, (game) => {
        const enemies = [];
        for(let i = 3; i > 0 ; i--){
            enemies.push(spawnActor(kamiPlayer));
        }
        formRow(400, enemies, 20, true);
        game.Actors.push(...enemies);
    }, 600),
    new Alarm(1, (game) => {
        const enemies = [];
        for(let i = 13; i > 0; i--){
            enemies.push(spawnActor(psHeal));
        }
        formBoat(400, enemies);
        game.Actors.push(...enemies);
    })
])

const Wave08 = () => new Timeline([
    intermission(120),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(ace90Hor(80)));
    }, 190),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(ace90Hor(160,false,true)));
    }, 190),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(ace90Hor(240)));
    }, 190),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(ace90Hor(320,false,true)));
    }, 190),
    intermission(120),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(ace90Vert(80)));
    }, 190),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(ace90Vert(160, true, false)));
    }, 190),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(ace90Vert(240)));
    }, 190),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(ace90Vert(320, true, false)));
    }, 190),
    intermission(120),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(aceCircle()))
    }, 30),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(aceCircle(true)))
    }, 30),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(aceCircle()))
    }, 30),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(aceCircle(true)))
    }, 30),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(aceCircle()))
    }, 30),
    new Interval(15, (game) => {
        game.Actors.push(spawnActor(aceCircle(true)))
    }, 30),
    new Alarm(60, (game) => {
        game.Actors.push(spawnActor(aceSnake(100)));
        game.Actors.push(spawnActor(aceSnake(100,true)));
    }),
    intermission(120),
    new Interval(30, (game) => {
        game.Actors.push(spawnActor(aceChase(400)));
    }, 300),
    new Interval(30, (game) => {
        game.Actors.push(spawnActor(aceChase()));
    }, 300),
    new Alarm(240, (game) => {
        const enemies = [];
        for(let i = 3; i > 0; i--){
            enemies.push(spawnActor(gunM));
        }
        formRow(400, enemies, 100, true);
        game.Actors.push(...enemies);
    }),
    intermission(90),
    new Interval(20, (game) => {
        game.Actors.push(spawnActor(aceUVert(325)));
    }, 240),
    new Alarm(240, (game) => {
        const enemies = [];
        for(let i = 3; i > 0; i--){
            enemies.push(spawnActor(gunS));
        }
        formRow(400, enemies, 100, true);
        game.Actors.push(...enemies);
    }),
    intermission(90),
    new Interval(20, (game) => {
        game.Actors.push(spawnActor(aceUVert(325, true)));
    }, 240),
    new Alarm(240, (game) => {
        const enemies = [];
        for(let i = 3; i > 0; i--){
            enemies.push(spawnActor(gunF));
        }
        formRow(400, enemies, 100, true);
        game.Actors.push(...enemies);
    }),
    intermission(90),
    new Interval(20, (game) => {
        game.Actors.push(spawnActor(aceUVert(325)));
        game.Actors.push(spawnActor(aceUVert(325, true)));
    }, 240),
    new Alarm(240, (game) => {
        const enemies = [];
        for(let i = 10; i > 0; i--){
            enemies.push(spawnActor(psHeal));
        }
        formTriangle(400, enemies);
        game.Actors.push(...enemies);
    }),
    new Alarm(180, (game) => {
        const enemies = [];
        for(let i = 10; i > 0; i--){
            enemies.push(spawnActor(psHeal));
        }
        formTriangle(200, enemies);
        game.Actors.push(...enemies);
    }),
    new Alarm(180, (game) => {
        const enemies = [];
        for(let i = 10; i > 0; i--){
            enemies.push(spawnActor(psHeal));
        }
        formTriangle(600, enemies);
        game.Actors.push(...enemies);
    })
])

const Wave09 = () => new Timeline([
    new Alarm(120, (game) =>{
        const enemies = [
            spawnActor(gunS),
            spawnActor(gunF),
            spawnActor(gunF),
            spawnActor(gunS),
        ]
        formRow(400, enemies, 50, true);
        game.Actors.push(...enemies);
    }),
    intermission(360),
    new Interval(60, game=>{
        const enemies = [
            spawnActor(psX),
            spawnActor(psCross),
            spawnActor(psX),
        ];
        formRow(getRandom(50,700), enemies, defaultMargin, true);
        game.Actors.push(...enemies);
    }, 300),
    new Interval(50, game=>{
        const enemies = [
            spawnActor(psX),
            spawnActor(psCross),
            spawnActor(psX),
        ];
        formRow(getRandom(100,700), enemies, defaultMargin, true);
        game.Actors.push(...enemies);
    }, 250),
    new Interval(30, game=>{
        const enemies = [
            spawnActor(psX),
            spawnActor(psCross),
            spawnActor(psX),
        ];
        formRow(getRandom(200,600), enemies, defaultMargin, true);
        game.Actors.push(...enemies);
    }, 270),
    new Interval(20, game=>{
        const enemies = [
            spawnActor(psX),
            spawnActor(psCross),
            spawnActor(psX),
        ];
        formRow(getRandom(300,500), enemies, defaultMargin, true);
        game.Actors.push(...enemies);
    }, 300),
    intermission(300),
    new Interval(10, game => {
        game.Actors.push(spawnActor(kami))
    }, 480),
    spawnCluster(kamiDog, 6),
    intermission(60),
    new Interval(20, game => {
        game.Actors.push(spawnActor(kamiSpread))
    }, 480),
    intermission(60),
    spawnCluster(psX, 15),
    intermission(60),
    spawnCluster(psCross, 15),
    intermission(60),
    spawnCluster(psCircle, 15),
    intermission(60),
    spawnCluster(psHeal, 20),
])

const Wave10 = () => new Timeline([
    new Alarm(120, (game) =>{
        const enemies = [
            spawnActor(gunS),
            spawnActor(gunF),
            spawnActor(gunM),
            spawnActor(gunF),
            spawnActor(gunS),
        ]
        formRow(400, enemies, 50, true);
        game.Actors.push(...enemies);
    }),
    //PSCHAOS
    intermission(360),
    new Interval(20, game => {
        const enemies = [
            ps,
            psPlayer,
            psJugg,
            psSpread,
            psCross,
            psX,
            psCircle,
            psHeal,
        ]
        const index = getRandom(0, enemies.length-1);
        game.Actors.push(spawnActor(enemies[index]));
    }, 600),
    intermission(60),
    new Interval(15, game => {
        const enemies = [];
        for(let i = 8; i > 0; i--){
            enemies.push(spawnActor(ps))
        }
        formRow(400, enemies, defaultMargin, true);
        game.Actors.push(...enemies);
    }, 60),
    intermission(60),
    new Interval(20, game => {
        const enemies = [];
        for(let i = 8; i > 0; i--){
            enemies.push(spawnActor(psPlayer))
        }
        formRow(400, enemies, defaultMargin, true);
        game.Actors.push(...enemies);
    }, 60),
    intermission(60),
    spawnCluster(psX, 20),
    intermission(60),
    spawnCluster(psCross, 20),
    intermission(60),
    spawnCluster(psCircle, 20),
    intermission(60),
    spawnCluster(psJugg, 20),
    intermission(120),
    new Interval(40, game => {
        const enemyTypes = [
            ps,
            psPlayer,
            psJugg,
            psSpread,
            psCross,
            psX,
            psCircle,
            psHeal,
        ];
        const enemies = [];
        for(let i = 8; i > 0; i--){
            const index = getRandom(0, enemyTypes.length-1);
            enemies.push(spawnActor(enemyTypes[index]));
        }
        formRow(400, enemies, defaultMargin, true);
        game.Actors.push(...enemies);
    }, 160),
    intermission(120),
    new Interval(40, game => {
        const enemyTypes = [
            ps,
            psPlayer,
            psJugg,
            psSpread,
            psCross,
            psX,
            psCircle,
            psHeal,
        ];
        const enemies = [];
        for(let i = 8; i > 0; i--){
            const index = getRandom(0, enemyTypes.length-1);
            enemies.push(spawnActor(enemyTypes[index]));
        }
        formRow(400, enemies, defaultMargin, true);
        game.Actors.push(...enemies);
    }, 160),
    intermission(120),
    new Interval(40, game => {
        const enemyTypes = [
            ps,
            psPlayer,
            psJugg,
            psSpread,
            psCross,
            psX,
            psCircle,
            psHeal,
        ];
        const enemies = [];
        for(let i = 8; i > 0; i--){
            const index = getRandom(0, enemyTypes.length-1);
            enemies.push(spawnActor(enemyTypes[index]));
        }
        formRow(400, enemies, defaultMargin, true);
        game.Actors.push(...enemies);
    }, 160),
    intermission(300),
    //KAMICHAOS
    new Interval(15, game => {
        const enemyTypes = [
            kami,
            kamiPlayer,
            kamiJugg,
            kamiSpread,
        ]
        game.Actors.push(spawnActor(enemyTypes[getRandom(0,3)]));
    }, 900),
    intermission(120),
    spawnCluster(kami, 20),
    spawnCluster(kamiPlayer, 20),
    spawnCluster(kami, 20),
    spawnCluster(kamiSpread, 20),
    spawnCluster(kamiPlayer, 20),
    spawnCluster(kamiDog, 8),
    spawnCluster(kamiSpread, 20),
    spawnCluster(kamiDog, 8),
    intermission(120),
    spawnCluster(psHeal, 30),
    //ACECHAOS
    new Interval(15, game => {
        game.Actors.push(spawnActor(ace90Hor(50)));
        game.Actors.push(spawnActor(ace90Hor(150)));
        game.Actors.push(spawnActor(ace90Hor(100,false,true)));
        game.Actors.push(spawnActor(ace90Hor(200,false,true)));
    }, 300),
    new Interval(15, game => {
        game.Actors.push(spawnActor(aceUHor(50)));
    }, 150),
    new Interval(15, game => {
        game.Actors.push(spawnActor(aceUHor(100, false, true)));
    }, 150),
    new Interval(15, game => {
        game.Actors.push(spawnActor(aceUHor(150)));
    }, 150),
    new Interval(15, game => {
        game.Actors.push(spawnActor(aceUHor(200, false, true)));
    }, 150),
    //GUNNER GAUNTLET
    new Alarm(60, game=>{
        const enemies = [];
        for(let i = 6; i > 0; i--){
            enemies.push(spawnActor(gunHog));
        }
        formRow(400, enemies, defaultMargin, true);
        game.Actors.push(...enemies);
    }),
    new Alarm(600, game=>{
        const enemies = [];
        for(let i = 6; i > 0; i--){
            enemies.push(spawnActor(gunM));
        }
        formRow(400, enemies, defaultMargin, true);
        game.Actors.push(...enemies);
    }),
    new Alarm(450, game=>{
        const enemies = [];
        for(let i = 6; i > 0; i--){
            enemies.push(spawnActor(gunS));
        }
        formRow(400, enemies, defaultMargin, true);
        game.Actors.push(...enemies);
    }),
    new Alarm(450, game=>{
        const enemies = [];
        for(let i = 6; i > 0; i--){
            enemies.push(spawnActor(gunF));
        }
        formRow(400, enemies, defaultMargin, true);
        game.Actors.push(...enemies);
    }),
    new Alarm(600, game=>{
        const enemies = [
            spawnActor(gunS),
            spawnActor(gunF),
            spawnActor(gunM),
            spawnActor(gunM),
            spawnActor(gunF),
            spawnActor(gunS),
        ];

        formRow(400, enemies, defaultMargin, true);
        game.Actors.push(...enemies);
    }),
    //REST
    intermission(360),
    spawnCluster(psHeal,20),
    intermission(120),
    //PURE CHAOS
    new Interval(15, game=>{
        const rng = getRandom(0,100);
        const psTypes = [
            ps,
            psPlayer,
            psJugg,
            psSpread,
            psCross,
            psX,
            psCircle,
            psHeal,
        ];
        const kamiTypes = [
            kami,
            kamiPlayer,
            kamiJugg,
            kamiSpread,
        ];
        const aceTypes = [
            'ace90Hor',
            'ace90HorI',
            'aceUHor',
            'aceUHorI',
            'aceSnake',
            'aceChase',
        ];
        const gunTypes = [
            gunM,
            gunS,
            gunF,
            gunHog,
            gunLH,
        ]
        if(rng >= 0 && rng <= 40){
            // spawn ps
            const i = getRandom(0, psTypes.length - 1);
            game.Actors.push(spawnActor(psTypes[i]));
            return;
        }
        if(rng > 40 && rng <= 70){
            // spawn kami
            const i = getRandom(0, kamiTypes.length - 1);
            game.Actors.push(spawnActor(kamiTypes[i]));
            return;
        }
        if(rng > 70 && rng <= 90){
            // spawn ace
            const type = aceTypes[getRandom(0, aceTypes.length-1)];
            switch(type){
                case 'ace90Hor':
                    game.Actors.push(spawnActor(ace90Hor()));
                    return;
                case 'ace90HorI':
                    game.Actors.push(spawnActor(ace90Hor(0,false,true)));
                    return;
                case 'aceUHor':
                    game.Actors.push(spawnActor(aceUHor()));
                    return;
                case 'aceUHorI':
                    game.Actors.push(spawnActor(aceUHor(0,false,true)));
                    return;
                case 'aceSnake':
                    game.Actors.push(spawnActor(aceSnake()));
                    return;
                case 'aceSnakeI':
                    game.Actors.push(spawnActor(aceSnake(0,false,true)));
                    return;
                case 'aceChase':
                    game.Actors.push(spawnActor(aceChase()));
                    return;
            }
        }
        if(rng > 90){
            // spawn gunner
            const i = getRandom(0, gunTypes.length - 1);
            game.Actors.push(spawnActor(gunTypes[i]));
            return;
        }
    }, 1200)
])