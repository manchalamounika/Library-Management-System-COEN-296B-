import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import BookList from './BookList'
import AddBook from './AddBook';



class Book extends Component {
    state = {
        splitPane: false,
    }

    addBookBtnHandler = () => {
        this.setState({
            splitPane: true,
        });
       
    }
    

    closeBtnHandler = () => {
        this.setState({
            splitPane:false,
            
        })
    }
    
    render() {
        let imgUrl = '/Users/saishree/reactWorkspace/library_managementsystem/src/Backdrop.png';
        
       
        return (
            <div style={{backgroundImage: `url(${imgUrl})`}}>
                
                <button onClick={this.addBookBtnHandler}>Add Book</button> 
                    {this.addBookBtnHandler} {
                    this.state.splitPane ? 
        (<AddBook closeBtnHandler={this.closeBtnHandler}/>) :
        (<BookList />)}
                </div>
                
                
        
                    );
    }
}

export default Book;