// SHOOTING FUNCTIONS

// Every Shooting Function has two parameters: self ( a reference to the actor shooting ), game ( a reference to the game object )

const shootAtPlayer = (interval, speed, defTarget) => {
    return (self, game) => {
        self.toShoot = interval;
        const { Player } = game;
        if(Player){
            //AIM
            const target = getDirection(self, Player);
            game.Projectiles.push(new EnemyShot(self.x, self.y, target, speed));
        } else if (defTarget){
            game.Projectiles.push(new EnemyShot(self.x, self.y, defTarget, speed));
        }
    }
}

const shootSpread = (interval, speed, defTarget, amount, space) => {
    return (self, game) => {
        self.toShoot = interval;
    }
}

const shootArc = (interval, speed, amount, startAngle, endAngle) => {
    return (self, game) => {
        self.toShoot = interval;
        const bullets = [];
    }
}

// const shootPlayer = (self, game) => {
//     self.toShoot = 60;  // this needs to be a variable we can change...
//     const { Player } = game;
//     if(Player){
//         //AIM
//         const target = getDirection(self, Player);
//         // FIRE
//         game.Projectiles.push(new EnemyShot(self.x, self.y, target, 5)); // bullet speed also needs to be a variable we can change...
//     }
// }

// const shootingFunc = (self, game) => {
//     self.toShoot = 60;
//     if(game.Player){
//         // AIM
//         const target = getDirection(self, game.Player);
//         // FIRE
//         game.Projectiles.push(new EnemyShot(self.x, self.y, target, 5));
//     }
// }
