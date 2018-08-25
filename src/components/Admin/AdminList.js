import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import * as AWS from 'aws-sdk';
import DeleteIcon from '@material-ui/icons/Delete';
import appConfig from "../../config.js";
import  MyTrComponent from './MyTrComponent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';



class AdminList extends Component{
   
    state={
        adminList: [],
        openDeleteConfirmation:false,
        row:{},

    }

    componentDidMount(){
        // var cognitoUser = userPool.getCurrentUser();
        var cognitoUser= {
            "idToken": {
              "jwtToken": "eyJraWQiOiJPZCtrcitlVFMwckRcL2pneTNJXC8zOWhpejkwdCtQZGVFSlVqKzNrUmQ0VWs9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfU0YyRENQTzVZIiwiY29nbml0bzp1c2VybmFtZSI6InNhaSIsImF1ZCI6IjYxN2prbmE5cHFlZzhybWd0Zzl1djRlNmo0IiwiZXZlbnRfaWQiOiI0OTZiMTRmYi1hOGEzLTExZTgtOTRhYy03NThjODFmYjlmZjkiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUzNTIyNzk5MCwibmFtZSI6InNhaSIsImV4cCI6MTUzNTIzMTU5MCwiaWF0IjoxNTM1MjI3OTkwLCJmYW1pbHlfbmFtZSI6ImtzIiwiZW1haWwiOiJTS3Jpc2huYXNldHR5QHNjdS5lZHUifQ.LstbZ0B7sqyhM61-bTqxL0e6lEKl0B-5orC_BNdCdf83fXqTvCrKYdQKNJIVtEiAHA5osw5ZQe_g0Ured-9PonvMSHBHbUB9o5mMiVDPN3r8CEsPe6SKEobAi4nLBVv0Tw2K9qz2L2_5B_Pr4ODTmX6Ioi-bhcWncz5nJWDzECNfXCnxj8Ee1aLsPKILnNlUk9vb5HRI1dZFzhYEDHcvDrih-QKPtM35mxKHv-iZ9tPOTrZcf6jYOTOh3d2AqjgDInYD_1iMJxQ50EypihROcM5z-27PKzHA2MlwZ6fa0A9jVFO1Q2PHokQQQ_9vYxo3W0mlW9fh8UMc3vFQcjkKGg",
              "payload": {
                "sub": "c27a05a2-4ce1-4173-be51-9bbc3fe65a0a",
                "email_verified": true,
                "iss": "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y",
                "cognito:username": "sai",
                "aud": "617jkna9pqeg8rmgtg9uv4e6j4",
                "event_id": "496b14fb-a8a3-11e8-94ac-758c81fb9ff9",
                "token_use": "id",
                "auth_time": 1535227990,
                "name": "sai",
                "exp": 1535231590,
                "iat": 1535227990,
                "family_name": "ks",
                "email": "SKrishnasetty@scu.edu"
              }
            },
            "refreshToken": {
              "token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.p_wjatp2_rleqe2PwXht3RRFF8Zc_UNJuU_8hrRBU93xN-ngiIiCXT8yQs0Ot8yz3DnsXUkwX8UTM0ixhHesXeOdKkoN3Kw2XrhJ86ZzV8aqUNMjY00TEOOEJBHiReh6D86nmQOqDBPywHvtvtrdFKCYDqmLcWp8KeWwXczSdAbm-FL7bSlg2-esPSHUcVAIZAIwJWdJeMfzztxbSyBIVL4Sg1a9qT4zplZwLpv50jPKRPG5wy2PW4gc-PI3qdhnlDXktLfDHsjH0oKZ59im0cwxN6jjmymoR4KgQijlp5bPza7xaGiUzgFWOob02jJVX_uC3KoOZJ2Y0fWtkFJNCA.euon3MzWBE1FjKii.OdZ6SzscEjJmg8LbxsguA_-dYfD8jBiYrvYAmWCAVVyS2OddWLXe_bUYJnOVRv0TF9SMLpjw-1QNL2_cCOl2pZARW0V3V3qhOd5Y20Ds6MbiGXWPWDPc-Lb4rwh3i1koxfkOo7Rj0xO9lJv2C5EgvXEMkR5JuB9FHM6penWyQQVOBJpC9jI1IaHDfWDY0eWo-NTP7fgVDG2HN2a6xUBrvCnaZhhHop29QecrFtRFpN-NdkB0dZq3nvTjZc5JsUVk29kDOQ3UHHiOXZKndPPx9W7anP3MaGp6OMubPdNUr7rzyPI5xzEfZCrsvl-h5LB8TmvuE-kZ5DLGUgkughNf4Wswey7njZltKPehmldazPpq-5FskNr1AaCRa3I9PiOR_16JP1jvSnf74AkpkazgYo4hk77_YXz02dnDEN1bohCC6ciHYotN6EpKY5_MsbJILbF1YMGbm6tnr6vN3aDJpzHoVMyi77RNitL9LNxhIwi0dDvq1AW4rle8MKaRP7cpqOYEveI4KtolgYNCcrsiMKAqDTTLvZNKWLZCDhVr4hwLG2swy7tmKsRHFGZvQZnCIZnTtCyFSjPW-jdfj2cqVZw9_YSD85awwNRGTcki3tJuWS42EZjt4-ZcRtXebbp-La2KTt_gCibq3HN6WnZwbDSEylK1RUrMt2DLxJc0XWWMOgJfP6S1GTCpjzofmA4zSfOlTxLx-xUvBD3YMxxN38mLtVb2MuehiX0Yxs020Oj1Vg6FUKDwhxYcel1h358OT4lva_CqV7nQajRHO0eh4LFb-slwXKBnQAvuzoQZRZjnTkGz2W8bia59qclM3noJMWC0_nPV5oGkaJNt6q3BBgRm2E52ojjpVE94EF2KvzHqHPLnqTw5DDP0ARVyNk6L2HZgEBwg-kwPW0O-GqVbLInm_dCDmYuMMtreYK1ntL9G7in4FKpJWVPf65i_kWxwwgyDEsjanBFAMJKboGQWYimDOPeNWyggQVeotJwUEiflkMXlC45vUxPO_La6DFoZ3_L3s6o8pB2l7yUj62uDdSj3hq6zRaqYRaR_H3itygY3RCaE_M38sCxz1r2OmEwwAcYcfiM7g8KBBWEb4cZ99giNch6RXyGxJZA_55E1rp-_WgZBasJ3Fm0Lc9ub02HaatWkajhB4VFM2DHW6GdKNbQAM-Pf7Crna3081L7-Ij4GS2bsQHjfG7AAXTBzG6bkzEDPGstwTjNaOdROcp-gL5RtMw5umHqfIoIqOGeyNuTGDooKWU7nJttA2p3ygFE.TbVRfL5Be8D4Bjy5dJolkg"
            },
            "accessToken": {
              "jwtToken": "eyJraWQiOiJNXC95a3pNTkg1RVhcL2g3dCtnZWY4Q3BqREpBZFBPRXo5azFsbWJrd2NYTW89IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJldmVudF9pZCI6IjQ5NmIxNGZiLWE4YTMtMTFlOC05NGFjLTc1OGM4MWZiOWZmOSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1MzUyMjc5OTAsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1NGMkRDUE81WSIsImV4cCI6MTUzNTIzMTU5MCwiaWF0IjoxNTM1MjI3OTkwLCJqdGkiOiI5MGEwZjZkOS04ODU4LTRiMDYtOTdmNi0wNGQ3NmU2MjczOWYiLCJjbGllbnRfaWQiOiI2MTdqa25hOXBxZWc4cm1ndGc5dXY0ZTZqNCIsInVzZXJuYW1lIjoic2FpIn0.s-eCBYpiUE6vtxUxcqQILwQ9pbRAfut57uLCbApr6v5TbuCecxRz8tPk_fP6Fqvs6xlKoovL9L3iH5r-UsOPPXzR5kSYCstejWPB4Z8QsRiSvoKgtyXXIRCnbwra1toPEwQJZCt-pTYZ-JiQYV6xSVXru4qc7dT08ovRyhXgyKU9Kct_7AEIMk25Nxh0yL224gJ9Gf6VBg1VWDqoY_b-nMvqT7Dg6BUdt36a5BQ6g9cK7SANAV9EV6KW3UjJdG1zqfHbLk3-ILVDMNpCsPdMceVKejR_7CvsR75WgtREZWgCx1bJLV_bSJmWxuVSAYLzrvobyxx0pqpyAG8a3ZVz5w",
              "payload": {
                "sub": "c27a05a2-4ce1-4173-be51-9bbc3fe65a0a",
                "event_id": "496b14fb-a8a3-11e8-94ac-758c81fb9ff9",
                "token_use": "access",
                "scope": "aws.cognito.signin.user.admin",
                "auth_time": 1535227990,
                "iss": "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y",
                "exp": 1535231590,
                "iat": 1535227990,
                "jti": "90a0f6d9-8858-4b06-97f6-04d76e62739f",
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
            'cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y':  "eyJraWQiOiJPZCtrcitlVFMwckRcL2pneTNJXC8zOWhpejkwdCtQZGVFSlVqKzNrUmQ0VWs9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfU0YyRENQTzVZIiwiY29nbml0bzp1c2VybmFtZSI6InNhaSIsImF1ZCI6IjYxN2prbmE5cHFlZzhybWd0Zzl1djRlNmo0IiwiZXZlbnRfaWQiOiI0OTZiMTRmYi1hOGEzLTExZTgtOTRhYy03NThjODFmYjlmZjkiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUzNTIyNzk5MCwibmFtZSI6InNhaSIsImV4cCI6MTUzNTIzMTU5MCwiaWF0IjoxNTM1MjI3OTkwLCJmYW1pbHlfbmFtZSI6ImtzIiwiZW1haWwiOiJTS3Jpc2huYXNldHR5QHNjdS5lZHUifQ.LstbZ0B7sqyhM61-bTqxL0e6lEKl0B-5orC_BNdCdf83fXqTvCrKYdQKNJIVtEiAHA5osw5ZQe_g0Ured-9PonvMSHBHbUB9o5mMiVDPN3r8CEsPe6SKEobAi4nLBVv0Tw2K9qz2L2_5B_Pr4ODTmX6Ioi-bhcWncz5nJWDzECNfXCnxj8Ee1aLsPKILnNlUk9vb5HRI1dZFzhYEDHcvDrih-QKPtM35mxKHv-iZ9tPOTrZcf6jYOTOh3d2AqjgDInYD_1iMJxQ50EypihROcM5z-27PKzHA2MlwZ6fa0A9jVFO1Q2PHokQQQ_9vYxo3W0mlW9fh8UMc3vFQcjkKGg",
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
	
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	var params = {
		UserPoolId: 'us-east-2_SF2DCPO5Y',
		AttributesToGet: [
        'email',   
        'name',     
        'family_name',        
		],
		Limit: 60,
    };

    let adminList =[];
	cognitoidentityserviceprovider.listUsers(params, function(err, data) {
		if (err){console.log(err, err.stack)}  // an error occurred
		else 
		{            
            data.Users.filter((user) => {
                if(user.UserStatus !== 'UNCONFIRMED'){                    
                    var username = user.Username;
                var name = user.Attributes.length > 0? user.Attributes[0].Value:'';                             
                var family_name = user.Attributes.length > 1 ?user.Attributes[1].Value:'';
                var email=user.Attributes.length > 2 ?user.Attributes[2].Value:'';
                
                var adminInfo={
                    name: name,
                    family_name: family_name,
                    email: email,  
                    username:username,                                  
                }   
                adminList.push(adminInfo);     
                }
            })            
			// for (var user in data.Users){                
            //     var username = data.Users[user].Username;
            //     var name = data.Users[user].Attributes.length > 0? data.Users[user].Attributes[0].Value:'';                             
            //     var family_name = data.Users[user].Attributes.length > 1 ?data.Users[user].Attributes[1].Value:'';
            //     var email=data.Users[user].Attributes.length > 2 ?data.Users[user].Attributes[2].Value:'';
                
            //     var adminInfo={
            //         name: name,
            //         family_name: family_name,
            //         email: email,  
            //         username:username,                                  
            //     }   
            //     adminList.push(adminInfo);         
            // }                      
            this.setState({adminList:adminList})             
		}
    }.bind(this));       
}

handleDeleteBtn =(row) =>{    
    this.setState({openDeleteConfirmation: true, row:row})       
}

handleCancel=()=>{
    this.setState({openDeleteConfirmation: false})
}
handleOk=()=>{     
let username= this.state.row.original.username;
    let params = {
        UserPoolId: appConfig.UserPoolId,
        Username: username
      };
      let cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
      cognitoidentityserviceprovider.adminDeleteUser(params, function(err, data) {
        if (err){        	
        	 alert(err, err.stack); }
        else {                            
            const deletedAdminList = this.state.adminList.filter((admin) => admin.username !== username);            
            this.setState({adminList:deletedAdminList, openDeleteConfirmation: false})
             };    
      }.bind(this));                           
}
    
    render(){
        const data = this.state.adminList;

        return(
            <div className='admin-table-container'>
            <div className='admin-table'>
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
                {
                    header: '',
                    id: 'click-me-button',
                    Cell: row => (
                    <div>
                        <DeleteIcon onClick={() => this.handleDeleteBtn(row)}/> 
                    </div>
                )
                  }
            ]}                
             className="-striped -highlight"
            showPagination={true}
            defaultPageSize={10}
            minRows={5}/>}               
            </div>           
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
            </div>
        )
         
    }
}

export default AdminList;