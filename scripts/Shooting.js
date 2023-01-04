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

const shootSpread = (interval, speed, amount, space, defTarget) => {
    return (self, game) => {
        self.toShoot = interval;
        const { Player } = game;
        const target = Player ? getDirection(self, Player) : defTarget;
        if(target){
            const n = amount % 2 ? Math.floor(amount / 2) : (amount/2) - 0.5;
            const origin = target - (space * n);
            for(let i = 0; i < amount; i++){
                const dir = origin + (space * i);
                const bullet = new EnemyShot(self.x, self.y, dir, speed);
                game.Projectiles.push(bullet);
            }
        }
    }
}

const shootArc = (interval, speed, amount, startAngle, endAngle) => {
    return (self, game) => {
        self.toShoot = interval;
        const n = (endAngle - startAngle) / amount;
        for(let i = 0; i < amount; i++){
            const dir = startAngle + (i * n);
            const bullet = new EnemyShot(self.x, self.y, dir, speed);
            game.Projectiles.push(bullet);
        }
    }
}
