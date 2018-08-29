import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as AWS from 'aws-sdk';
import {CognitoUserPool,CognitoUserAttribute,} from "amazon-cognito-identity-js";
import appConfig from "../../config.js";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Modal from '../../components/UI/Modal/Modal';
import EditLibrarianForm from './EditLibrarianForm';

const userPool = new CognitoUserPool({
    UserPoolId: appConfig.LibPoolId,
    ClientId: appConfig.LibClientId,
  });

class LibrarianList extends Component{
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
        LibrarianList: [],
        modal: false,
        openDeleteConfirmation:false,
        row:{}, 
        openEditForm:false, 
        ExistingLibrarianInfo:[]      
    }

    componentDidMount(){
        var cognitoUser = userPool.getCurrentUser();
               
	
	// if (cognitoUser != null) {
    //     cognitoUser.getSession(function(err, result) {
    //         if (result) {
    //             console.log('You are now logged in.');

    //             // Add the User's Id Token to the Cognito credentials login map.
    //             AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //                 IdentityPoolId: 'us-east-2:81073ee5-eca0-499a-a0ea-8edab1debd6b',
    //                 Logins: {
    //                     'cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y': result.getIdToken().getJwtToken()
    //                 }
    //             });
    //         }
    //     });
    // }

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-2:81073ee5-eca0-499a-a0ea-8edab1debd6b',
        Logins: {
<<<<<<< HEAD
            'cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y':"eyJraWQiOiJPZCtrcitlVFMwckRcL2pneTNJXC8zOWhpejkwdCtQZGVFSlVqKzNrUmQ0VWs9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfU0YyRENQTzVZIiwiY29nbml0bzp1c2VybmFtZSI6InNhaSIsImF1ZCI6IjYxN2prbmE5cHFlZzhybWd0Zzl1djRlNmo0IiwiZXZlbnRfaWQiOiI2ODIwM2E2NS1hYjYxLTExZTgtOGIyNS1mMzg1MDgzZmU4OTYiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUzNTUyOTU0OCwibmFtZSI6InNhaSIsImV4cCI6MTUzNTUzMzE0OCwiaWF0IjoxNTM1NTI5NTQ4LCJmYW1pbHlfbmFtZSI6ImtzIiwiZW1haWwiOiJTS3Jpc2huYXNldHR5QHNjdS5lZHUifQ.NOy4rgT5n3tv_9_Z_3RT04ZE7FEEj8ZnKenrs80wxU5a6H_wr50Lec_VrOwxv63mA6nIWy8g7scrg9xvATGhSViwbo14Ke6cle3nAj7mNgBverF32fRObR0WfF8BA6Uvojai6blk5oxnyQgpjrtpMPv4BFVWxbKzKXFHMoXaNW57Jg2jalVYcsIaabmG1DkrDsJzDdxiVBgQvfMgtSz4XBBC5jqLUzeaNiJ5NJOICQnF54kVX7vkcb8njxcH1ApYSi8ELYUUBUfk8v12EA_96B5aGfcS0Hqxa3e8Fw2wumZLKU1J_H6AdCgNsELYajNo7AYSjvtmxqa49RpihD0Y2g",
=======
            'cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y': "eyJraWQiOiJPZCtrcitlVFMwckRcL2pneTNJXC8zOWhpejkwdCtQZGVFSlVqKzNrUmQ0VWs9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfU0YyRENQTzVZIiwiY29nbml0bzp1c2VybmFtZSI6InNhaSIsImF1ZCI6IjYxN2prbmE5cHFlZzhybWd0Zzl1djRlNmo0IiwiZXZlbnRfaWQiOiI1YjBlNzUxZi1hYmUzLTExZTgtYTBiMi1mMTk3Y2JiNDRjOTUiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUzNTU4NTM2MSwibmFtZSI6InNhaSIsImV4cCI6MTUzNTU4ODk2MSwiaWF0IjoxNTM1NTg1MzYxLCJmYW1pbHlfbmFtZSI6ImtzIiwiZW1haWwiOiJTS3Jpc2huYXNldHR5QHNjdS5lZHUifQ.YPMDK7L7xdGrIc_at-zBMrmKYuH0zvL10v-FTT3v01V3apHXl8CwosvsjSUY1Lw5hDmXmffXPjP7JqxmMZFgT3ouquxbOUU86W4IKt0iG0zTwHryMzvwyBZtZaSz4ripOiOmGxqfvbDaDW3iKdBjVHxCle8nE2zFWJcNTewJ_WHoGc8E0fdLCtRwL4bwhg_nMS3gDQxaWYjUqBcMCPdrKtPd0tFFvYVcetZexBfbY9luhSrv2RaFBEZgHB5pSvkgRUpbr7zal_4jBeP3AscjUGpvborejtDXhKlA3OZRojhhulTz0GeO773p7mMk0SLaiRVeHh9elWoGYaAtVSOOlQ"
>>>>>>> 3b1ca0f9bf6f332faa91b3fbec301ca23abecc12
        }
    });
	
	AWS.config.region = 'us-east-2';
	
	AWS.config.credentials.refresh((error) => {
        if (error) {
            console.error("",error);
        } else {
            console.log('Successfully logged!');
        }
        });

	var cognitoidentity = new AWS.CognitoIdentity();
	
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    var params = {
		
		"Filter": "",
		Limit: 59,
		UserPoolId: appConfig.LibPoolId,
	};
    let LibrarianList =[];
	cognitoidentityserviceprovider.listUsers(params, function(err, data) {
		if (err){console.log(err, err.stack)}  // an error occurred
		else 
		{            
			for (var user in data.Users){                
                var username = data.Users[user].Username;
                var library = data.Users[user].Attributes.length > 2? data.Users[user].Attributes[2].Value:'';                             
                var name = data.Users[user].Attributes.length > 3? data.Users[user].Attributes[3].Value:''; 
                var barcode = data.Users[user].Attributes.length > 4? data.Users[user].Attributes[4].Value:'';                           
                var family_name = data.Users[user].Attributes.length > 5 ?data.Users[user].Attributes[5].Value:'';
                var email=data.Users[user].Attributes.length > 6 ?data.Users[user].Attributes[6].Value:'';
                
                var LibrarianInfo={
                    name: name,
                    family_name: family_name,
                    email: email,
                    username:username,
                    library:library,
                    barcode:barcode,                                                        
                }                 
                LibrarianList.push(LibrarianInfo); 
                       
            }                      
            this.setState({LibrarianList:LibrarianList})             
		}
    }.bind(this));       
}

