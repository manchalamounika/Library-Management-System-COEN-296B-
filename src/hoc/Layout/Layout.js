/* import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Aux from '../Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const styles = theme => ({
    root:{
        height: 440,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',  
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
})

class Layout extends Component {
    state ={
        showSideDrawer : false,
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer : false});
    }

     sideDrawerToggleHandler = () => {
        this.setState ((prevState) => {
            return{showSideDrawer : !prevState.showSideDrawer};
        });
    }

    render(){
        const {classes} = this.props;

        return(   
        <Aux className={classes.root}>
            <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler} isLoggedIn= {this.props.isLoggedIn} />
            {console.log(this.props.isLoggedIn)}
            <SideDrawer 
            open = {this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}/>
            <main className = {classes.content}>
              <div className = {classes.toolbar}/>
              <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
                {this.props.children}
            </main>   
        </Aux>)
    }
}
//adjacent jsx elements not allowed - create a higher order component
//the main purpose of aux is to have a wrapping root element
Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Layout); */

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { mailFolderListItems, otherMailFolderListItems } from '../../components/Navigation/Navbar/OptionList';
import Aux from '../Auxi';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100vh',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    overflowY : 'scroll',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

class Layout extends Component{
  
  render(){
    const { classes } = this.props;
    return (
      <Aux>
      <div className={classes.root}>
        <Navbar isLoggedIn= {this.props.isLoggedIn}/>
        <SideDrawer isLoggedIn= {this.props.isLoggedIn}/>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
      </Aux>
    );
  } 
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);