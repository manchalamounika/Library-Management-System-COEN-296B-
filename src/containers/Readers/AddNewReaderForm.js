import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
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


class AddNewReaderForm extends React.Component {
     state = {};


handleChange = prop => event => {
    console.log(prop);
    this.setState({ [prop] : event.target.value });
}

handleAddReaderBtn =(event,state) =>{
    event.preventDefault();
    let self = this;
   console.log(self.state);
   let user = self.state;
    console.log("User:::",user);
    axios.post('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/reader', user)
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
                    Add New Reader
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
                onChange={this.handleChange("firstName")} 
                />

            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Middle Name"
                id="margin-normal"
                placeholder="Middle Name" type="text" name="middlename" value={this.state.middlename}
                onChange={this.handleChange("middleName")} />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Last Name"
                id="margin-normal"
                placeholder="Last Name" type="text" name="lastname" value={this.state.lastname}
                onChange={this.handleChange("lastName")} />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="library"
                id="margin-normal"
                placeholder="Library" type="text" name="library" value={this.state.library}
                onChange={this.handleChange("libraryName")} />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Bar Code"
                id="margin-normal"
                placeholder="Bar Code" type="text" name="barcode" value={this.state.barcode}
                onChange={this.handleChange("barCode")} />
        </form>
        </div>
        
            <Button
            className={classes.button}
                size="small"
                variant="contained"                                
                color="secondary"
                onClick={this.handleAddReaderBtn}>
                    Add Reader
            </Button>
    </div>     
    );
  }
}

AddNewReaderForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddNewReaderForm);