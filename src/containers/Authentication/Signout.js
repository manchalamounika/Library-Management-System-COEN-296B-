import React from 'react';
import './Signout.css';
import {Link} from 'react-router-dom';
import history from '../../history';
import {Route, Switch} from 'react-router-dom';
import  Login from '../../containers/LoginDetails/login';

export default class Signout extends React.Component {
    constructor(props) {
        super(props);
        localStorage.removeItem("auth");
        sessionStorage.removeItem("cognitoUser");
        
        
    }

    render() {
        return (
            <div className="signout">
                {history.push('/')}
                <h3>Signout successful</h3>
                <Link style={{color: 'white'}} to= "/">Click to Sign In</Link>
            </div>
        )
    }
}
