import React from 'react';
import { NavLink } from 'react-router-dom';

const rootContainerElement = document.getElementById('root');

function removeBanner() {
  if(rootContainerElement.classList.length > 0) {
    rootContainerElement.classList.remove('Home');
  }

}

function Projects() {
  return (
    <div className="container" onLoad={removeBanner()}>
    <div className="ProjectsPreviewContainer">

      <title>PROJECTS</title>
      <NavLink to="./Signalparadox">
        <div className="ProjectPreview"><img src={require("../img/Signalparadox.gif")} alt="SignalParadox-gif" />
          <h3> SignalParadox</h3>
          <p>My biggest gameproject yet made with c# in unity with 5 other people</p>
          <p id="readMore">Click to read more</p>
        </div>
      </NavLink>

      <NavLink to="./Spaceinvader">
        <div className="ProjectPreview"><img src={require("../img/Spaceinvader_c++.gif")} alt="Spaceinvader-gif" />
          <h3>Spaceinvader/C++</h3>
          <p>A spaceinvader lookalike made in c++ and SDL2</p>
          <p id="readMore">Click to read more</p>
        </div>
      </NavLink>

      {/* <NavLink to="./Onlineshooter">
        <div className="ProjectPreview"><img src="../img/Gamejam_shooter3.gif" alt="GameJam-gif" />
          <h3>Online shooter</h3>
          <p>An online shooter that was made on a short two day gameJam. Also my first online game</p>
        </div>
      </NavLink> */}

      <NavLink to="./Pixelsurgeon">
        <div className="ProjectPreview"><img src={require("../img/pixelsurgeon-demo.gif")} alt="pixelsurgeon-gif" />
          <h3 >Pixelsurgeon</h3>
          <p>A 2D surgeon game</p>
          <p id="readMore">Click to read more</p>
        </div>
      </NavLink>

      <NavLink to="./EnviromentUnreal">
        <div className="ProjectPreview"><img src={require("../img/enviroment-UnrealEngine.PNG")} alt="Enviroment-img" />
          <h3 >An enviroment inside Unreal Engine</h3>
          <p>Made models in maya and then built them together in unreal engine</p>
          <p id="readMore">Click to read more</p>
        </div>
      </NavLink>

      <div className="ProjectPreview" id="andmoretocome">
      <h2>And more to come!</h2>
      </div>
      </div>
    </div>
  );
}

export default Projects;