import React from 'react';
import usericon from '../../assets/images/user.png';
import classes from './User.css'
import NavigationItem from '../Navigation/NavigationItems/NavigationItem/NavigationItem';
import navclass from '../Navigation/NavigationItems/NavigationItem/NavigationItem.css';
const user = (props) =>(
<div className = {navclass.NavigationItem}>
       <NavigationItem link='/' /* active */ exact>
       <img src={usericon} alt="usericon"/>
       </NavigationItem>
</div>   
);

export default user;