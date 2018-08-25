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


class EditBookForm extends React.Component {
    constructor() {
        super();
        this.state = {
          fields: {},
          errors: {}
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.submitEditBook = this.submitEditBook.bind(this);
    
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


handleEditBtn =() =>{
    //should convert the state fields to json and make api call
    //should handle error cases (if form is empty shouldn't submit)
    this.props.closeBtnHandler();
}

closeHandler=() =>{
    this.props.closeBtnHandler();
}
submitEditBook(e) {
    e.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields["title"] = "";
            fields["authorfirstname"] = "";
            fields["authorlastname"] = "";
            fields["library"] = "";
            fields["barcode"]="";
            this.setState({fields:fields});
            alert("Form submitted");
        }
}
validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["title"]) {
      formIsValid = false;
      errors["title"] = "*Please enter book title";
    }

    if (typeof fields["title"] !== "undefined") {
      if (!fields["title"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["title"] = "*Please enter alphabet characters only.";
      }
    }
    if (!fields["authorfirstname"]) {
      formIsValid = false;
      errors["authorfirstname"] = "*Please enter author firstname";
    }
    if (typeof fields["authorfirstname"] !== "undefined") {
        if (!fields["authorfirstname"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["authorfirstname"] = "*Please enter alphabet characters only.";
        }
      }

    if (!fields["authorlastname"]) {
      formIsValid = false;
      errors["authorlastname"] = "*Please enter author lastname";
    }

    if (typeof fields["authorlastname"] !== "undefined") {
      if (!fields["authorlastname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["authorlastname"] = "*Please enter alphabet characters only.";
      }
    }
    if (!fields["library"]) {
      formIsValid = false;
      errors["library"] = "*Please select library";
    }

    if (typeof fields["library"] !== "undefined") {
      if (!fields["library"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["library"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["barcode"]) {
        formIsValid = false;
        errors["barcode"] = "*Please enter barcode.";
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
        <form onSubmit= {this.submitEditBook}>
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Book Title"
                id="margin-normal"
                // id="simple-start-adornment"
                placeholder="Book Title" type="text" name="title" value={this.state.fields.title}
                onChange={this.handleChange} 
                />
                <div className="errorMsg">{this.state.errors.title}</div>
             <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Author Firstname"
                id="margin-normal"
                placeholder="Author firstname" type="text" name="authorfirstname" value={this.state.fields.authorfirstname}
                onChange={this.handleChange} />
                 <div className="errorMsg">{this.state.errors.authorfirstname}</div>
            
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Author Lastname"
                id="margin-normal"
                placeholder="Author Lastname" type="text" name="authorlastname" value={this.state.fields.authorlastname}
                onChange={this.handleChange} />
                 <div className="errorMsg">{this.state.errors.authorlastname}</div>
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
                onClick={this.submitEditBook}>
                    Edit
            </Button>
        

    </div>
       
      
    );
  }
}

EditBookForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditBookForm);
