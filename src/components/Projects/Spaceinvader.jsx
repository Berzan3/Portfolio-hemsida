import React from 'react';
import ReactPlayer from "react-player";

function Spaceinvader() {
    return (
        <div className="Project">
            <title>SpaceInvader</title>

        <ReactPlayer
        className='react-player'
        url={'../vid/Spaceinvader_demo.mp4'}
        fluid="md"
        controls='true'
        light='true'
        />
<body>
<h1>What is this?</h1>

This is a much simpler remake of the game Space invaders which i made in a c/c++ programming course at my university.
You move around the small green spaceship at the bottom of the screen, trying to shoot and dodge the aliens slowly coming from the top of the screen.

<h1>Functions</h1>

<h4>briefly about how the code works:</h4>
When the main class starts, it begins with creating an instance of player, enemyfactory -components and adding the collision function to the session.
Then player and enemyFactory are added to a vector for session, then session.run(); starts
which fires the game loop in session. Session then plots its added components
in its vectors and decreases an int variable when any of the components are hit by each other if the bool isCoolidable is true for that Component.
EnemyFactory creates 3 different formations of enemies. Enemy movement and shooting patterns depends on an int time in session that is updated every tick.
Both player and enemy create an instance of the component bullet
when they fire a shot. If the bullet does not collide with something before it reaches the edge of the screen then it is removed.

<h4>briefly about how the game works:</h4>
The game i took inspiration from when i created mine is Spaceinvaders.
The player is the green sprite at the bottom, you can move with the keys a for the left and d for right and space for shooting.
You try to shoot the enemies that come from the top of the screen. When you kill an enemy, it is added to your points at the top left.
If all enemies are killed on the screen, new enemies will appear at the top. This continues until the player is hit by an enemy shot which immediately kills the player.

<h1>The process</h1>
simultaneously as the game was made i was studying for the course exam that had the same deadline as the game. But it was a lot of fun and I learned a lot of c/c++.

<h1>Challenges</h1>

It was a big challenge to previously only programmed games with c# and an engine to a new language and no engine.
The other big challenge was to manage memory leakage.
I downloaded a tool called Deleaker to easier spot different leakages I had until I finally managed to get rid of every single one.

<h1>Iteration</h1>

Of course i could have done much more with the game but because i was learning c/c++ and studying for an exam at the same time i am pleased with how it turned out.
</body>

        </div>
    );
}

export default Spaceinvader;