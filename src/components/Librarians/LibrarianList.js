import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
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
        axios.get('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/librarian',{
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
                data={this.state.data}
                columns={[
                    {Header: 'Name',
                    accessor: 'Name'},
                    {Header: 'Community',
                    accessor: 'Community'},
                    {Header: 'Country',
                    accessor: 'Country'},
                    {Header: 'Barcode ',
                    accessor: 'LibrarianBarcode'},
                    
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