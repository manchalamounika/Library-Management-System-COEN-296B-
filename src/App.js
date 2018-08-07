import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation'
import Books from './components/Books'
import Readers from './components/Readers'
import Home from './Home'

class App extends Component {
  render() {
    return (
     <Router>
        <div>
          <Navigation />
          <div className="container">
            <Switch>
                  <Route exact path='/readers' component={Readers} />
                  <Route exact path='/books' component={Books} />
            </Switch>
            <Home />
          </div>
        </div>
      </Router>
  
    );
  }
}

export default App;
