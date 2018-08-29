import React, {Component} from 'react';
import Aux from '../Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state ={
        showSideDrawer : false,
        showToolBar : false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer : false});
    }

    toolBarClosedHandler = () => {
        this.setState({showToolBar : false});
    }

    sideDrawerToggleHandler = () => {
        this.setState ((prevState) => {
            return{showSideDrawer : !prevState.showSideDrawer};
        });
    }

    render(){
        return(  
        <Aux>
            <div>
            <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler}/>
            <SideDrawer 
            open = {this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler} />
            </div>
            <main className = {classes.Content}>
            {this.props.children}
            </main>   
        </Aux>)
    }
}
//adjacent jsx elements not allowed - create a higher order component
//the main purpose of aux is to have a wrapping root element

export default Layout;

{/*  */}