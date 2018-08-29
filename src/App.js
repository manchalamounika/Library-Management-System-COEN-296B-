/* import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navigation from './containers/Navigation'
import Home from './Home'
import Admin from './containers/Admin/Admin'
import graph from './containers/Graph/graph'
import Book from './containers/Book/Book';
import Reader from './containers/Readers/Reader'

class App extends Component {
  render() {
//    var bg=require('/src/images/Backdrop.png')
    return (
     <Router>
       
        <div>
          <Navigation />
          
          <div className="container" >          
            <Switch>
                  <Route exact path='/' render={() => (<Home/>)}/>
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

export default App; */

import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import {Route, Switch} from 'react-router-dom';
import Home from './containers/Home/Home';
import Books from './containers/Book/Book';
import Admin from './containers/Admin/Admin';
import Library from './containers/Libraries/Library';
import Readers from './containers/Readers/Reader';
import Librarian from './containers/Librarians/Librarian';
import FullWidthTabs from './containers/Graph/graph';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Layout>
          <Switch>
          <Route path ="/libraries" component={Library}/>
          <Route path ="/" exact component= {Home}/>
          <Route exact path='/books' render={() => (<Books/>)} />
          <Route exact path='/admin' render={() => (<Admin/>)} />
          <Route exact path='/readers' render={() => (<Readers/>)} />
          <Route exact path='/librarians' render={() => (<Librarian/>)} />
          <Route exact path='/statistics' render={() => (<FullWidthTabs/>)} />
          </Switch>
        </Layout>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
