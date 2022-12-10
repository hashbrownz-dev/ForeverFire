// MOVEMENT AND COLLISION

// MOVEMENT

// a func that allows one object to point in the direction of another (target another object)
const getDirection = (actor, target) => {
    const y = target.y - actor.y;
    const x = target.x - actor.x;
    let opp, adj, d;

    // Determine the Sector

    // SECTOR I
    if(x > 0 && y >= 0){
        opp = y;
        adj = x;
        d = 0;
    }

    // SECTOR II
    else if(x <= 0 && y > 0){
        opp = x;
        adj = y;
        d = 89;
    }

    // SECTOR III
    else if(x < 0 && y <= 0){
        opp = y;
        adj = x;
        d = 179;
    }

    // SECTOR IV
    else if(x >= 0 && y < 0){
        opp = x;
        adj = y;
        d = 269
    }

    return radToDeg(Math.abs(Math.atan(opp/adj))) + d;
}

// a func that moves an object in any given direction
const move = (actor) => {
    // Get Hypotenuse and Direction
    const { speed, dir } = actor;

    // Convert direction to Radians
    const theta = degToRad(dir);

    // Get new coordinates
    let newY = speed * Math.sin(theta);
    let newX = speed * Math.cos(theta);

    // Update actors coordinates
    actor.x += newX;
    actor.y += newY;

    // Return new coordinates (as object)
    return {x:newX, y:newY}
}

// a func that moves an object towards a point
const moveTowards = (actor, dest = {x:0,y:0}) => {
    const direction = getDirection(actor, dest);
    return move(actor, direction);
}

// COLLISION DETECTION

const overlapX = (actor1, actor2) => {
    return (( actor1.x > actor2.x && actor1.x < actor2.x + actor2.w ) || ( actor1.x + actor1.w > actor2.x && actor1.x + actor1.w < actor2.x + actor2.w))
}

const overlapY = (actor1, actor2) => {
    return (( actor1.y > actor2.y && actor1.y < actor2.y + actor2.h) || ( actor1.y + actor1.h > actor2.y && actor1.y + actor1.h < actor2.y + actor2.h))
}

const overlap = (actor1, actor2) => {
    return (overlapX(actor1, actor2) && overlapY(actor1, actor2));
}