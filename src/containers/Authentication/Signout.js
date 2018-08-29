import React from 'react';
import './Signout.css';
import {Link} from 'react-router-dom';
import history from '../../history';

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
            </div>
        )
    }
}
