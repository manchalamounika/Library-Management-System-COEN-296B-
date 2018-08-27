import React from 'react';
import bookLogo from '../../assets/images/book_logo.png';
import classes from './Logo.css';
import NavigationItem from '../Navigation/NavigationItems/NavigationItem/NavigationItem';
import navclass from '../Navigation/NavigationItems/NavigationItem/NavigationItem.css';

const logo = (props) =>(
<div className = {classes.Logo} className = {navclass.NavigationItem}>
    <NavigationItem link='/' /* active */ exact> <img style={{height:'100%'}} src={bookLogo} alt="myBook"/></NavigationItem>
</div>   
);

export default logo;