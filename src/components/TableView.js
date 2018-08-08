import React,{Component} from 'react';
class TableView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            jsonData:this.props.data
        }
    }
    componentDidMount(){
        var rows=[];
       
       for(var i=0;i<this.state.jsonData.length;i++){
            
       } 
       console.log(this.state.jsonData)
      // this.setState({jsonData:this.props.jsonData});
    }
    pushData() {
        return this.state.jsonData.map(ele => {
           return( <tr>
            <td>{ele["reader_first_name"]}</td>
             <td>{ele["reader_last_name"]}</td>
            <td>{ele["reader_middle_name"]}</td>
            <td>{ele["reader_barcode"]}</td> 
            </tr>)
                })
    } 
    render(){
        return(
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>MiddleName</th>
                        <th>LibraryName</th>
                    </tr>
                </thead>
                <tbody>
               {this.pushData()}
                </tbody>
            </table>
        );
    }
}
export default TableView;