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

### MVP

The base game should meet the following requirements:

- Accept user input: The player can fly using the arrow keys and fire projectiles with the space bar.
- The player must have Health and Lives
- The player must take damage from collisions.
- There must be one type of small enemy and one type of medium enemy.
- There must be a Game Over state.

### Future Features:

- Draw Health Bars
    - Draw Player Health
    - (?) Draw Enemy Health

- Add Power Ups
    - Increase firepower
    - Increase Speed
    - Regain Health
    - Clear Screen