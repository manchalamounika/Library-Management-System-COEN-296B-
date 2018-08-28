import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import BookList from './BookList';
import AddNewBookForm from './AddNewBookForm'
 
const divStyle = {
    padding: '30px',
}; 

const AddBook = (props) => {   
    return (
        <div>
                <div>
                    <div style={divStyle}>
                        <BookList/>
                    </div>
                </div>
                <Modal show = {props.modal} modalClosed ={props.closeBtnHandler}>
                <div>
                    <AddNewBookForm closeBtnHandler={props.closeBtnHandler}/>
                </div>
                </Modal>
                
            
        </div>
    )

}
export default AddBook;
 