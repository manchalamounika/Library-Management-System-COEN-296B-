import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import ReaderList from './ReaderList';
import AddNewReaderForm from './AddNewReaderForm'

const divStyle = {
    padding: '30px',
};

const AddReader = (props) => {   
    return (
        <div>
                <div>
                    <div style={divStyle}>
                        <ReaderList />
                    </div>
                </div>
                <Modal show = {props.modal} modalClosed ={props.closeBtnHandler} >
                <div>
                    <AddNewReaderForm closeBtnHandler={props.closeBtnHandler}/>
                </div>
                </Modal> 
        </div>
    )

}
export default AddReader;