handleDeleteBtn =(row) =>{    
    this.setState({openDeleteConfirmation: true, row:row})       
}

handleEditBtn = (row) =>{
    	
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    var username = row.original.username;
    var params = {           
        "Filter": `username = \"${username}\"`,
        // "Filter": "username = \"saishreeks\"",
		Limit: 59,
		UserPoolId: appConfig.LibPoolId,
    };
        
    let LibrarianList =[];
    cognitoidentityserviceprovider.listUsers(params, function(err, data) {
		if (err){console.log(err, err.stack)}  // an error occurred
		else 
		{                           
            var username = data.Users[0].Username;            
            var library = data.Users[0].Attributes.length > 2? data.Users[0].Attributes[2].Value:'';  
            var name = data.Users[0].Attributes.length > 3? data.Users[0].Attributes[3].Value:''; 
            var barcode = data.Users[0].Attributes.length > 4? data.Users[0].Attributes[4].Value:''; 
            var family_name = data.Users[0].Attributes.length > 5 ?data.Users[0].Attributes[5].Value:'';
            var email=data.Users[0].Attributes.length > 6 ?data.Users[0].Attributes[6].Value:'';

            var ExistingLibrarianInfo={
                        name: name,
                        family_name: family_name,
                        email: email,
                        username:username,
                        library:library,
                        barcode:barcode,                                                        
                    }  
                    
                    this.setState({openEditForm:true, ExistingLibrarianInfo:ExistingLibrarianInfo})
                    
		}
    }.bind(this));  
}

handleEditFormClose =() =>{
    this.setState({openEditForm:false})
}

handleCancel=()=>{
    this.setState({openDeleteConfirmation: false})
}
handleOk=()=>{         
let username= this.state.row.original.username;
    let params = {
        UserPoolId: appConfig.LibPoolId,
        Username: username
      };
      let cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
      cognitoidentityserviceprovider.adminDeleteUser(params, function(err, data) {
        if (err){        	
        	 alert(err, err.stack); }
        else {                            
            const deletedLibrarianList = this.state.LibrarianList.filter((librarian) => librarian.username !== username);            
            this.setState({LibrarianList:deletedLibrarianList, openDeleteConfirmation: false})
             };    
      }.bind(this));                           
}
    
    render(){
        const data = this.state.LibrarianList;

        return(
            <div style={{width:'90%',margin:'70px auto'}}>
            {data && 
            <ReactTable 
            data={data}
            columns={[
                {Header: 'First Name',
                accessor: 'name'}, //accessor should mathc the object property name

                {Header: 'Last Name',
                accessor: 'family_name'},

                {Header: 'Email ',
                accessor: 'email'}, 
                
                {Header: 'Username ',
                accessor: 'username'},
                
                {Header: 'Library ',
                accessor: 'library'},  

                {Header: 'Barcode ',
                accessor: 'barcode'},
                
                {
                    header: '',
                    id: 'click-me-button',
                    Cell: row => (
                    <div>
                        <DeleteIcon onClick={() => this.handleDeleteBtn(row)}/> 
                    </div>
                )
                  },
                  {
                    header: '',
                    id: 'click-me-button',
                    Cell: row => (
                    <div>
                        <EditIcon onClick={() => this.handleEditBtn(row)}/> 
                    </div>
                )
                  }
            ]} className="-striped -highlight"
            showPagination={true}
            defaultPageSize={10}
            minRows={5}/>}

            <Dialog
            disableBackdropClick
            open={this.state.openDeleteConfirmation}
            // onClose={this.handleClose}
            aria-labelledby="confirmation-dialog-title"            
            >
            <DialogTitle id="confirmation-dialog-title">Delete Confirmation</DialogTitle>
            <DialogContent>
                Are you sure you want to delete the user
            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
                Cancel
            </Button>
            <Button onClick={this.handleOk} color="primary">
                Ok
            </Button>
            </DialogActions>
            </Dialog>     
            <Modal show = {this.state.openEditForm} 
            modalClosed ={this.handleEditFormClose}>
            {this.state.openEditForm && <EditLibrarianForm librarianInfo={this.state.ExistingLibrarianInfo}/>}
            </Modal>          
            </div>
        )
         
    }
}

export default LibrarianList;