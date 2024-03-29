/*

When an enemy dies, we spawn a power up, using the x and y coordinates of the enemy.
Power Ups CAN move.  The basic movement is downwards, which accelerates over time until terminal velocity (max speed) is reached
When a player touches a power up, the power ups bonus is applied.
We apply these bonuses using the action property, which modifies certain properties within the game object.
Power ups can increase score, increase health, change the players weapons etc...
Actions will probably be objects: i.e. { 'property' : value }
The property name should match whatever game parameter we want to change.
If we want to add points to the score our action would look like this:
{ score : 100 }
When the our Game object detects the collision, it will read this object, and make the necessary adjustments:
_Game.Score += PowerUp.score

*/

class PowerUp extends Actor{
    constructor(x,y,spriteData,action){
        const sprite = [ spriteData ];
        super(sprite[0]);
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.action = action;
        this.speed = -2;
        this.accel = 0.1;
        this.maxSpeed = 2;
        this.type = 'power';
    }
    update(){
        this.speed += this.accel;
        if(this.speed > this.maxSpeed) this.speed = this.maxSpeed;
        this.y += this.speed;
        if(this.y > viewport.height){
            this.health = -1;
        }
    }
    // MEDALS
    static Medal(x,y,rank){
        let sprite, value;
        switch(rank){
            case 1:
                sprite = sprMedalOne;
                value = 5;
                break;
            case 2:
                sprite = sprMedalTwo;
                value = 10;
                break;
            case 3:
                sprite = sprMedalThree;
                value = 25;
                break;
            case 4:
                sprite = sprMedalFour;
                value = 50;
                break;
            case 5:
                sprite = sprMedalFive;
                value = 100;
                break;
        }
        return new PowerUp(x,y,sprite,{score:value});
    }
    // HEALTH
    static SmallHealth(x,y){
        return new PowerUp(x,y,sprHealthSmall,{health:5});
    }
    static LargeHealth(x,y){
        return new PowerUp(x,y,sprHealthLarge,{health:50});
    }
    // EXTRA LIFE
    static ExtraLife(x,y){
        return new PowerUp(x,y,sprExtraLife,{lives:1});
    }
    // SPEED
    static SpeedUp(x,y){
        return new PowerUp(x,y,sprSpeedUp,{speed:1});
    }
    static SpeedDown(x,y){
        return new PowerUp(x,y,sprSpeedDown,{speed:-1});
    }
    // WEAPONS
    static WeaponM(x,y){
        return new PowerUp(x,y,sprWeaponM,{weapon:'m'});
    }
    static WeaponS(x,y){
        return new PowerUp(x,y,sprWeaponS,{weapon:'s'});
    }
    static WeaponF(x,y){
        return new PowerUp(x,y,sprWeaponF,{weapon:'f'});
    }
    // TEMP
    static BFG(x,y){
        return new PowerUp(x,y,sprBFG,{temp:'bfg'})
    }
    static Invincibility(x,y){
        return new PowerUp(x,y,sprInvincibility,{temp:'inv'});
    }
}