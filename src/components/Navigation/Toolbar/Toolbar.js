import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import User from '../../User/User';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'; 

const toolbar = (props) => (
    <header className = {classes.Toolbar}>
        
        <DrawerToggle clicked ={props.drawerToggleClicked} />
 
        {/* //use toolbar in the layout component where will add the clicked method */}
        <div className={classes.pushLogo}>
        <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
        <NavigationItems/>
        </nav>
        <div className={classes.DesktopOnly}>
        <User/>
        </div>
    </header>
);

export default toolbar;