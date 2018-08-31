import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import BookList from './BookList';
import EditBookForm from './EditBookForm';

const divStyle = {
    padding: '30px',
};

const EditBook = (props) => {   
    return (
        <div>
                <div>
                    <div>
                        <BookList />
                    </div>
                </div>
                <Modal show = {props.modal} modalClosed ={props.closeBtnHandler}>
                <div>
                    <EditBookForm closeBtnHandler={props.closeBtnHandler} rowId={props.rowId}/>
                </div>
                </Modal>
        </div>
    )

}
export default EditBook;
