import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import LibrarianList from './LibrarianList';
import AddNewLibrarianForm from './AddNewLibrarianForm';


const divStyle = {
    padding: '30px',
};


const AddLibrarian = (props) => {   
    return (
        <div>
            <SplitPane split="vertical" minSize={500} defaultSize={800}>
                <div>
                    <div style={divStyle}>
                        <LibrarianList />
                    </div>
                </div>
                <div>
                    <AddNewLibrarianForm closeBtnHandler={props.closeBtnHandler}/>
                </div>
            </SplitPane>
        </div>
    )

}
export default AddLibrarian;