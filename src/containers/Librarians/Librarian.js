import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import LibrarianList from './LibrarianList'
import AddLibrarian from './AddLibrarian';

class Librarian extends Component {
    state = {
        splitPane: false,
    }

    addLibrarianBtnHandler = () => {
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
                <button onClick={this.addLibrarianBtnHandler}>Add Librarian</button>                
                {this.state.splitPane ? 
                    (<AddLibrarian closeBtnHandler={this.closeBtnHandler}/>) :
                    (<LibrarianList />)}


            </div>
        )
    }
}

export default Librarian;