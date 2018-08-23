import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import Index from './Index';
import AddNewReaderForm from './AddNewReaderForm'

const divStyle = {
    padding: '30px',
};

const AddReader = (props) => {   
    return (
        <div>
            <SplitPane split="vertical" minSize={500} defaultSize={800}>
                <div>
                    <div style={divStyle}>
                        <Index />
                    </div>
                </div>
                <div>
                    <AddNewReaderForm closeBtnHandler={props.closeBtnHandler}/>
                </div>
            </SplitPane>
        </div>
    )

}
export default AddReader;