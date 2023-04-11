# Forever Fire

> A clone of the arcade classic 1942, built with Vanilla Javascript and rendered with Vector graphics via the Canvas API.  [Play It Here!](https://hashbrownz-dev.github.io/1942-V/)

## Mechanics

**Forever Fire** is a vertical-scrolling SHMUP (shoot em up) inspired by the classic arcade hit 1942.  The player must battle waves of attacking enemy planes, dodging enemy aircraft and projectiles while collecting precious resources and amazing power ups!

### Controls

- Use the *arrow keys* fly the plane
- Press *Z* to shoot
    - Hold *Z* to fire continuously.

### Objective

- Survive 10 waves of enemy fighters, destroying as many as possible.

### Rules

- The player begins with 3 lives and 100 Health
- If the player collides with an enemy ship or enemy projectile:
    - Enemy Ships deal 100 damage to the player.
    - Bullets deal 25 damage to the player.
- If the player's health falls below 1, the player loses a life.
- Survive 10 Waves of partially procedurally generated enemy patterns.
- If the Player survives, they win!
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

## Development

### Future Features:

- Add Power Ups
    - Magnesis (attract Medals)
    - Clear Screen