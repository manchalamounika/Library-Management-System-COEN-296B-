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
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {}
    }
};

handleChange(field, e){    		
  let fields = this.state.fields;
  fields[field] = e.target.value;        
  this.setState({fields});
}


handleMouseDownPassword = event => {
    event.preventDefault();
};

closeHandler=() =>{
    this.props.closeBtnHandler();
}

Validation() {

  let fields = this.state.fields;
  let errors = {};
  let formIsValid = true;

  if (!fields["title"]) {
    formIsValid = false;
    errors["title"] = "*Please enter book title.";
  }

  if (typeof fields["title"] !== "undefined") {
    if (!fields["title"].match(/^[a-zA-Z ]*$/)) {
      formIsValid = false;
      errors["title"] = "*Please enter alphabet characters only.";
    }
  }
  if (!fields["authorfirstname"]) {
    formIsValid = false;
    errors["authorfirstname"] = "*Please enter author's first name";
  }
  if (typeof fields["auhtorfirstname"] !== "undefined") {
    if (!fields["authorfirstname"].match(/^[a-zA-Z ]*$/)) {
      formIsValid = false;
      errors["auhtorfirstname"] = "*Please enter alphabet characters only.";
    }
  }
  if (!fields["authorlastname"]) {
    formIsValid = false;
    errors["authorlastname"] = "*Please enter author's last name";
  }
  if (typeof fields["authorlastname"] !== "undefined") {
    if (!fields["authorlastname"].match(/^[a-zA-Z ]*$/)) {
      formIsValid = false;
      errors["authorlastname"] = "*Please enter alphabet characters only.";
    }
  }
  if (!fields["library"]) {
    formIsValid = false;
    errors["library"] = "*Please choose library";
  }
  if (typeof fields["library"] !== "undefined") {
    if (!fields["library"].match(/^[a-zA-Z ]*$/)) {
      formIsValid = false;
      errors["library"] = "*Please enter alphabet characters only.";
    }
  }

  if (!fields["barcode"]) {
    formIsValid = false;
    errors["barcode"] = "*Please enter barcode";
  }

  if (typeof fields["barcode"] !== "undefined") {
    if (!fields["barcode"].match(/^[0-9]/)) {
      formIsValid = false;
      errors["barcode"] = "*Please enter valid barcode";
    }
  }
  
  this.setState({
    errors: errors
  });
  return formIsValid;


}
handleAddBookBtn(e){
  e.preventDefault();
  if(this.Validation()){
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
else{
    alert("Form has errors.")
  }

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
        <form onSubmit={this.handleAddBookBtn.bind(this)}>
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Title"
                id="margin-normal"
                // id="simple-start-adornment"
                placeholder="Title" type="text" name="title" value={this.state.fields["title"]}
                onChange={this.handleChange.bind(this,'title')} 
                />
                <div className="errorMsg">{this.state.errors["title"]}</div>
            
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Author First Name"
                id="margin-normal"
                // id="simple-start-adornment"
                placeholder="First Name" type="text" name="authorfirstname" value={this.state.fields["authorfirstname"]}
                onChange={this.handleChange.bind(this,'authorfirstname')} 
                />
                <div className="errorMsg">{this.state.errors["authorfirstname"]}</div>

            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Middle Name"
                id="margin-normal"
                placeholder="Author Middle Name" type="text" name="authorlastname" value={this.state.fields["authorlastname"]}
                onChange={this.handleChange.bind(this,'authorlastname')} />
            <div className="errorMsg">{this.state.errors["authorlastname"]}</div>
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Barcode"
                id="margin-normal"
                placeholder="Email" type="text" name="barcode" value={this.state.fields["barcode"]}
                onChange={this.handleChange.bind(this,'barcode')} />
                <div className="errorMsg">{this.state.errors["barcode"]}</div>
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Choose Library"
                id="margin-normal"
                placeholder="Choose from Library" type="text" name="library" value={this.state.fields["library"]}
                onChange={this.handleChange.bind(this,'library')} />
                <div className="errorMsg">{this.state.errors["library"]}</div>
                                
        </form>
        </div>
        
            <Button
            className={classes.button}
                size="small"
                variant="contained"                                
                color="secondary"
                onClick={this.handleAddBookBtn.bind(this)}>
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

