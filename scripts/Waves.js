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
    }, 40),
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
])