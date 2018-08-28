import React from 'react';
import bookLogo from '../../assets/images/book_logo.png';
import classes from './Logo.css';
import NavigationItem from '../Navigation/NavigationItems/NavigationItem/NavigationItem';
import navclass from '../Navigation/NavigationItems/NavigationItem/NavigationItem.css';

const logo = (props) =>(
<div className = {navclass.NavigationItem}>
       <NavigationItem link='/' /* active */ exact>
       SCAN
       </NavigationItem>
</div>    
);

export default logo;