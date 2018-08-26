import React from 'react';
import User from '../../User/User';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxi';

const sideDrawer = (props)=> {
    
    let attachedClasses = [classes.SideDrawer ,classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer ,classes.Open];
    }

    return(
        <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
        <div className = {classes.User}>
           <User/>
        </div> 
           <nav>
               <NavigationItems/>
           </nav>
        </div>
        </Aux>
    );
}

export default sideDrawer;