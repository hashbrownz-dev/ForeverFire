# World War V

> A clone of the arcade classic 1942, built in Javascript and rendered with Vector graphics via the Canvas API.

## Mechanics

**World War V** is a vertical-scrolling SHMUP (shoot em up) inspired by the classic arcade hit 1942.  The player must battle waves of attacking enemy planes, dodging enemy aircraft and projectiles while collecting precious resources and amazing power ups!

### Controls

- Use the *arrow keys* fly the plane
- Press *Z* to shoot
    - Hold *Z* to fire continuously.

### Objective

- Survive one round, destroying as many enemies as possible.

### Rules

- The player begins with 3 lives and 100 Health
- If the player collides with an enemy ship or enemy projectile:
    - Enemy Ships deal 100 damage to the player.
    - Bullets deal 36 damage to the player.
    - Rockets deal 75 damage to the player.
- If the player's health falls below 1, the player loses a life.
- The game is time based and lasts approximately 3 minutes with partially procedurally generated enemy patterns.
- If the Player survives 3 minutes, they win!
- There are 4 base enemy classes:
    - PotShot
        - Flys vertically, shooting projectiles at the player.
    - Kamikaze
        - Flys vertically, banking towards the player.
    - Ace
        - Flys in complex patterns, occasionally shooting projectiles at the player.
    - Gunner
        - Flys Vertically, shooting a lot of projectiles at the player.  Moves slow, and has more health than small planes.
- Gameplay ends when the player has lost all of their lives or survived the onslaught!

### Scoring

- Player receives 1 point for each successful shot.
- Small Planes
    - PotShot = 14 points
    - Kamikaze = 9 points
    - Ace = 19 points
- Mid Planes
    - Gunner = 50 points

## Development

Changes I wish to make:
As gameplay progresses, enemy behavior needs to change as well.  I want to create a few basic classes that represent basic enemy behavior.  In our initial game, the Pot Shot and Kamikaze planes have a basic behavior, flying vertically.  In order to implement changes to behavior without becoming to verbose within our code base, I want to implement a system that allows us to utilize these base classes in interesting and unpredictable ways.  I'm thinking that we can implement a system similar to timelines and EFX in our game class, an array containing mutators or modifications that can change the underlying performance of these actors.  Initially, with our potshots, we wanted behavior to be determined by type, with type being an argument fed to our constructor.  But now I am thinking, that with our constructor instead we can either provide a single unique callback function, or perhaps an array of callback functions that will be called by the Actors update method.  It's a little complicated... but let's say that we wanted to take our potshot class and make it a little more scaleable.  We wouldn't want to have predefined 'types' instead we'd want to take the unique shot mechanics of each type and put them into functions.  As we come up with new functions for creating shot patterns, we not only can easily implement them into the potshot class, but also implement them into every other class.  And we can create simple static methods on each class for easy constructors.

These shooting functions should take two arguments self (which refers to the instance calling the function) and game (which refers to the global game object).  so they'll probably look something like this: const shoootingFunc = (self, game) => { do something }
we'll use references to self to make any necessary updates to the calling instance, and of course we'll need to reference the game object in order to push our projectiles into the projectiles array...

We'll use this same mutator methodology to handle power ups.  Power-Ups in general will be descendents of Actor, and collecting them will make modifications to the player instance.  Some power ups will make permanent changes to the player instance, while others will be temporary.  We'll refer to temporary changes to stats or behavior as Mutators.  So Mutators will have a lifespan, and will provide a temporary boost to the players stats.

The biggest change will be implementing SVG Parser 2.0 into the fold.  So we'll need to update our artwork in Illustrator to reflect the new changes, process the images, put them back into the game.  And then refactor the ACTOR class to reflect these changes.

As we refactor the ACTOR class we'll have to pay SPECIAL attention to the constructor.  I want to simplify it, and leave the more nuanced code the descendents.

The final major change for version 2.0 or 1.0 or whatever, is to make the timeline system scaleable.  I'm thinking of creating another js file called scenario that will hold all the data necessary for creating moments / waves.  Our basic game object will still have an array that contains moments and executes them in sucession.  But that code, at the end of the day, will only concern itself with a function and an integer.  So our moments (or waves) will be objects that contain a function, (the instructions for the wave) and an integer, (the duration of the moment in frames).  When a new moment begins, the integer will be stored into the game object as a timer of sorts, which will decrement each frame, and the function will be executed.  Once the timer reaches zero, the next moment object will be removed from the moments array, it's function will be executed and the timer will be reset.

All of our moments or waves will be stored in a property called moments... or waves.
Each moment is an object with two properties: func and duration.
Func is the function to be executed when the moment occurs.  Duration is the duration of the moment in frames.
Game.moments = [ { func:(game)=>{ do something }, duration: 3000 }]
When we initialize a moment, we remove it from the moments array and store it in a temporary variable.
Game.currentMoment = Game.moments.pop();
We then call the function stored in the moments func property
Game.currentMoment.func(game);
And we update the Game objects timer to match the value stored in the duration property.
Game.timer = Game.currentMoment.duration;

### TO-DO

1. Implement Savage Parser v2
    1. Refactor RenderSprite and View Class
    1. Refactor Actor Class
        1. Constructor must take a sprite object as an argument
        1. The sprite object will be the only argument the constructor will take
        1. The constructor on the base Actor Class will establish the draw dimensions, and hitboxes of the actor based on the sprite data
        1. The health property will be set to 1 in the constructor
        1. Deprecate(?)
            1. boundingRect()
            1. 
        
1. Refactor Descendents of Actor
    1. Create a Class for each Sprite (This task will scale)
        1. PotShot
        1. Ace (SmDyna)
        1. Kamikaze
        1. Gunner (MidPlane)
        1. Player
        1. Enemy Bullet
        1. Player Bullet
    1. Each class should have a default constructor along with additional static methods for spawning sub types
    1. Enemy classes will now have a property called shoot, which holds a function that handles shooting, and toShoot which is an integer that decrements with each frame update.  When toShoot reaches zero, the shoot method is called.  If toShoot is a value below zero, the instance will no longer be capable of firing.

1. Refactor Game Object
    1. Refactor moment code (see previous section)

1. Create Scenario.js

### Future Features:

- Draw Health Bars
    - Draw Player Health
    - (?) Draw Enemy Health

- Add Power Ups
    - Increase firepower
    - Increase Speed
    - Regain Health
    - Clear Screen