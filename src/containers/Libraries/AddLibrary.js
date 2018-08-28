import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import LibraryList from './LibraryList';
import AddNewLibraryForm from './AddNewLibraryForm'

const divStyle = {
    padding: '30px',
};


const AddLibrary = (props) => {   
    return (
        <div>
                <div>
                    <div>
                        <LibraryList />
                    </div>
                </div>
                <Modal show = {props.modal} modalClosed ={props.closeBtnHandler}>
                <div>
                    <AddNewLibraryForm closeBtnHandler={props.closeBtnHandler}/>
                </div>
                </Modal>
                
            
        </div>
    )

}
export default AddLibrary;
