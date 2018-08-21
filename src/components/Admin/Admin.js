import React, { Component } from 'react';
import AdminList from './AdminList'
import AddAdmin from './AddAdmin';
import Button from '@material-ui/core/Button';
import SnackBarForAdminVerification from './SnackBarForAdminVerification.js';

class Admin extends Component {
    state = {
        splitPane: false,
        open:false,
        email:'',
    }

    addAdminBtnHandler = () => {
        this.setState({
            splitPane: true,
        })
    }

    closeBtnHandler = () => {
        this.setState({
            splitPane: false,
        })
    }
    
      handleClose = (event, reason) => {
        this.setState({ open: false });
      };

      getEmail = (email) => {
         this.setState({email, open:true});         
      }
    render() {
        
        return (
            <div>
                <div className="add-admin-btn">
                <Button size="small" variant="contained" color="secondary"onClick={this.addAdminBtnHandler}>
                    Add Admin
                </Button>                    
                </div>
                {this.state.splitPane ?
                    (<AddAdmin closeBtnHandler={this.closeBtnHandler} getEmail={this.getEmail}/>) :
                    (<AdminList />)}
                {this.state.email.length>0 && <SnackBarForAdminVerification handleClose={this.handleClose} open={this.state.open}
                email={this.state.email}/>}

            </div>
        )
    }
}

export default Admin;