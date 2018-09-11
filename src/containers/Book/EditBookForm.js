import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    padding: '20px',
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
    width: 300,
  },
  button:{
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  }
});


class EditBookForm extends Component {
state = {
    title:'',
    bookId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    libraryName: '',
    barCode:'',
    showFormValidation:false,
    formErrorMessage:'',
    open: false,
}
componentDidMount() {
    ValidatorForm.addValidationRule('isString', (value) => {
        if (value.match(/^[0-9]/)) {
            return false;
        }
        return true;
    });
    ValidatorForm.addValidationRule('isNumber', (value) => {
        if (value.match(/^[a-zA-Z]+$/)) {
            return false;
        }
        return true;
    });
}
handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
}

handleMouseDownPassword = event => {
    event.preventDefault();
};

handleEditBookBtn =(event,state) =>{
    event.preventDefault();
    let self = this;
    let user = self.state;
    axios.put('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/book/', user)
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
handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

render() {
    const {classes} = this.props;
    return (      
    <div>
        <div >
            <AppBar position="static" color="default" >
                <Toolbar variant="dense">
                <Typography variant="title" color="inherit">
                   Edit Book
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
        <ValidatorForm
                ref="form"
                onSubmit={this.handleAddBookBtn}>
                <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Book Title"
                id="margin-normal"
                placeholder="title" type="text" name="title" value={this.state.title}
                onChange={this.handleChange('title')}
                validators={['isString','required']}
                errorMessages={['alphabets only','this field is required']} />
                <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Book Id"
                id="margin-normal"
                placeholder="Book Id" type="text" name="bookId" value={this.state.bookId}
                onChange={this.handleChange('bookId')}
                validators={['isNumber','required']}
                errorMessages={['numbers only','this field is required']} />
            <TextValidator                  
                className={classNames(classes.margin, classes.textField)}
                label="First Name"
                id="margin-normal"                
                placeholder="First Name" type="text" name="firstName" value={this.state.firstName}
                onChange={this.handleChange('firstName')} 
                validators={['isString','required']}
                errorMessages={['alphabtes only','this field is required']}
                />
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Middle Name"
                id="margin-normal"
                placeholder="Middle Name" type="text" name="middleName" value={this.state.middleName}                
                onChange={this.handleChange('middleName')} 
                validators={['isString','required']}
                errorMessages={['alphabtes only','this field is required']}/>
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Last Name"
                id="margin-normal"
                placeholder="Last Name" type="text" name="lastName" value={this.state.lastName}
                onChange={this.handleChange('lastName')}
                validators={['isString','required']}
                errorMessages={['alphabets only','this field is required']} />
                
            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="library-name">Library Name</InputLabel>
            <Select
            value={this.state.libraryName}
            onChange={this.handleChange('libraryName')}
            inputProps={{
              name: 'libraryName',
              id: 'library-name',
            }}
            >
            <MenuItem value="SCU">
                </MenuItem>
                <MenuItem value="SCU">SCU</MenuItem>
                <MenuItem value="Central Park">Central Park</MenuItem>
                <MenuItem value="Lib1">Lib1</MenuItem>
                <MenuItem value="Lib2">Lib2</MenuItem>
            </Select>
            </FormControl>
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Barcode"
                id="margin-normal"
                placeholder="Barcode" type="text" name="barCode" value={this.state.barCode}
                onChange={this.handleChange('barCode')}
                validators={['isNumber','required']}
                errorMessages={['numbers only','this field is required']} />
            <Button className={classes.button}
                size="small"
                variant="contained"                                
                color="secondary"
                type="submit">            
                Save
            </Button>   
                {this.state.showFormValidation && <p style={{color:'red'}}>{this.state.formErrorMessage} </p>}                       
            </ValidatorForm>
        </div>                        
    </div>             
    );
  }
}

EditBookForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditBookForm); 
