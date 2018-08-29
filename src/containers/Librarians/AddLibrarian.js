import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import LibrarianList from './LibrarianList';
import AddNewLibrarianForm from './AddNewLibrarianForm'
const divStyle = {
    padding: '30px',
};

const AddLibrarian = (props) => {   
    return (
        <div>
                <div>
                    <div style={divStyle}>
                        <LibrarianList />
                    </div>
                </div>
                <Modal show = {props.modal} modalClosed ={props.closeBtnHandler}>
                <div>
                    <AddNewLibrarianForm closeBtnHandler={props.closeBtnHandler}/>
                </div>
                </Modal>
        </div>
    )

}
export default AddLibrarian;