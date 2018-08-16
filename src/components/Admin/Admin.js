import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import AdminList from './AdminList'
import AddAdmin from './AddAdmin';
import Button from '@material-ui/core/Button';

class Admin extends Component {
    state = {
        splitPane: false,
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
    render() {
        
        return (
            <div>
                <div className="add-admin-btn">
                <Button size="small" variant="contained" color="secondary"onClick={this.addAdminBtnHandler}>
                    Add Admin
                </Button>                    
                </div>
                {this.state.splitPane ?
                    (<AddAdmin closeBtnHandler={this.closeBtnHandler} />) :
                    (<AdminList />)}
            </div>
        )
    }
}

export default Admin;