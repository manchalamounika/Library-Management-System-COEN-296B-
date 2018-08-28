import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import LibraryList from './LibraryList';
import EditLibraryForm from './EditLibraryForm';

const divStyle = {
    padding: '30px',
};

const EditLibrary = (props) => {   
    return (
        <div>
                <div>
                    <div style={divStyle}>
                        <LibraryList />
                    </div>
                </div>
                <Modal show = {props.modal} modalClosed ={props.closeBtnHandler}>
                <div>
                    <EditLibraryForm closeBtnHandler={props.closeBtnHandler} rowId={props.rowId}/>
                </div>
                </Modal>
        </div>
    )

}
export default EditLibrary;