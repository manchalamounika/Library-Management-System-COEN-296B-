import { Route, Link , Switch, Redirect} from 'react-router-dom';
import Changepassword from './change_password';
import Login from './login';
import Landing from './landing';
import React from 'react';


export default class Main extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/login" component={Login} />
                    <Route path="/change_password" component={Changepassword} />
                </Switch>
            </div>

        )
    }

}

