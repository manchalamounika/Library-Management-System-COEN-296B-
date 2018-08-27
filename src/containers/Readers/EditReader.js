import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import Index from './Index';
import EditReaderForm from '../../components/Readers/EditReaderForm'


const divStyle = {
    padding: '30px',
};


const EditReader = (props) => {   
    return (
        <div>
            <SplitPane split="vertical" minSize={500} defaultSize={800}>
                <div>
                    <div style={divStyle}>
                        <Index />
                    </div>
                </div>
                <div>
                    <EditReaderForm closeBtnHandler={props.closeBtnHandler}  rowId={props.rowId}/>
                </div>
            </SplitPane>
        </div>
    )

}
export default EditReader;