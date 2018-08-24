import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import BookList from './BookList';
import EditBookForm from './EditBookForm';
const divStyle = {
    padding: '30px',
};




const EditBook = (props) => {   
    return (
        <div>
            <SplitPane split="vertical" minSize={500} defaultSize={800}>
                <div>
                    <div style={divStyle}>
                        <BookList />
                    </div>
                </div>
                <div>
                    <EditBookForm closeBtnHandler={props.closeBtnHandler}/>
                </div>
            </SplitPane>
        </div>
    )

}
export default EditBook;