import React,{Component} from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'
/* import {Route,Link} from 'react-router-dom'; */
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';

const options = [
    'one', 'two', 'three'
  ]
  const defaultOption = options[0]       
class NavigationItems extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
      toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }
    render(){
        return(
            <ul className = {classes.NavigationItems}>
            <NavigationItem link='/books' /* active */ exact>Books</NavigationItem>
            <NavigationItem link='/libraries' >Libraries</NavigationItem>
            <NavigationItem link='/librarians' >Librarians</NavigationItem>
            <NavigationItem link='/readers' >Readers</NavigationItem>
            <NavigationItem link='/admin' >Administrators</NavigationItem>
            <NavigationItem link='/statistics' >Statistics</NavigationItem>
            <NavigationItem link='/signout' >Signout</NavigationItem>
            <NavigationItem link='/profile' >Profile</NavigationItem>
            {/* <a className="nav-link" href="/signout">Signout</a>
            <a className="nav-link" href="/profile">Profile</a> */}
            </ul>
        );
    }
}

export default NavigationItems;