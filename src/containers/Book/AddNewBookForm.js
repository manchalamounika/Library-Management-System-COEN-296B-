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
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
    title: '',
    bookId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    libraryName:'',
    barCode: '',
    formErrorMessage:'',

   };

   handleChange = prop => event => {
    console.log(prop);
    this.setState({ [prop]: event.target.value });
}

handleMouseDownPassword = event => {
    event.preventDefault();
};

closeHandler=() =>{
    this.props.closeBtnHandler();
}
handleSubmit = () => {
    // your submit logic
}


handleAddBookBtn =(event,state) =>{
    event.preventDefault();
    let self = this;
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
        <div >
        <ValidatorForm
                ref="form"
                onSubmit={this.handleAddBookBtn}
                >
                <TextValidator                  
                className={classNames(classes.margin, classes.textField)}
                label="Book Title"
                id="margin-normal"                
                placeholder="Book Title" type="text" name="title" value={this.state.title}
                onChange={this.handleChange('title')} 
                validators={['required']}
                errorMessages={['this field is required']}
                />
            <TextValidator                  
                className={classNames(classes.margin, classes.textField)}
                label="Book Id"
                id="margin-normal"                
                placeholder="Book Id" type="number" name="bookId" value={this.state.bookId}
                onChange={this.handleChange('bookId')} 
                validators={['required']}
                errorMessages={['this field is required']}
                />
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Author First Name"
                placeholder="Author First Name" type="text" name="firstName" value={this.state.firstName}                
                onChange={this.handleChange('firstName')} 
                validators={['required']}
                errorMessages={['this field is required']}/>
                <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Author Middle Name"
                placeholder="Author Middle Name" type="text" name="middleName" value={this.state.middleName}                
                onChange={this.handleChange('middleName')} 
                validators={['required']}
                errorMessages={['this field is required']}/>
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label=" Author Last Name"
                id="margin-normal"
                placeholder="Author Last Name" type="text" name="lastName" value={this.state.lastName}
                onChange={this.handleChange('lastName')}
                validators={['required']}
                errorMessages={['this field is required']} />
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Library"
                id="margin-normal"
                placeholder="Library" type="text" name="libraryName" value={this.state.libraryName}
                onChange={this.handleChange('libraryName')}
                validators={['required']}
                errorMessages={['this field is required']} />
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Barcode"
                id="margin-normal"
                placeholder="Barcode" type="text" name="barCode" value={this.state.barCode}
                onChange={this.handleChange('barCode')}
                validators={['required']}
                errorMessages={['this field is required']} />
           

                 <Button
            className={classes.button}
                size="small"
                variant="contained"                                
                color="secondary"
                onClick={this.handleAddBookBtn}>
                    Add Book
            </Button> 
            {this.state.showFormValidation && <p style={{color:'red'}}>{this.state.formErrorMessage} </p>}                       
        </ValidatorForm>

    </div>
    </div>
       
      
    );
  }
}

AddNewBookForm.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddNewBookForm);

