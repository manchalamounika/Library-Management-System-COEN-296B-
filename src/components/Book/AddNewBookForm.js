import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';


// const styles = theme => ( {
//     root: {
//         flexGrow: 1,        
//     },   
//     textField: {
//         marginLeft: 'theme.spacing.unit',
//         marginRight: 'theme.spacing.unit',
//         width: 200,
//         flexBasis: 200,
//         // margin: theme.spacing.unit,
//         // marginTop: theme.spacing.unit * 3,
//       },
//       margin: {
//         margin: theme.spacing.unit,
//       },
//       withoutLabel: {
//         marginTop: theme.spacing.unit * 3,
//       },
// });



const styles = theme => ({
  root: {
    // justifyContent: 'center',
    padding: '30px',
    paddingTop: '20px',
    // alignContent: 'center',
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
    
        this.handleChange = this.handleChange.bind(this);
        this.submitAddNewBook = this.submitAddNewBook.bind(this);
    
      };
    
      handleChange(e) {
        let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

    }
    
      handleMouseDownPassword = event => {
    event.preventDefault();
    };

        handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
};

handleClickShowConfirmPassword = () => {
    this.setState(state => ({ showConfirmPassword: !state.showConfirmPassword }));
};
submitAddNewBook(e) {
    e.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields["booktitle"] = "";
            fields["firstname"] = "";
            fields["lastname"] = "";
            fields["library"] = "";
            fields["Barcode"]="";
            this.setState({fields:fields});
            alert("Form submitted");
        }
}

handleAddBookBtn(e) {
    //should convert the state fields to json and make api call
    //should handle error cases (if form is empty shouldn't submit)
    e.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields["booktitle"] = "";
            fields["firstname"] = "";
            fields["lastname"] = "";
            fields["library"] = "";
            fields["Barcode"]="";
            this.setState({fields:fields});
            alert("Form submitted");
        }
    }

closeHandler=() =>{
    this.props.closeBtnHandler();
}
validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["booktitle"]) {
      formIsValid = false;
      errors["booktitle"] = "*Please enter book title";
    }

    if (typeof fields["booktitle"] !== "undefined") {
      if (!fields["booktitle"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["booktitle"] = "*Please enter alphabet characters only.";
      }
    }
    if (!fields["firstname"]) {
      formIsValid = false;
      errors["firstname"] = "*Please enter firstname";
    }
    if (typeof fields["firstname"] !== "undefined") {
        if (!fields["firstname"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["firstname"] = "*Please enter alphabet characters only.";
        }
      }

    if (!fields["lastname"]) {
      formIsValid = false;
      errors["lastname"] = "*Please enter your lastname";
    }

    if (typeof fields["lastname"] !== "undefined") {
      if (!fields["lastname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lastname"] = "*Please enter alphabet characters only.";
      }
    }
    if (!fields["library"]) {
      formIsValid = false;
      errors["library"] = "*Please enter your username.";
    }

    if (typeof fields["library"] !== "undefined") {
      if (!fields["library"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["library"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["barcode"]) {
        formIsValid = false;
        errors["barcode"] = "*Please enter your barcode.";
      }
  
      if (typeof fields["barcode"] !== "undefined") {
        if (!fields["barcode"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["barcode"] = "*Please enter valid barcode.";
        }
      }

    this.setState({
      errors: errors
    });
    return formIsValid;


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
        <form method="post"  name="AddNewBookForm"  onSubmit= {this.submitAddNewBook}>
        <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Book Title"
                id="margin-normal"
                placeholder="Book Title" type="text" name="booktitle" value={this.state.fields.booktitle}
                onChange={this.handleChange} />
                <div className="errorMsg">{this.state.errors.booktitle}</div>
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="First Name"
                id="margin-normal"
                // id="simple-start-adornment"
                placeholder="First Name" type="text" name="firstname" value={this.state.fields.firstname}
                onChange={this.handleChange} 
                />
                <div className="errorMsg">{this.state.errors.firstname}</div>

            
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Last Name"
                id="margin-normal"
                placeholder="Last Name" type="text" name="lastname" value={this.state.fields.lastname}
                onChange={this.handleChange} />
                <div className="errorMsg">{this.state.errors.lastname}</div>
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Library"
                id="margin-normal"
                placeholder="Library" type="text" name="library" value={this.state.fields.library}
                onChange={this.handleChange} />
                <div className="errorMsg">{this.state.errors.library}</div>

            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Barcode"
                id="margin-normal"
                placeholder="Barcode" type="text" name="barcode" value={this.state.fields.barcode}
                onChange={this.handleChange} />
                <div className="errorMsg">{this.state.errors.barcode}</div>
            
            </form>
            </div>
        
            <Button
            className={classes.button}
                size="small"
                variant="contained"                                
                color="secondary"
                onClick={this.submitAddNewBook}>
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

