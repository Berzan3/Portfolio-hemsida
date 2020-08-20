import React from 'react';

function Projects() {
  return (
    <div className = "Container">
        <title>PROJECTS</title>
        <div className = "Project"><img src="../img/gifmedgranatkast.gif" alt="SignalParadox"/>
        <h3>SignalParadox</h3>
        </div>
        <div className = "Project"><img src="../img/Spaceinvader_c++.gif" alt="Spaceinvader-gif"/>
        <h3>Spaceinvader/C++</h3>
        </div>
        <div className = "Project"><img src="../img/gifmedgranatkast.gif" alt="GameJam"/>
        <h3>Game Jam</h3>
        </div>
        <div className = "Project"><img src="../img/enviroment-UnrealEngine.png" alt="Enviroment-img"/>
        <h3>An enviroment inside Unreal Engine</h3>
        </div>
    </div>
  );
}

export default Projects;