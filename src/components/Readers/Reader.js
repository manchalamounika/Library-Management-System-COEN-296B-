import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import Index from './Index'
import AddReader from './AddReader';

class Admin extends Component {
    state = {
        splitPane: false,
    }

    addReaderBtnHandler = () => {
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
                <button onClick={this.addReaderBtnHandler}>Add Reader</button>                
                {this.state.splitPane ? 
                    (<AddReader closeBtnHandler={this.closeBtnHandler}/>) :
                    (<Index />)}


            </div>
        )
    }
}

export default Admin;