import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
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
                        <BookList />
                    </div>
                </div>
                <Modal show = {true} >
                <div>
                    <AddNewBookForm closeBtnHandler={props.closeBtnHandler}/>
                </div>
                </Modal>
                
            
        </div>
    )

}
export default AddBook;
{/* <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal> */}