import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./login.css";
import { Auth } from "aws-amplify";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Aux from '../../hoc/Auxi';

const styles = theme =>({
  button: {
    margin: '0,4px',
    width:'100%',
    color:'white',
    backgroundColor: '#3f51b5'
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Login extends Component {
  constructor(props) {
  super(props);
  this.state = {
      username: "",
      password: ""
  };
    this.handlePassword = this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleUsername = event => {
    this.setState({
      username : event.target.value
    });
  }

  handlePassword = event => {
    this.setState({
        password : event.target.value
      });
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const data = await Auth.signIn(this.state.username, this.state.password);
      alert("Logged in ");
      console.log(data);
      Auth.currentCredentials(credentials => {
        const tokens = Auth.essentialCredentials(credentials);
        console.log(tokens);
        sessionStorage.setItem("cognitoUser", JSON.stringify(tokens));       
        
      });
      console.log(this.props);
      this.props.loginHandle();

    } catch (e) {
      alert(e.message);
    }

  }
  render() {
    const { classes } = this.props;
    return (
    <Aux>
    <div style ={{display:'block'}}>
    <div style ={{display :'flex',
                    'min-height':'100vh',
                    'align-items':'center',
                    'flex-direction':'column',
                    'justify-content':'flex-start',
                    background:'background :linear-gradient(to right,#52688c,#516b86,#588688)',
                    backgroundSize:'cover',
                    backgroundRepeat:'no-repeat'   }}>
    <div style ={{minWidth:'300px',marginTop:'6em',overflow:'hidden',  
                    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.3)',borderRadius:'5px',
                    backgroundColor:'white'}}>
    <div style = {{margin:'1em',display:'flex',justifyContent:'center'}}>
    </div>
    <form style = {{marginTop:'0em',display:'block'}}
                    onSubmit={this.handleSubmit}>
    <div  style = {{color:'#ccc',display:'flex',marginTop:'1em',justifyContent:'center'}}>
    FAVL Libraries
    </div>
    <div  style ={{padding:'0 1em 1em 1em'}}>
    <div  style ={{marginTop:'1em',display:'block'}}>
    <FormGroup bsSize="large"> 
    <ControlLabel>Username</ControlLabel>
    <FormControl autoFocus type="text" ref={this.state.username} defaultValue="" name="username" onChange={this.handleUsername}/>
    </FormGroup></div>
    <div  style ={{marginTop:'1em',display:'block'}}>
    <FormGroup bsSize="large">  
    <ControlLabel>Password</ControlLabel><FormControl ref={this.state.password} defaultValue="" onChange={this.handlePassword}
    type="password" name="password_details"/></FormGroup></div>
    </div>
    <div style ={{padding:'0 1em 1em 1em',display:'flex',boxSizing:'border-box',alignItems:'center'}}>
    <Button variant="contained" color="primary" className={classes.button} disabled={!this.validateForm()}
    type="submit">Sign In</Button></div>
    <div style = {{display:'flex',justifyContent:'center',marginBottom :'10px'}}>
    <Link to="/change_password">Forgot Password?</Link></div>
    </form>
    </div>
    </div>
    </div>                 
    </Aux>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);

{/* <div style = {{backgroundColor:'black',color:'#fafafa',
                    width:'40px',height:'40px',display:'flex',position:'relative',
                    overflow:'hidden',fontSize:'1.25rem',flexShrink:0,alignItems:'center',
                    userSelect:'none',borderRadius:'50%',justifyContent:'center'}}>
      </div> */}