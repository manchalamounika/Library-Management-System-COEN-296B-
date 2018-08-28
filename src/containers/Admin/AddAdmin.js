import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import AdminList from './AdminList';
import AddNewAdminForm from './AddNewAdminForm'
const divStyle = {
    padding: '30px',
};

const AddAdmin = (props) => {   
    return (
        <div>
                <div>
                    <div style={divStyle}>
                        <AdminList />
                    </div>
                </div>
                <Modal show = {props.modal} modalClosed ={props.closeBtnHandler}>
                <div>
                    <AddNewAdminForm closeBtnHandler={props.closeBtnHandler}/>
                </div>
                </Modal>
        </div>
    )

}
export default AddAdmin;