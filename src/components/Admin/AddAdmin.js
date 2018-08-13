import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import AdminList from './AdminList';
import AddNewAdminForm from './AddNewAdminForm'


const divStyle = {
    padding: '30px',
};


const AddAdmin = (props) => {   
    return (
        <div>
            <SplitPane split="vertical" minSize={500} defaultSize={800}>
                <div>
                    <div style={divStyle}>
                        <AdminList />
                    </div>
                </div>
                <div>
                    <AddNewAdminForm closeBtnHandler={props.closeBtnHandler}/>
                </div>
            </SplitPane>
        </div>
    )

}
export default AddAdmin;