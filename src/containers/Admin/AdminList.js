import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import * as AWS from 'aws-sdk';
import DeleteIcon from '@material-ui/icons/Delete';
import appConfig from "../../config.js";
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
              "jwtToken": "eyJraWQiOiJPZCtrcitlVFMwckRcL2pneTNJXC8zOWhpejkwdCtQZGVFSlVqKzNrUmQ0VWs9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfU0YyRENQTzVZIiwiY29nbml0bzp1c2VybmFtZSI6InNhaSIsImF1ZCI6IjYxN2prbmE5cHFlZzhybWd0Zzl1djRlNmo0IiwiZXZlbnRfaWQiOiJkNTkzN2Q2My1hYjU2LTExZTgtYjNkNi0xOTQwOTNjMDE4NjIiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUzNTUyNTAwNywibmFtZSI6InNhaSIsImV4cCI6MTUzNTUyODYwNywiaWF0IjoxNTM1NTI1MDA3LCJmYW1pbHlfbmFtZSI6ImtzIiwiZW1haWwiOiJTS3Jpc2huYXNldHR5QHNjdS5lZHUifQ.FRQnlj196C-MYycfMZbwmwmeAU9nQ_gHNpTEYdlfb8tFvLhiqJ-n0lOI7w96ofvilPFrDWmI4XxgHbfzpVp1b2Y4Bmfho0BiMfPhEpIIogh87g1LwJqO8KEW-Uzjv37nDRKzLDxG7dxHKf_3VvwBbhOwYTE7P2yloLfK9LhBkaK9_9nPvjTlwD2AijkpHgV1LPP0gYRthf4G_yLc5koCCMC74LeAadhb13RGbu06C3UEzMegTgIpK0QxwvmrctvWVQTNMKAH76G2cN4WsztTVSm8AM_YdBeYtIsf98OLWqtC9O3VEP-v0dpJdugIlvxkd5mSHjri7ZslJVqENUkP7A",
              "payload": {
                "sub": "c27a05a2-4ce1-4173-be51-9bbc3fe65a0a",
                "email_verified": true,
                "iss": "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y",
                "cognito:username": "sai",
                "aud": "617jkna9pqeg8rmgtg9uv4e6j4",
                "event_id": "d5937d63-ab56-11e8-b3d6-194093c01862",
                "token_use": "id",
                "auth_time": 1535525007,
                "name": "sai",
                "exp": 1535528607,
                "iat": 1535525007,
                "family_name": "ks",
                "email": "SKrishnasetty@scu.edu"
              }
            },
            "refreshToken": {
              "token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.V5ITiWE2S3nAEvdkaUtJaru8B6fkTeYsI9P2QuUz5Rm4Sc_234lWV9n69MJ01oKbl3TXi3JT7GIlCnahY7fsEKEnNg9Y7VWE3bxHmAJ5L98-o-KLnRdgYVsR7Ey0Fn1kb7RRQdZkCdrepTXl0qP1w9FSwUbcc7jJJqq-kLHeTN7fE0WvDIV7rnMJsLfVPucpJAKLWtWKR4kMUSOch4qprQUcP2VqAjJyc9n17VfLhF1O5AgRQK08vJT7VVHK46cceRfF7TYv7tnMjgge_Yc4RwOBAsLGFQPxEk6I7Hzp9j1ArneX_Yz9yPT6vC77PyvxOzpsnHwYXDPfTu28FyMGwg.K--5T9os2Tu9mA3y.HYh_OfmkjxXimNyuitToB4xfVqDDzSIqsgVf7ViHBnHjAQrZ0rLDwuG81GnIEWZkJduZ_r5njTcFY65RshJ0L5ZurZCaf3Nl_8wVGmfYEQqapVMy64IM5s7ODiHgse9HLk-AsywHKGC_41gbrFMagh4Cr1VNRJvrhS-S0VEeqAb6OxDAXfKj7L6pqNcG6JeYkEAQ-0nafuZrTyFFldBCyFCwcXMdt9G1Ai7DwWX1qpByXma89tGTA5BBK6Upt51LbUu9iJ7jrTeuwkMNKftUD6XuwNdEbdsIxVp9iYNcRIwQ5td5MmzHM5Mu0le3Z2EsmHrsR67kqVpUGCBrCUEN4nAhIKi2z4H6ucPIbApgXJqfnbXOENjyLoc4WzRysLiic-cgkGdduyLM8OmPJuz_bdKx9LP3PxCD9_e1fwjcVSjg__8lPcF_3bEPu-1rPx0eVMMUNyDIPcH3Z8lwzJeG5RwaVxqnOB3ZyPwx1i-pCj9_94xO7dViErQVP0qhA381G49SYNOC5yz64PjAJAjReoAaPkRN9nbD00ThB8289qNO5KOstwi-ZoPgiXJpI-sqB3qtdRv2UQiD765deUTJ5A5cP6NGNwUANeGyeqgutulhp3adZ3-BDT7A_DMTZD498UGBXUjh8L0MiTFPzDM_t7QpNi6CHqB3gTESZAJHYtok1GkVSBxrkp4-X14BQCmzJ8MA0G3Oo9BUbkN3cucpkGip1bTYu2-LPRZ3wk5YqE1Zef68kPpgqwdXnhESH04NYTvmelqZAc76mFH_-T0CHrhiG-A6evoBabAXl-mqcfZvfIuMZdbfpw28hHDyHZpMOxgMuhISp2ZHVP0oJeT1GoqO5R9fd4vE_bQH4IivCtgKIp_pY1IHCnajE3_646URG44H9uPr98disJtuoDxc_xPvF24Vmu29SYS0DX63WYLX1t3vAVniOM-RH3HHgARlDTxAr4AHsYwE7dh3xgSc_i9tI_US613upgkcOezq1RSZTx-FADlABMC66RQEQKfsm9OMUopGJiuS1XgzQHPwcgnlGaxFBrhPQnEP5lgEM75Cs7wFqnbT2jU32JLJAyY__h28LJ7mqqlT0sdfO6Z_tYwN9u_8QNnu1ZFqa63Lfgs0zV_hX6fKs_Oo8Nvx2gNdfHHOIgbUVDScG29lHJvn7AhIGg_oD4DiozO-TvctD9XbLLzaqvItfzXltfkWxOIkylsADwUurS_j0g_s3Gn7mcmYLnQzoITl_56OCWmP624TsjPR-NK1ZOvqhV7qxj0.y-Phw7e_xTdNuC-rBZ4Kxg"
            },
            "accessToken": {
              "jwtToken": "eyJraWQiOiJNXC95a3pNTkg1RVhcL2g3dCtnZWY4Q3BqREpBZFBPRXo5azFsbWJrd2NYTW89IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJldmVudF9pZCI6ImQ1OTM3ZDYzLWFiNTYtMTFlOC1iM2Q2LTE5NDA5M2MwMTg2MiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1MzU1MjUwMDcsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1NGMkRDUE81WSIsImV4cCI6MTUzNTUyODYwNywiaWF0IjoxNTM1NTI1MDA3LCJqdGkiOiJlNzJkYmIxZC1iNTJmLTRhMDItOTIyNS0wMjQ2MjgwM2VlODQiLCJjbGllbnRfaWQiOiI2MTdqa25hOXBxZWc4cm1ndGc5dXY0ZTZqNCIsInVzZXJuYW1lIjoic2FpIn0.faXRZfqSJ4xIDavQIsF7-NhSBjjWhuMu6JYFUT4w0eBHXGIgw8IgG-84bKCG9wloT_TskqGgn5fJR7ug16HxeIEzLP4Lu03zKD1GW89xKGreivMBc6Jc2r5NpyQD-VXVb1WJPZRmiG4A68QjHd55Swp0M4xg-3ka35miTqgwevxJV9x9po5ttRrrP1dyWzXeQCmKdnNFmRrRp_KU7xFzW0lwM0seKRaOx6HKrT_Tvv8pCnHo1WS9lRJpP6tnF4WuigFIzE3JuGc2vrUcGU3wP5NbR0PkH9Cf50m2-2TOzdc5zatpS15VoRBkuMMaFigZHqvbH_tKcB40pW7OWB70Dw",
              "payload": {
                "sub": "c27a05a2-4ce1-4173-be51-9bbc3fe65a0a",
                "event_id": "d5937d63-ab56-11e8-b3d6-194093c01862",
                "token_use": "access",
                "scope": "aws.cognito.signin.user.admin",
                "auth_time": 1535525007,
                "iss": "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y",
                "exp": 1535528607,
                "iat": 1535525007,
                "jti": "e72dbb1d-b52f-4a02-9225-02462803ee84",
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
            'cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y': "eyJraWQiOiJPZCtrcitlVFMwckRcL2pneTNJXC8zOWhpejkwdCtQZGVFSlVqKzNrUmQ0VWs9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfU0YyRENQTzVZIiwiY29nbml0bzp1c2VybmFtZSI6InNhaSIsImF1ZCI6IjYxN2prbmE5cHFlZzhybWd0Zzl1djRlNmo0IiwiZXZlbnRfaWQiOiJkNTkzN2Q2My1hYjU2LTExZTgtYjNkNi0xOTQwOTNjMDE4NjIiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUzNTUyNTAwNywibmFtZSI6InNhaSIsImV4cCI6MTUzNTUyODYwNywiaWF0IjoxNTM1NTI1MDA3LCJmYW1pbHlfbmFtZSI6ImtzIiwiZW1haWwiOiJTS3Jpc2huYXNldHR5QHNjdS5lZHUifQ.FRQnlj196C-MYycfMZbwmwmeAU9nQ_gHNpTEYdlfb8tFvLhiqJ-n0lOI7w96ofvilPFrDWmI4XxgHbfzpVp1b2Y4Bmfho0BiMfPhEpIIogh87g1LwJqO8KEW-Uzjv37nDRKzLDxG7dxHKf_3VvwBbhOwYTE7P2yloLfK9LhBkaK9_9nPvjTlwD2AijkpHgV1LPP0gYRthf4G_yLc5koCCMC74LeAadhb13RGbu06C3UEzMegTgIpK0QxwvmrctvWVQTNMKAH76G2cN4WsztTVSm8AM_YdBeYtIsf98OLWqtC9O3VEP-v0dpJdugIlvxkd5mSHjri7ZslJVqENUkP7A",
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
		UserPoolId: appConfig.UserPoolId,
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