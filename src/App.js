import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation'
import Home from './Home'
import Admin from './components/Admin/Admin'
import graph from './components/Graph/graph'
import Book from './components/Book/Book';
import Reader from './components/Readers/Reader';


class App extends Component {
  render() {
    var bg=require('/Users/saishree/reactWorkspace/library_managementsystem/src/images/Backdrop.png')
    return (
     <Router>
       
        <div 
      //   style ={ { backgroundImage: "url("+bg+")",backgroundposition: 'center',
			// backgroundrepeat:  'no-repeat',
			// backgroundattachment: 'fixed',
			// backgroundsize:  'cover', height: '120vh'}}
      >
          <Navigation />
          
          <div className="container" >          
            <Switch>
                  <Route exact path='/' render={() => (<Home/>)}/>
                  <Route exact path='/Books/index' component={Books} />
                  <Route exact path = '/Statistics' component={graph} />
                  <Route exact path='/Readers/index' render={() => (<Reader/>)} />
                  <Route exact path='/Books/index' render={() => (<Book/>)} />
                  <Route exact path='/addnewadmin' render={() => (<Admin/>)}/>                  
            </Switch>
          </div>
        </div>
      </Router>
  
    );
  }
}

export default App;