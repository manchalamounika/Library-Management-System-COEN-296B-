import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation'
import Books from './components/Books'
import Readers from './components/Readers/Index'
import EditReader from './components/Readers/EditReader'
import AddReader from './components/Readers/AddReader'
import Home from './Home'
import Admin from './components/Admin/Admin'

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
                  <Route exact path='/Readers/index' component={Readers} />
                  <Route exact path='/Readers/edit' component={EditReader} />
                  <Route exact path='/Readers/add' component={AddReader} />
                  <Route exact path='/Books/index' component={Books} />
                  <Route exact path='/addnewadmin' render={() => (<Admin/>)}/>                  
            </Switch>
          </div>
        </div>
      </Router>
  
    );
  }
}

export default App;
