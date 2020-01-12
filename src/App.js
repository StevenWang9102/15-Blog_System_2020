import React from 'react';
import './App.css';
import Nav from './Components/Nav.js'
import MainPage from './Components/MainPage'

// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
      <div className="App">
        <Nav/>
        <MainPage/>
      </div>
  );
}

export default App;
