import React from 'react';
import { NavLink } from 'react-router-dom';

function Projects() {
  return (

    <div className = "ProjectsContainer">

        <title>PROJECTS</title>
        <NavLink to = "./Signalparadox">        
        <div className = "ProjectPreview"><img src="../img/Signalparadox.gif" alt="SignalParadox-gif"/>
        <h3> SignalParadox</h3>
        <p>My biggest gameproject yet made with c# in unity with 5 other people</p>
        </div>
        </NavLink>

        <NavLink to = "./Spaceinvader">
        <div className = "ProjectPreview"><img src="../img/Spaceinvader_c++.gif" alt="Spaceinvader-gif"/>
        <h3>Spaceinvader/C++</h3>
        <p>A spaceinvader lookalike made in c++ and SDL2</p>
        </div>
        </NavLink>

        <NavLink to = "./Onlineshooter">
        <div className = "ProjectPreview"><img src="../img/Gamejam_shooter3.gif" alt="GameJam-gif"/>
        <h3>Online shooter</h3>
        <p>An online shooter that was made on a short two day gameJam. Also my first online game</p>
        </div>
        </NavLink>

        <NavLink to = "./EnvriomentUnreal">
        <div className = "ProjectPreview"><img src="../img/enviroment-UnrealEngine.png" alt="Enviroment-img"/>
        <h3 >An enviroment inside Unreal Engine</h3>
        <p>Made models in maya and then built them together in unreal engine</p>
        </div>
        </NavLink>
        
        <div className = "ProjectPreview"><img src="../img/Andmoretocome.png" alt="andmoretocome-img"/>
        </div>

    </div>

  );
}

export default Projects;