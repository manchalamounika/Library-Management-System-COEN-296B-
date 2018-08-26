import React from 'react';
import classes from './DrawerToggle.css';


const drawerToggle = (props) => (
    <div className = {classes.DrawerToggle} onClick={props.clicked}> 
      <div></div>
      <div></div>
      <div></div>
    </div>
   /*the clicked property should hold a reference to the method which should get executed on a click */
);

export default drawerToggle;