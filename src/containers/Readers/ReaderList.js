import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import axios from 'axios';
import EditReader from './EditReader';
import './ReaderList.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
      margin: 0,    
    },
    input: {
      display: 'none',
    },
});

class ReaderList extends Component{
    constructor(){
        super();
        this.state={ 
            data: [],
            modal: false,
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
            modal: true,
            datarow: rowInfo,
        });
       console.log(property,"====>Mounika sss");
       }
    
       closeBtnHandler = () => {
        this.setState({
            modal:false,
        })
    }


    render(){
        const { classes } = this.props;
        const Table = (<div style={{width:'90%',margin:'70px auto'}}>
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
                        Header: 'Options',
                        width: 200,
                        style: {
                          cursor: 'pointer',
                          /* fontSize: 15, 
                          padding: "10", */
                          textAlign: "center"
                        },
                         Cell: props => <div><Button onClick={()=>this.editReaderBtnHandler(props.value,this.state.data)} 
                         color="default" className={classes.button}>Edit</Button>
                         <Button color="default" className={classes.button}>Delete</Button></div>
                    },
                ]}
                className="-striped -highlight"
                showPagination={true}
                defaultPageSize={10}
                minRows={5}
                onFetchData={this.makeData}
                />
        </div>);
        return(
            <div>
                {this.state.modal ? (<EditReader modal={this.state.modal} 
                closeBtnHandler={this.closeBtnHandler}
                rowId={this.state.datarow}/>) :Table}
            </div>
        ) 

    }
}

ReaderList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(ReaderList);