import React, { Component } from 'react';
import ReactTable from 'react-table';
import SplitPane from 'react-split-pane';
import "react-table/react-table.css";
import axios from 'axios';
import EditBook from './EditBook';
import './test.css';

class BookList extends Component{
    constructor(){
        super();
        this.state={
            data: [],
            splitPane: false,
        }
        
        
        this.makeData = this.makeData.bind(this);
    }
    makeData = (state,instance) =>{        
        axios.get('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/book',{
            mode: 'no-cors',
            method: 'GET',
       })
       .then((response)=> {
               console.log(response);
               this.setState({data:response.data});
       })
    }
    
    editBookBtnHandler = () => {
        this.setState({
            splitPane: true,
        });
       console.log("Hello");
       }
    
       closeBtnHandler = () => {
        this.setState({
            splitPane:false,
        })
    }
    render(){
        const Table = (<div><ReactTable 
        data={this.state.data}
        columns={[
            {Header: 'Title',
            accessor: 'Title'},
            {Header: 'First Name',
            accessor: 'FirstName'},
            {Header: 'Last Name',
            accessor: 'LastName'},
            {Header: 'Library ',
            accessor: 'LibraryName'},
            {Header: 'Barcode ',
            accessor: 'BookBarcode'},
            {expander:true, 
                width: 65,
                Expander: ({ isExpanded, ...rest}) =>
                <div>
                   
                    <button onClick={this.editBookBtnHandler}>Edit
                    
                    </button> 
                     
                </div>,
                style: {
                    cursor: "pointer",
                    fontSize: 15,
                    padding: "10",
                    textAlign: "center",
                    userSelect: "none"
                  },
            },
            {   expander:true,
                width: 65,
                Expander: ({ isExpanded, ...rest}) =>
                <div>
                   <button >Delete
                    </button> 
                   </div>, 
            
                 
                
                style: {
                    cursor: "pointer",
                    fontSize: 15,
                    padding: "10",
                    textAlign: "center",
                    userSelect: "none"
                  }, 
            }
        ]} 
        
        className="-striped -highlight"
        showPagination={false}
        defaultPageSize={10}
        minRows={5}
        onFetchData={this.makeData}/>

   
    </div>
    );
        
        
            
        return(
           <div className = "div1">
            {this.editBookBtnHandler} {
                this.state.splitPane ? 
    (<EditBook closeBtnHandler={this.closeBtnHandler}/>) :
    Table}
    </div>
        );
         
    }
    }

export default BookList;