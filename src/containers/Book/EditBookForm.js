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


class EditBookForm extends React.Component {
    constructor(props){
        super(props);
        console.log("Mounika++++++++++++++"+JSON.stringify(this.props.rowId));
       console.log(props);
        
        this.state={
            data: this.props.rowId,
        }
       // this.makeData = this.makeData.bind(this);
    }
    makeData = (state,instance) =>{ 
        console.log(this.props.rowId+"======")       
        axios.get('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/book/'+this.props.rowId,{
            mode: 'no-cors',
            method: 'GET',
       })
       .then((response)=> {
               console.log(response);
               this.setState({data:response.data});
       })
    }


handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
}


handleEditBtn =(event,state) =>{
    event.preventDefault();
    let self = this;
    let user = self.state;
    axios.put('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/book/'+this.state.data['BookBarcode'], user)
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
        <form>
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Book Title"
                id="margin-normal"
                placeholder="Book Title" type="text" name="title" defaultValue={this.state.data['Title']}
                onChange={this.handleChange('title')} 
                />
             <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Author Firstname"
                id="margin-normal"
                placeholder="Author firstname" type="text" name="author firstname" value={this.state.data['FirstName']}
                onChange={this.handleChange('firstName')} />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Author Middlename"
                id="margin-normal"
                placeholder="Middle Name" type="text" name="middlename" value={this.state.data['MiddleName']}
                onChange={this.handleChange('middleName')} />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Author Lastname"
                id="margin-normal"
                placeholder="Author Lastname" type="text" name="authorlastname" value={this.state.data['LastName']}
                onChange={this.handleChange('lastName')} />
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Library"
                id="margin-normal"
                placeholder="Library" type="text" name="library" value={this.state.data['LibraryName']}
                onChange={this.handleChange('libraryName')} />
            
            <TextField
                className={classNames(classes.margin, classes.textField)}
                label="Barcode"
                id="margin-normal"
                placeholder="Barcode" type="text" name="barcode" value={this.state.data['BookBarcode']}
                onChange={this.handleChange('barCode')} />          
        </form>
        </div>
        
            <Button
            className={classes.button}
                size="small"
                variant="contained"                                
                color="secondary"
                onClick={this.handleEditBtn}>
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
