import React, { Component } from 'react';
import ReactTable from 'react-table';
import  classes from "./react-table.css";
import axios from 'axios';

class BookList extends Component{
    constructor(){
        super();
        this.state={
            data: [],
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
    render(){
        return(
            <div className='admin-table-container'>
            <div className='admin-table'>
                <ReactTable 
                className = {classes.ReactTable}
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
                ]} 
                className="-striped -highlight"
                showPagination={false}
                defaultPageSize={10}
                minRows={5}
                onFetchData={this.makeData}/>
            </div>
            </div>
        )
         
    }
}

export default BookList;