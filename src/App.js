import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import MenuItem from './components/MenuItem';
import Home from './components/Home';
import Cv from './components/Cv';
import Projects from './components/Projects';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header>
      <h1>Andreas Berzelius</h1>
      </header>
      <MenuItem/>
      <Route exact path = "/" component={Home} />
      <Route path = "/Cv" component={Cv} />
      <Route path = "/Projects" component={Projects} />

      <footer>©2020 Andreas Berzelius. All Rights Reserved.</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
