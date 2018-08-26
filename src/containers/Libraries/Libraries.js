import React, {Component} from 'react';
import Aux from '../../hoc/Auxi';
import LibraryTable from '../../components/LibraryTable/LibraryTable'
import axios from '../../axios-global';
import Spinner from '../../components/UI/Spinner/Spinner';
import Libraryform from './Libraryform';
import {Route} from 'react-router-dom';


class Libraries extends Component{
    state = {
           librarylist :[],
           libraries : {
               libraryname : "bun",
               libraryvillage : "sun",
               librarycountry: "cun"
            },
            loading : true
    }

    componentWillMount(){
        axios.get('/libraries.json')
             .then(response => {
                 console.log(response.data);
                 const printLib = [];
                 for( let key in response.data ){
                        printLib.push({
                            ...response.data[key],
                            id: key
                        });
                 }
                this.setState({loading :false, librarylist :printLib});
             })
             
    } 
 
    onAddLibrary =() =>{
        console.log('add library clciked');
        
    } 

    addLibraryHandler =() => {
        const newlib =  this.state.libraries
        this.onAddLibrary(); 
        axios.post('/libraries.json',newlib)
        .then(response => console.log(response))
       .catch(error => console.log(error));
    }

    render(){
        let library = <Spinner/>
        let showForm = true;
        if(this.state.libraries){
            library = (
                <Aux>
                <div>{this.state.libraries.libraryname}</div>
                </Aux>
                
                );
        } 
        
        return(
        <Aux>  
        <button style = {{backgroundColor:'#f2b632',
         borderRadius :'5px',
         width:'150px',
         height :'30px',
         marginLeft: '30px'}} onClick={this.addLibraryHandler}> Add Library </button>
        <div>
           {console.log(this.state.librarylist)}
           <LibraryTable  rows={this.state.librarylist}/>
        </div> 
        {/* <Libraryform/> */}
        {/* <Route path={this.props.match.path +'/libraryform'}  */}
        <Libraryform library={this.state.libraries}/>
        {/* /> */} 
        </Aux>
        );
    }
}

export default Libraries;  