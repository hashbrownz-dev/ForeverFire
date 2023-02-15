/*

The Game object will have a property called Waves.  This property is an array of timelines.
When the current timeline is clear, the wave property on the Game object will increase by one.
If the the current wave count exceeds the length of the timeline property, the game will 'restart' accessing the timeline stored at index 0.
Waves are time (frame) based.  When the timer of a certain wave has expired, the wave won't update until AFTER all enemies and enemy projectiles have been removed from the game.

A Wave IS a Timeline... so when our game object handles a Wave it needs to do the following:
Check if the Timeline is Clear.
If the Timeline isn't Clear, proceed normally;
If the Timeline IS Clear:
    - Wait until no enemies or projectiles are on screen.
    - Wait for an additional moment.
    - Increase wave by 1.
    - Get the next wave from the waves array.

FIX IT:
Right now... we cannot recycle our timelines, because there is no way of resetting a timeline...  
*/