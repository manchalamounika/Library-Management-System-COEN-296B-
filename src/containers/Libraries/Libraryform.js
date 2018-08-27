import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import {Route} from 'react-router-dom';
import classes from './Libraryform.css';
import axios from '../../axios-global';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Modal from '../../components/UI/Modal/Modal';
class Libraryform extends Component {
    state = {
        libraryform:{ 
            libraryname :{
            elementType : 'input',
            elementConfig :{
                type : 'text',
                placeholder : 'Library name'
            },
            value : ''
        },
        libraryvillage :{
            elementType : 'input',
            elementConfig :{
                type : 'text',
                placeholder : 'Library village'
            },
            value : ''
        },
        librarycountry :{
            elementType : 'input',
            elementConfig :{
                type : 'text',
                placeholder : 'Library country'
            },
            value : ''
        },   
        },    
        loading:false,
        purchasing :false
    }

    addLibraryHandler = (event) =>{
        event.preventDefault();
        this.setState({loading :true});
        const formdata = {};
        for (let formElementIdentifier in this.state.libraryform){
            formdata[formElementIdentifier]=this.state.libraryform[formElementIdentifier].value;
        }
        console.log(formdata);
        const addLibrary = formdata;
        axios.post('/libraries.json ',addLibrary)
             .then(response => {
                 this.setState({loading:false});
                 this.props.history.push('/libraries');
             })
             .catch(error =>{
                 this.setState({loading:false});
             });

    }

    inputChangedHandler=(event,inputIdentifier) =>{
        const updatedLibForm={
            ...this.state.libraryform
        };
        console.log(updatedLibForm);
        const updatedLibElement ={
            ...updatedLibForm[inputIdentifier]
        };
        console.log(updatedLibElement);
        updatedLibElement.value = event.target.value;
        updatedLibForm[inputIdentifier] = updatedLibElement;
        this.setState({libraryform:updatedLibForm});
    }
    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    render(){
        
        const formElementsArray=[];
        for(let key in this.state.libraryform){
            formElementsArray.push({
                id : key,
                config :this.state.libraryform[key] 
            });
        }

        let form=(
            <form onSubmit = {this.addLibraryHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig ={formElement.config.elementConfig}
                    changed = {(event) => this.inputChangedHandler(event,formElement.id)}
                    value ={formElement.config.value}/>
                ))}
                <button onClick={this.addLibraryHandler}>SAVE</button>
            </form>

        );
        if(this.state.loading){
            form = <Spinner/>
        }
        return(
            <div className = {classes.Libraryform}>
                <Modal show={false} modalClosed={this.purchaseCancelHandler}>>
                <h4>Enter Library details</h4>
                {form}
                </Modal>
                
            </div>
        );
    }
}

export default withErrorHandler(Libraryform,axios);