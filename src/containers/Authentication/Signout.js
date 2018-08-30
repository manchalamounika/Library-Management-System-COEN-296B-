import React from 'react';
import './Signout.css';
import {Link} from 'react-router-dom';
import history from '../../history';

export default class Signout extends React.Component {
    constructor(props) {
        super(props);
        localStorage.removeItem("auth");
        sessionStorage.removeItem("cognitoUser");
       /*  history.push('/'); */
        
    }

    render() {
        return (
            <div className="signout">
                <h3>Signout successful</h3>
                <Link style={{color: 'white'}} to= "/">Click to Sign In</Link>
            </div>
        )
    }
}
