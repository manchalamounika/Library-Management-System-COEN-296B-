import React from 'react';
import Login from './login';
import LoginHeader from './login_header';

export default class Landing extends React.Component {
    render() {
        return(
            <div>
                <LoginHeader />
                <Login landingAuthorization={this.landingAuthorization}/>
            </div>
        );
    }

}