import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class AdminList extends Component{
    makeData = () =>{        
        return (
            [
                {firstName: 'abc',
                lastName: 'abc',
                email: 'abc@com'},
    
                {firstName: 'qwe',
                lastName: 'qwe',
                email: 'qwe@com'},
    
                {firstName: 'asd',
                lastName: 'asd',
                email: 'asd@com'},
    
                {firstName: 'yui',
                lastName: 'yui',
                email: 'yui@com'},
            ]
        )
    }
    state={
        adminList: this.makeData(),
    }

    // componentDidMount(){
    //     - make api call
    //     - call makedata. send json as parameter
    //     - setSate to the result of makeDAta
    // }

    //on cloumn hover should display delete option

    
    render(){
        const data = this.state.adminList;

        return(
            <div className='admin-table-container'>
            <div className='admin-table'>
                <ReactTable 
                data={data}
                columns={[
                    {Header: 'First Name',
                    accessor: 'firstName'}, //accessor should mathc the object property name

                    {Header: 'Last Name',
                    accessor: 'lastName'},

                    {Header: 'Email ',
                    accessor: 'email'},
                ]} className="-striped -highlight"
                showPagination={false}
                defaultPageSize={10}
                minRows={5}/>
            </div>
            </div>
        )
         
    }
}

export default AdminList;