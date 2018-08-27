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
import axios from 'axios';

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
     state = {}

handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
}

handleMouseDownPassword = event => {
    event.preventDefault();
};

handleAddBookBtn =(event,state) =>{
    event.preventDefault();
    let self = this;
   // this.props.closeBtnHandler();
   console.log(self.state);
   let user = self.state;
    console.log("User:::",user);
    axios.post('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/book', user)
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(e=>{
          console.log(e);
      })
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
                label="Title"
                id="margin-normal"
                // id="simple-start-adornment"
                placeholder="Title" type="text" name="title" value={this.state.firstname}
                onChange={this.handleChange('title')} 
                />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Book Id"
                id="margin-normal"
                // id="simple-start-adornment"
                placeholder="Book ID" type="text" name="bookId" value={this.state.firstname}
                onChange={this.handleChange('bookId')} 
                />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Author First Name"
                id="margin-normal"
                // id="simple-start-adornment"
                placeholder="First Name" type="text" name="authorfirstname" value={this.state.firstname}
                onChange={this.handleChange('firstName')} 
                />

            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Middle Name"
                id="margin-normal"
                placeholder="Author Middle Name" type="text" name="authormiddlename" value={this.state.middlename}
                onChange={this.handleChange('middleName')} />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Last Name"
                id="margin-normal"
                placeholder="Author Last Name" type="text" name="lastname" value={this.state.lastname}
                onChange={this.handleChange('lastName')} />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Barcode"
                id="margin-normal"
                placeholder="Email" type="text" name="barcode" value={this.state.email}
                onChange={this.handleChange('barCode')} />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Choose Library"
                id="margin-normal"
                placeholder="Email" type="text" name="library" value={this.state.email}
                onChange={this.handleChange('libraryName')} />
                                
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

