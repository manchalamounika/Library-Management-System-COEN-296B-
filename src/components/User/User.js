import React from 'react';
import usericon from '../../assets/images/user.png';
import classes from './User.css'

const user = (props) =>(
<div className = {classes.User}>
    <img src={usericon} alt="usericon"/>
</div>   
);

export default user;