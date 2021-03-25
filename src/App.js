import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //fuckar min egna css
import './App.css';
import { HashRouter, Route } from 'react-router-dom'
import MenuItem from './components/MenuItem';
import Home from './components/Home';
import Cv from './components/Cv';
import Projects from './components/Projects';
import Signalparadox from './components/Projects/Signalparadox';
import EnviromentUnreal from './components/Projects/EnviromentUnreal';
import Spaceinvader from './components/Projects/Spaceinvader';
import Pixelsurgeon from './components/Projects/Pixelsurgeon';
import TheQuillSisters from './components/Projects/TheQuillSisters';

function App() {
  return (
    <HashRouter>
      <div className="App" >
        <header>
          <h1>Andreas Berzelius</h1 >
        </header>
        <MenuItem />
        <Route exact path="/" component={Home} />
        <Route path="/Cv" component={Cv} />
        <Route path="/Projects" component={Projects} />
        <Route path="/Signalparadox" component={Signalparadox} />
        <Route path="/EnviromentUnreal" component={EnviromentUnreal} />
        <Route path="/Spaceinvader" component={Spaceinvader} />
        <Route path="/Pixelsurgeon" component={Pixelsurgeon} />
        <Route path="/TheQuillSisters" component={TheQuillSisters} />

        <footer>©2020 Andreas Berzelius. all rights reserved.&nbsp;
          <a href="mailto:Andreas.Berzelius@outlook.com">Andreas.Berzelius@outlook.com</a>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
