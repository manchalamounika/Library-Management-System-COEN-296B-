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


class EditReaderForm extends React.Component {
    constructor(props){
        super(props);
        console.log("Mounika++++++++++++++"+JSON.stringify(this.props.rowId));
       console.log(props);
        
        this.state={
            data: this.props.rowId,
        }
    }


handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
}

handleEditReaderBtn =(event,state) =>{
    event.preventDefault();
    let self = this;
    let user = self.state;
    axios.put('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/reader/'+this.state.data['BarCode'], user)
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
                    Edit Reader
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
                placeholder="First Name" type="text" name="firstname" defaultValue={this.state.data['FirstName']}
                onChange={this.handleChange('firstName')} 
                />

            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Middle Name"
                id="margin-normal"
                placeholder="Middle Name" type="text" name="middlename" defaultValue={this.state.data['MiddleName']}
                onChange={this.handleChange('middleName')} />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Last Name"
                id="margin-normal"
                placeholder="Last Name" type="text" name="lastname" defaultValue={this.state.data['LastName']}
                onChange={this.handleChange('lastName')} />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="library"
                id="margin-normal"
                placeholder="Library" type="text" name="library" defaultValue={this.state.data['LibraryName']}
                onChange={this.handleChange('library')} />
            
        </form>
        </div>
        
            <Button
            className={classes.button}
                size="small"
                variant="contained"                                
                color="secondary"
                onClick={this.handleEditReaderBtn}>
                    Edit Reader
            </Button>
        

    </div>
       
      
    );
  }
}

EditReaderForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditReaderForm);