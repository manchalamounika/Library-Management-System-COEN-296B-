import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import axios from 'axios';

class Index extends Component{
    constructor(){
        super();
        this.state={
            data: [],
        }
        this.makeData = this.makeData.bind(this);
    }

    makeData= (state,instance)=>{
        let self = this;
        axios.get('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/reader',{
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
                    {Header: 'First Name',
                    accessor: 'FirstName'},
                    {Header: 'Last Name',
                    accessor: 'LastName'},
                    {Header:'Community',
                    accessor: 'LibraryName'},
                    {Header: 'Barcode ',
                    accessor: 'BarCode'},
                    {Header: 'Checkouts ',
                    accessor: 'Checkouts'},
                ]} className="-striped -highlight"
                showPagination={false}
                defaultPageSize={50}
                minRows={5}
                onFetchData={this.makeData}
                />
            </div>
            </div>
        )

    }
}

export default Index;