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
import Login from './containers/LoginDetails/login';
import Changepassword from './containers/LoginDetails/login';
import Signout from './containers/Authentication/Signout';
import Profile from './containers/Authentication/Profile';

let loggedIn = false;

class App extends Component {

constructor(props) {
  super(props);
  console.log("Constructor loggedIn - "+loggedIn);
  this.loginHandle = this.loginHandle.bind(this);
}

componentWillMount = () => {
  console.log("Component will mount logged in - "+loggedIn);
}

componentDidMount = () => {
  console.log("Component did mount logged in - "+loggedIn);
}

state = {
  alwaysTrue: true
}

loginHandle = () => {
  localStorage.setItem("auth",true);
  loggedIn = true;
  this.setState({
    alwaysTrue: true
  });
}

render() {
    return (
      <BrowserRouter>
      <div>
          <Switch>
          <Layout>
          <Route exact path='/login' render={() => (<Login/>)} />
          <Route exact path='/change_password' render={() => (<Changepassword />)} />

          <Route exact path='/' render={(props) => 
           (this.state.alwaysTrue&&localStorage.getItem("auth") ? <Home/> :
           <Login {...props} loginHandle={this.loginHandle}/>)}/>

          <Route exact path='/books'  render={(props) => 
           (this.state.alwaysTrue&&localStorage.getItem("auth") ? <Books/> :
           <Login {...props} loginHandle={this.loginHandle}/>)}/>

          <Route path ="/libraries" render={(props) => 
           (this.state.alwaysTrue&&localStorage.getItem("auth") ? <Library/> :
           <Login {...props} loginHandle={this.loginHandle}/>)}/>

          <Route exact path='/readers' render={(props) => 
           (this.state.alwaysTrue&&localStorage.getItem("auth") ? <Readers/> :
           <Login {...props} loginHandle={this.loginHandle}/>)}/>

          <Route exact path='/librarians' render={(props) => 
           (this.state.alwaysTrue&&localStorage.getItem("auth") ? <Librarian/> :
           <Login {...props} loginHandle={this.loginHandle}/>)}/>

          <Route exact path='/admin' render={(props) => 
           (this.state.alwaysTrue&&localStorage.getItem("auth") ? <Admin/> :
           <Login {...props} loginHandle={this.loginHandle}/>)}/>

          <Route exact path='/statistics' render={(props) => 
           (this.state.alwaysTrue&&localStorage.getItem("auth") ? <FullWidthTabs/> :
           <Login {...props} loginHandle={this.loginHandle}/>)}/>

          <Route exact path='/profile' render={(props) => 
            (this.state.alwaysTrue&&localStorage.getItem("auth") ? <Profile/> : 
            <Login {...props} loginHandle={this.loginHandle}/>)}/>

          <Route exact path='/signout' render={(props) => 
            (this.state.alwaysTrue&&localStorage.getItem("auth") ? <Signout/> : 
            <Login {...props} loginHandle={this.loginHandle}/>)}/>
        
        </Layout>
        </Switch>
       </div>
      </BrowserRouter>
    );
  }
}

export default App;
