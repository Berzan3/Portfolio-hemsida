import React from 'react';
import { NavLink } from 'react-router-dom';
const rootContainerElement = document.getElementById('root');

function loadBanner() {
  if (rootContainerElement.classList.length < 1) {
    rootContainerElement.classList.add('Home');
  }
}

function Home() {
  return (
    <div>
      <div className="Home" onLoad={loadBanner()} >
        <title>Andreas Berzelius</title>
        <img src={require('../img/AndreasBerzelius.png')} alt="andreas"></img>
        <p>Hi! My name is Andreas Berzelius. I'm a computer and systems science student, with a specialisation in computer game development.
        I study game development at Stockholm University.
        I am an eager programmer who loves to learn and enjoys working with other people on different projects.
        My main passion is making games, but I am open to other programming and development projects too.
        </p>


      </div>
      <div className="Project" id="recentProject">
        <h1>Most recent Project!</h1>
        <NavLink to="./Signalparadox">
          <div className="ProjectPreview"><img src={require("../img/Signalparadox.gif")} alt="SignalParadox-gif" />
            <h4> SignalParadox</h4>
            <p>My biggest gameproject yet made with c# in unity with 5 other people</p>
            <p id="readMore">Click to read more</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Home;