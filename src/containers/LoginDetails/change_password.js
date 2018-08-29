import React from "react";
import { Link, Redirect } from 'react-router-dom';
import LoginHeader from './login_header';
import { Auth } from "aws-amplify";
import history from '../../history';
import './login.css';


export default class Changepassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resetPassword: true,
            emailSubmit : false,
            email: undefined,
            successful: false,
            unsuccessful: false,
            forgotpassData: false
        }
        this.submitHandle = this.submitHandle.bind(this);
        this.codeHandle = this.codeHandle.bind(this);
    }

    
    render() {
        return(
            <div>
                <LoginHeader />
                <div className="wrapper">
                        <div className="main">
                            <div className="container">
                                <div className="loginDetails">
                                    <h1>SCAN Reset password:</h1>
                                    {
                                        this.state.resetPassword &&
                                    <form onSubmit={this.submitHandle}>
                                        <div className="form-group">
                                            <label htmlFor="emailaddress">Please enter your USERNAME!</label>
                                            <input type="text" className="form-control" id="emailaddress" placeholder="Enter Email..." />
                                        </div>
                                        <button type="submit" className="btn btn-light">Submit</button>
                                    </form>
                                    }
                                    {
                                        this.state.emailSubmit && 
                                        <div>
                                            <form onSubmit={this.codeHandle}>
                                                <div className="form-group">
                                                    <p style={{color:"white", "fontWeight":"bold", "textDecoration":"underline"}}>An email with reset code has been sent to your email address, Please enter the code below:</p>
                                                    <input type="text" placeholder="Enter the code.." id="code" />
                                                    <input type="text" placeholder="Enter the new Password.." id="newPasswd" />
                                                </div>
                                                <button type="submit" className="btn btn-light">Submit</button>
                                            </form>
                                        
                                        </div>
                                    }
                                    {
                                        this.state.successful && 
                                        <div className="confirmText">
                                            <p style={{color:"white", "fontWeight":"bold", "textDecoration":"underline"}}>Thank you, your password has been changed successfully!!</p>
                                            <Link to="/" style={{color: "#7E685A", "fontWeight":"bold", "textDecoration":"underline"}}>Click here to Login</Link>
                                        </div>
                                    }
                                    {
                                        this.state.unsuccessful &&
                                        <div className="confirmText">
                                            <p style={{color:"white", "fontWeight":"bold", "textDecoration":"underline"}}>Sorry, There is some incorrect information while changing password, try again!</p>
                                            <Link to="/" style={{color: "#7E685A", "fontWeight":"bold", "textDecoration":"underline" }}>Click here to Login</Link>
                                        </div>
                                    } 
                                </div>
                            </div>
                        </div>
                </div>
            </div>
                        
        );
    }

    submitHandle = (e) => {
        e.preventDefault();
        console.log("email has been entered");
        console.log(e.target.emailaddress.value);
        const email = e.target.emailaddress.value;
        Auth.forgotPassword(email)
        .then(data => console.log(data))
        .catch(err => {
            console.log("Error Message");
            alert(err.message);
            history.push('/');
        });
        this.setState({ 
            resetPassword: false,
            emailSubmit: true,
            email: email
        });
    }

    codeHandle = (e) => {
        e.preventDefault();
        console.log("button bressed");
        const username = this.state.email;
        const code = e.target.code.value;
        const newpass = e.target.newPasswd.value;
        Auth.forgotPasswordSubmit(username, code, newpass)
        .then(data => {
            console.log(data);
            this.setState({
                resetPassword: false,
                emailSubmit: false,
                successful: true
            });
        })
        .catch(err => {
            console.log("Error Message");
            alert(err.message);
            this.setState({
                        resetPassword: false,
                        emailSubmit: false,
                        unsuccessful: true
                    });
            // history.push('/');
        }); 
    }

            
}