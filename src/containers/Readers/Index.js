import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import axios from 'axios';
import EditReader from './EditReader';
import './test.css';
class Index extends Component{
    constructor(){
        super();
        this.state={
            data: [],
            datarow :{}
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
    
    editReaderBtnHandler = (property,info) => {
        let rowInfo = info.find((element)=>element.BookBarcode == property);
        console.log(JSON.stringify(rowInfo)+"===HHHHH+++++++") 
        this.setState({
            splitPane: true,
            datarow: rowInfo,
        });
       console.log(property,"====>Mounika sss");
       }
    
       closeBtnHandler = () => {
        this.setState({
            splitPane:false,
        })
    }
<<<<<<< HEAD:src/containers/Readers/Index.js
=======


>>>>>>> a38905a... reader edit:src/components/Readers/Index.js
    render(){
        const list = (
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
                    {
                        Header: 'EDIT',
                        width: 125,
                        accessor: 'BookBarcode',
                        style: {
                          cursor: 'pointer',
                        },
                         Cell: props => <button onClick={()=>this.editReaderBtnHandler(props.value,this.state.data)}>EDIT</button>
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
                ]} className="-striped -highlight"
                showPagination={false}
                defaultPageSize={50}
                minRows={5}
                onFetchData={this.makeData}
                />

        );
        return(
            <div className='admin-table-container'>
            <div className='admin-table'>
            {this.editReaderBtnHandler} {
                this.state.splitPane ? 
    (<EditReader closeBtnHandler={this.closeBtnHandler} rowId={this.state.datarow}/>) :
    list}
            </div>
            </div>
        )

    }
}

export default Index;