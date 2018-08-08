import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddReader from './AddReader'
import TableView from '../TableView'
class Index extends Component {
    
        reader_data = [{
            "reader_first_name": "ReaderFirstName",
            "reader_last_name": "ReaderLastName",
            "reader_middle_name": "ReaderMiddleName",
            "reader_barcode": "1233",
            "library_name": "LibraryName",
            "checkouts": "2"
          },{
            "reader_first_name": "ReaderFirstName",
            "reader_last_name": "ReaderLastName",
            "reader_middle_name": "ReaderMiddleName",
            "reader_barcode": "1233",
            "library_name": "LibraryName",
            "checkouts": "2"
        },{
            "reader_first_name": "ReaderFirstName",
            "reader_last_name": "ReaderLastName",
            "reader_middle_name": "ReaderMiddleName",
            "reader_barcode": "1233",
            "library_name": "LibraryName",
            "checkouts": "2"
          },{
            "reader_first_name": "ReaderFirstName",
            "reader_last_name": "ReaderLastName",
            "reader_middle_name": "ReaderMiddleName",
            "reader_barcode": "1233",
            "library_name": "LibraryName",
            "checkouts": "2"
        },{
            "reader_first_name": "ReaderFirstName",
            "reader_last_name": "ReaderLastName",
            "reader_middle_name": "ReaderMiddleName",
            "reader_barcode": "1233",
            "library_name": "LibraryName",
            "checkouts": "2"
          },{
            "reader_first_name": "ReaderFirstName",
            "reader_last_name": "ReaderLastName",
            "reader_middle_name": "ReaderMiddleName",
            "reader_barcode": "1233",
            "library_name": "LibraryName",
            "checkouts": "2"
        }]
    

    render() {               
        return(
            <div>
                <h1>Readers Page</h1>
                <button class="btn btn-primary btn-lg" href="/readers/add" onClick={this.props.AddReaderClick}> ADD</button>
                
               <TableView data = {this.reader_data}/>
               

            </div>
       
		)
	}
}
export default Index;