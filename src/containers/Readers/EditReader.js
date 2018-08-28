import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import ReaderList from './ReaderList';
import EditReaderForm from './EditReaderForm';

const divStyle = {
    padding: '30px',
};

const EditReader = (props) => {   
    return (
        <div>
              <div>
                    <div>
                        <ReaderList/>
                    </div>
                </div>
                <Modal show = {props.modal} modalClosed ={props.closeBtnHandler}>
                <div>
                    <EditReaderForm closeBtnHandler={props.closeBtnHandler} rowId={props.rowId}/>
                </div>
                </Modal>
        </div>
    )

}
export default EditReader;