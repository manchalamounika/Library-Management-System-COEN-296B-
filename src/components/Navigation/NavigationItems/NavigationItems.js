import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'
/* import {Route,Link} from 'react-router-dom'; */
const navigationItems = () =>{
    return(
    <ul className = {classes.NavigationItems}>
       <NavigationItem link='/books' /* active */ exact>Books</NavigationItem>
       <NavigationItem link='/libraries' >Libraries</NavigationItem>
       <NavigationItem link='/librarians' >Librarians</NavigationItem>
       <NavigationItem link='/readers' >Readers</NavigationItem>
       <NavigationItem link='/admin' >Administrators</NavigationItem>
       <NavigationItem link='/dsggsf' >Statistics</NavigationItem>
    </ul>
    );
}
export default navigationItems;