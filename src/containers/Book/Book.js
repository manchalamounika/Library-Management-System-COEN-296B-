import React, { Component } from 'react';
import BookList from './BookList'
import AddBook from './AddBook';
import Aux from '../../hoc/Auxi';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'; 
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
   
const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        position:'relative',
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 3,
        width:'90%',
        margin: '10px auto',
        'border-radius':'10px',
        background:'rgba(255,255,255,0.7)'
    },
    button: {
        margin: theme.spacing.unit,
        position :'absolute',
        /* display: 'inline-block', */
        top : '5px',
        right:'10px',
        float: 'right',
        'border-radius':'10px'
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

class Book extends Component {
    state = {
        modal:false,
    }
    addBookBtnHandler = () => {
        this.setState({
            modal:true,
        });
       
    }
    closeBtnHandler = () => {
        this.setState({
           modal:false,   
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
              <Paper className={classes.root} elevation={1}>
                <Typography style={{fontSize:'3em',
                            position :'absolute',
                            top : '5px',
                            left:'20px',
                            float: 'left',}}variant="headline" component="h1">
                  Books
                </Typography>
                <Button variant="extendedFab" className={classes.button} onClick={this.addBookBtnHandler}>
                <AddIcon className={classes.extendedIcon}/>Add Book</Button>
                {this.state.modal ? (<AddBook modal={this.state.modal} closeBtnHandler={this.closeBtnHandler}/>) :(<BookList />)} 
              </Paper>
            </div>
          );

        }   
}

Book.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Book);
 