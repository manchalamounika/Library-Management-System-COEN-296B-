import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import AdminList from './AdminList'
import AddAdmin from './AddAdmin';

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
            splitPane:false,
        })
    }
    render() {
        let imgUrl = '/Users/saishree/reactWorkspace/library_managementsystem/src/Backdrop.png'
        return (
            <div style={{backgroundImage: `url(${imgUrl})`}}>
                <button onClick={this.addAdminBtnHandler}>Add Admin</button>                
                {this.state.splitPane ? 
                    (<AddAdmin closeBtnHandler={this.closeBtnHandler}/>) :
                    (<AdminList />)}


            </div>
        )
    }
}

export default Admin;