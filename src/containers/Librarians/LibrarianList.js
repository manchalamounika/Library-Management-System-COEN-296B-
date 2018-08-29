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
        // var cognitoUser = userPool.getCurrentUser();
        
        var cognitoUser= {
            "idToken": {
              "jwtToken": "eyJraWQiOiJPZCtrcitlVFMwckRcL2pneTNJXC8zOWhpejkwdCtQZGVFSlVqKzNrUmQ0VWs9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfU0YyRENQTzVZIiwiY29nbml0bzp1c2VybmFtZSI6InNhaSIsImF1ZCI6IjYxN2prbmE5cHFlZzhybWd0Zzl1djRlNmo0IiwiZXZlbnRfaWQiOiJjZTgyYjE1Ny1hYmQ3LTExZTgtYTBiMi1mMTk3Y2JiNDRjOTUiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUzNTU4MDQwMCwibmFtZSI6InNhaSIsImV4cCI6MTUzNTU4NDAwMCwiaWF0IjoxNTM1NTgwNDAwLCJmYW1pbHlfbmFtZSI6ImtzIiwiZW1haWwiOiJTS3Jpc2huYXNldHR5QHNjdS5lZHUifQ.G04JzkXy3-KALKXDfrd9a8Thf6Hp8CFYZ7i2gMVLXn4tAkytfFGV-d0B6aefAo37uDTqOa8ZNvtiLkb8cwdYQLCIYpOEoqyPtN8TZKke7-tD1bmpQL2XPD8_saEv8v_W4SEpps25TiRxt9PwkbUL6c9zbPkBTmhq6U-SaCmzSVi0IGag5Hw3QL1EHgOZ4ekUoDNw3D3Vrqb3_i7dH_KBaavCTErqnUFF1eQApLLIVYMoi0o_mZdHOa1cYUmfAqNq-6ErsnPSaFCJXuL7kBZfh_VoyOdzYIjpU5EW8mi4U9SzPaZFb0YZDbT6v3TaKfZtO9atSlfLZNxu40PrPpgutg",
              "payload": {
                "sub": "c27a05a2-4ce1-4173-be51-9bbc3fe65a0a",
                "email_verified": true,
                "iss": "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y",
                "cognito:username": "sai",
                "aud": "617jkna9pqeg8rmgtg9uv4e6j4",
                "event_id": "ce82b157-abd7-11e8-a0b2-f197cbb44c95",
                "token_use": "id",
                "auth_time": 1535580400,
                "name": "sai",
                "exp": 1535584000,
                "iat": 1535580400,
                "family_name": "ks",
                "email": "SKrishnasetty@scu.edu"
              }
            },
            "refreshToken": {
              "token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.ZYXIsODCiBWXoUC_btyL2oMyN-DnDP-R-PZreedHPfPwH94LFd1eClVvTNThdvomrCZbNvAoBtDXta8G9xck7nWJ1EQMRxZWAcKwCbTsvQ9wgN0ysmUUou1KIcD6yYZW8jKAo5ru19AX06nRVKJJ29Qc7SE2VQL30o8lxt8ClL4YJjNCzroIPfJprl41BxCwWPE_jfCitsdMVm0BEnI6qpVR6tfpiwNi6mNk9l7i5iY7AQAagTcHVcl4DioJX84NwRkFbelyBINvGXCsAYRltCvnjxoa8IAPli0ZtTg-vCzYWa01ljlQ_AgRb-F1cL0iCNs3Tw6jiJE9UQAjGCYN0A.7bvn9Dcte75u7c4L.7bsgIwWVXMa0hagPk-6IEtEP6700VeW6cVhDqzaJcCKhpdbozofoCUayihRkhptKDm0fMdQGMd5QWhhKqHE4ENOCBBsykdiVm3xUynVhVPn4Y_dXuBuXKXaoKUsGkSEwWRBG0vfRwnuVmL4JGvmH_XcqdlaoRgHSIv7ofiAluoTuGKx9iVnBTKz5zMoGmmUVj1Je44_1Dj0gUv0YQykBWysZrb-wSXWeVHJLrJLMfkjIW32MtqMhS3e0ePDb8xie8kBmYB8CUmTKCQWio3Telfk8j-WaE4IVFLPyLiBUY7376IoJtUravm0TG4pAuKifXMA5b-ambj7B9favWB5U9v4oY-V2UV-9hpqs7MjfVdNI4HVokjhVuw9ungpGHbKIIBGZapZcr9iGgAJtjr1u7dPaGMFnr0nUgmd33X_7Ooeh73bBa-7xEhqKrfxYsmR8I8u5mfxsBZIdLxZm2KjQhqCoVFCCt6RE2hJcJlf_llbCc129-sUVuc4L7pIrJg1pPs5O_rxGGd33Q_pj8O9bT0eZqoz4DIYuqASko5VUUEs2i34GcnmzFQIp1XyZCJLliwD23uBAq6mm76xbpnm2r8DinWShRzKv8h-0NQZsXuHjgIxavURWyQCJFlc6TBDTIYnTckn792QvF6LzYLu4VYfY5_8lQoR_6SAcvEjnOPAPfVilZd9YZ5CUXwTofLyAj1E3Ow7YfpIDNnNv4yYjDg4qA5qgRSGxfuiVOyu2o8x-CJe4xr45DAAV4pTD6w-IkxhyJYlcyA00ez9jBMz7OamTouVmYzB7rOb3ttfTJDAWE9RnFSkteYqvQPl12WIkfPN4jXBR3k8wDNgX1flKgOw8SMf_sSgAHRxI1pMb1USedyPd0hPOcnSBwZWekHAKkvBE89DORQRIO8ZFoqls0lZ4CEK6cWWyzslUBN-Vk-9eM4EmjK5acAUYnzJy9BDpOUbxEgcbdz9FijmvPKXvv3t51M-rBYdciFU3P-w_OLpiyE6RBMbPWMfKGcA2BlysGT1czGyVfEWWvqWn-t5v6UsdXZHc-5rEVYDnwXq9xfPGdmINUBsFeNhpx1gUElVBTrJHkYluNNq_UNJPo9BZsu-iG6ZNOv4oFXO6md--jAvzKdVnqX171FjjIi2CQX7-v41AE5qLuDaZ8mEmep_CnKUtkA3xzgpTT6ypeyzLKlh5Ax9OfXluLNUKaSKKd59tAZVWGCiuzh6NU1ZdG31x8pWCwPJskZB4-aH8EVMGB1OOaOS-UHgW0TfpYpcP-LQ.U09yFW4Pw9NFTtkQp5wfeA"
            },
            "accessToken": {
              "jwtToken": "eyJraWQiOiJNXC95a3pNTkg1RVhcL2g3dCtnZWY4Q3BqREpBZFBPRXo5azFsbWJrd2NYTW89IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJldmVudF9pZCI6ImNlODJiMTU3LWFiZDctMTFlOC1hMGIyLWYxOTdjYmI0NGM5NSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1MzU1ODA0MDAsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1NGMkRDUE81WSIsImV4cCI6MTUzNTU4NDAwMCwiaWF0IjoxNTM1NTgwNDAwLCJqdGkiOiJkNDkyMDhlNy1lNjE5LTQwYzctYTBiNC1iYjNjOTYwN2VmZmEiLCJjbGllbnRfaWQiOiI2MTdqa25hOXBxZWc4cm1ndGc5dXY0ZTZqNCIsInVzZXJuYW1lIjoic2FpIn0.L3r62Fqj35pFgTPZk98KsC8EKtP7pPA-eD124Vy81yyQ9GQzz8PYRf-eyLtkin40MTJeXLH9iAMZAaUQBoNMLYo7IqHnEVYuyLlJKp2NZl8_3QSznAAHH9L9lxN4OkZYyiV9nfGeS7RedeqVvQI2Y9uBQdCsJgSz9uwH816B0xHpx0DeYzCxZ7JR13UlvwOK7wadzED6VEbbaCZGQSspPiIPmDUqVCnV-EQi8D0TbQqeDQVjGkKXmvI6fzK-rJM3JddbC9I5JSAW37BfYf-I7omW3iKyN0If2HeUMx-CTI61go_z1NElg_lwK2-Rg4A1Aa9RHt2I9ZV8hat5z4SAJw",
              "payload": {
                "sub": "c27a05a2-4ce1-4173-be51-9bbc3fe65a0a",
                "event_id": "ce82b157-abd7-11e8-a0b2-f197cbb44c95",
                "token_use": "access",
                "scope": "aws.cognito.signin.user.admin",
                "auth_time": 1535580400,
                "iss": "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y",
                "exp": 1535584000,
                "iat": 1535580400,
                "jti": "d49208e7-e619-40c7-a0b4-bb3c9607effa",
                "client_id": "617jkna9pqeg8rmgtg9uv4e6j4",
                "username": "sai"
              }
            },
            "clockDrift": 0
          }
	
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
            'cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y': "eyJraWQiOiJPZCtrcitlVFMwckRcL2pneTNJXC8zOWhpejkwdCtQZGVFSlVqKzNrUmQ0VWs9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfU0YyRENQTzVZIiwiY29nbml0bzp1c2VybmFtZSI6InNhaSIsImF1ZCI6IjYxN2prbmE5cHFlZzhybWd0Zzl1djRlNmo0IiwiZXZlbnRfaWQiOiJjZTgyYjE1Ny1hYmQ3LTExZTgtYTBiMi1mMTk3Y2JiNDRjOTUiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUzNTU4MDQwMCwibmFtZSI6InNhaSIsImV4cCI6MTUzNTU4NDAwMCwiaWF0IjoxNTM1NTgwNDAwLCJmYW1pbHlfbmFtZSI6ImtzIiwiZW1haWwiOiJTS3Jpc2huYXNldHR5QHNjdS5lZHUifQ.G04JzkXy3-KALKXDfrd9a8Thf6Hp8CFYZ7i2gMVLXn4tAkytfFGV-d0B6aefAo37uDTqOa8ZNvtiLkb8cwdYQLCIYpOEoqyPtN8TZKke7-tD1bmpQL2XPD8_saEv8v_W4SEpps25TiRxt9PwkbUL6c9zbPkBTmhq6U-SaCmzSVi0IGag5Hw3QL1EHgOZ4ekUoDNw3D3Vrqb3_i7dH_KBaavCTErqnUFF1eQApLLIVYMoi0o_mZdHOa1cYUmfAqNq-6ErsnPSaFCJXuL7kBZfh_VoyOdzYIjpU5EW8mi4U9SzPaZFb0YZDbT6v3TaKfZtO9atSlfLZNxu40PrPpgutg",
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