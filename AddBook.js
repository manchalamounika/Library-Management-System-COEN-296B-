import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import BookList from './BookList';
import AddNewBookForm from './AddNewBookForm'


const divStyle = {
    padding: '30px',
};


const AddBook = (props) => {   
    return (
        <div>
            <SplitPane split="vertical" minSize={500} defaultSize={800}>
                <div>
                    <div style={divStyle}>
                        <BookList />
                    </div>
                </div>
                <div>
                    <AddNewBookForm closeBtnHandler={props.closeBtnHandler}/>
                </div>
            </SplitPane>
        </div>
    )

}
export default AddBook;