import React from 'react';

function Projects() {
  return (
    <div className = "Container">
        <title>PROJECTS</title>
        <div className = "Project"><img src="../img/Signalparadox.gif" alt="SignalParadox-gif"/>
        <h3>SignalParadox</h3>
        <p>My biggest gameproject yet made with c# in unity with 5 other people</p>
        </div>
        <div className = "Project"><img src="../img/Spaceinvader_c++.gif" alt="Spaceinvader-gif"/>
        <h3>Spaceinvader/C++</h3>
        <p>A spaceinvader lookalike made in c++ and SDL2</p>
        </div>
        <div className = "Project"><img src="../img/Gamejam_shooter3.gif" alt="GameJam-gif"/>
        <h3>Online shooter</h3>
        <p>An online shooter that was made on a short two day gameJam. Also my first online game</p>
        </div>
        <div className = "Project"><img src="../img/enviroment-UnrealEngine.png" alt="Enviroment-img"/>
        <h3 >An enviroment inside Unreal Engine</h3>
        <p>Made the house models in maya and then built them together in unreal engine along with some particle effects</p>
        </div>
        <div className = "Project"><img src="../img/Andmoretocome.png" alt="andmoretocome-img"/>
        </div>
    </div>
  );
}

export default Projects;