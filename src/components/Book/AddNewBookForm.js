import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    padding: '30px',
    paddingTop: '20px',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
    width: 500,
  },
  button:{
    margin: theme.spacing.unit,
  }
});


class AddNewBookForm extends React.Component {
     state = {
    firstname: '',
    middlename: '',
    lastname: '',
    email: ''
}


handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
}

handleMouseDownPassword = event => {
    event.preventDefault();
};

handleAddBookBtn =() =>{
    this.props.closeBtnHandler();
}

closeHandler=() =>{
    this.props.closeBtnHandler();
}
  render() {
    const { classes } = this.props;

    return (
      
    <div>
        <div >
            <AppBar position="static" color="default" >
                <Toolbar variant="dense">
                <Typography variant="title" color="inherit">
                    Add New Book
                </Typography>
                <div className="add_admin_close">
                <a className="close" onClick={this.closeHandler}>
                        &times;
                    </a>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
        <div className={classes.root}>
        <form>
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="First Name"
                id="margin-normal"
                // id="simple-start-adornment"
                placeholder="First Name" type="text" name="firstname" value={this.state.firstname}
                onChange={this.handleChange('firstname')} 
                />

            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Middle Name"
                id="margin-normal"
                placeholder="Middle Name" type="text" name="middlename" value={this.state.middlename}
                onChange={this.handleChange('middlename')} />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Last Name"
                id="margin-normal"
                placeholder="Last Name" type="text" name="lastname" value={this.state.lastname}
                onChange={this.handleChange('lastname')} />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Email"
                id="margin-normal"
                placeholder="Email" type="text" name="email" value={this.state.email}
                onChange={this.handleChange('email')} />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="User Name"
                id="margin-normal"
                placeholder="User Name" type="text" name="username" value={this.state.username}
                onChange={this.handleChange('username')} />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Password"
                id="margin-normal"
                placeholder="Password" name="password" value={this.state.password}
                type={this.state.showPassword ? 'text' : 'password'}
                onChange={this.handleChange('password')}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}>
                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>,
                }}/>
                <TextField
                    className={classNames(classes.margin, classes.textField)}
                    label="Confirm Password"
                    id="margin-normal"
                    placeholder="Confirm Password" name="confirmpassword" value={this.state.confirmpassword}
                    type={this.state.showConfirmPassword ? 'text' : 'password'}
                    onChange={this.handleChange('confirmpassword')}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowConfirmPassword}
                                onMouseDown={this.handleMouseDownPassword}>
                                {this.state.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>,
                }}/>                    
        </form>
        </div>
        
            <Button
            className={classes.button}
                size="small"
                variant="contained"                                
                color="secondary"
                onClick={this.handleAddBookBtn}>
                    Add 
            </Button>
        

    </div>
       
      
    );
  }
}

AddNewBookForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddNewBookForm);

