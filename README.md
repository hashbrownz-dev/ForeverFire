# World War V

> A clone of the arcade classic 1942, built in Javascript and rendered with Vector graphics via the Canvas API.

## Plot

> Lorem Ipsum Dolor Sit Amet...

## Mechanics

**World War V** is a vertical-scrolling SHMUP (shoot em up) inspired by the classic arcade hit 1942.  The player must battle waves of attacking enemy planes, dodging enemy aircraft and projectiles while collecting precious resources and amazing power ups!

### Controls

- Use the *arrow keys* fly the plane
- Press *Z* to shoot
    - Hold *Z* to fire continuously.

### Objective

- Survive each round, destroying as many enemies as possible.
- See if you can make it to the ***BOSS*** round!

### Rules

- The player begins with 3 lives and 100 Health
- If the player collides with an enemy ship or enemy projectile:
    - Enemy Ships deal 100 damage to the player.
    - Bullets deal 50 damage to the player.
    - Rockets deal 75 damage to the player.
- If the player's health falls below 1, the player loses a life.
- The player can collect power ups to improve the quality of their ship:
    - Armor shards add 5 health to a maximum of 125 ( additional shards provide a score bonus )
    - Pow upgrades increase the firepower of the ship ( Max level = 5 )
    - Speed upgrades increase the flight speed of the ship
    - Nukes clear the screen of all enemy craft and projectiles
    - Mega Armor gives the player a health boost of 200
    - Lucky Star gives the player temporary invincibility
- Each Level is time based ( approximately 60 - 90 seconds ) with partially procedurally generated enemy patterns.
- Upon the completion of each level, the player's Rank is determined by the percentage of enemy craft they shot down.
- There are 4 base enemy classes:
    - Small
        - Defeated with one shot
        - Move quickly (vertically, horizontally, dynamic, fixed path)
        - Randomly fire a single projectile at the player
    - Medium
        - Defeated with multiple shots
        - Move slowly, spawning at the bottom of the screen and moving upwards
        - Shoot in set intervals, aiming directly at the player
        - Drop armor shards (50%) POW (20%) Speed (15%) Nukes, Mega Armor, and Lucky Star (5%)
    - Large
        - Defeated with multiple shots.
        - Move slowly, spawning at the top of the screen, and moving downwards towards the center, hovering until they are defeated
        - Shoots patterns of projectiles
        - Can drop Pow and Nuke Upgrades
    - Boss
        - Moves slowly, spawning at the top of the screen, moves from left to right in the top 30% of the screen
        - Fires projectiles in patterns, projectiles aimed at the player, and homing rockets that follow the player
- The game consists of 14 rounds followed by a 15th boss round.  After the boss round, the game loops indefinitely, becoming increasingly difficult with each iteration.
- Gameplay ends when the player has lost all of their lives.

## Development

### MVP

The base game should meet the following requirements:

- Accept user input: The player can fly using the arrow keys and fire projectiles with the space bar.
- The player must have Health and Lives
- The player must take damage from collisions.
- There must be one type of small enemy and one type of medium enemy.
- There must be at least one power up ( Armor Shards )
- There must be a Game Over state.
- High Scores must be saved to localStorage

### Phase 1

- Get User Input
- Create Player Class
- Control Player
- Scroll Background

### Phase 2

- Create Enemy Class
- Create Enemy Controller
- Collisions

#### Systems

    App.js contains the main() function which initializes our game loop.  Within main we instantiate our Game and View classes.
    View will handle all of our rendering...  And will do so by calling the draw() method of each actor in our Game object.  Game will handle all logic by calling the update() method of each actor in itself.
    I think that whenever we DO call the update() method of an actor... regardless of the type... it should return some kind of value...  The easiest thing would be to have the actor return itself.  As the Game Object should be able to change the properties of any actors, but the Actors cannot change the properties of the Game.  Instead, the actor will notify the game of it's own change in state, and based upon that change, the Game will perform the necessary tasks.