import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import * as AWS from 'aws-sdk';
import {CognitoUserPool,CognitoUserAttribute,} from "amazon-cognito-identity-js";

const userPool = new CognitoUserPool({
    UserPoolId: 'us-east-2_zFJU1vK2t',
    ClientId: '4tco3thknv6ei9avcu32nhvhum',
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
    }

    componentDidMount(){
        // var cognitoUser = userPool.getCurrentUser();
        
    //     var cognitoUser= {
    //         "idToken": {
    //           "jwtToken": "eyJraWQiOiJPZCtrcitlVFMwckRcL2pneTNJXC8zOWhpejkwdCtQZGVFSlVqKzNrUmQ0VWs9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfU0YyRENQTzVZIiwiY29nbml0bzp1c2VybmFtZSI6InNhaSIsImF1ZCI6IjYxN2prbmE5cHFlZzhybWd0Zzl1djRlNmo0IiwiZXZlbnRfaWQiOiJmYWQ0MWI4My1hNjk2LTExZTgtOGM2ZS0yZjUzOGY1NGQ4YTAiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUzNTAwMjgwMiwibmFtZSI6InNhaSIsImV4cCI6MTUzNTAwNjQwMiwiaWF0IjoxNTM1MDAyODAyLCJmYW1pbHlfbmFtZSI6ImtzIiwiZW1haWwiOiJTS3Jpc2huYXNldHR5QHNjdS5lZHUifQ.EzsoIOSuD-MY6HkYHEZo6BYdbZF3H2gkDeI4NfRh6EIamkNTBzqXEjAeyBlEzPv3nfRD8GmHl3CAp8RfjAZdO1wABE0PoIj1g23AAH11A5Qci49u3mEhOQF83rcQPmGDQpj5pjvJyWw5JGWtOe3kvmj4pGnAuVDggjE_WQrgDBxN8lgYnOJP1RvB3pGpJ9UWHUz1I0GkzPxb3158hRyvzJQ4n-4VgHHTvmGPn-o7UURh4GwE5reTRcGtF69ZQ8Tf13fyqs-JN3x4iEIr7UtcMoKPgDezA4CWwwGdmBH4mO7rb9-autCUuqi0Op5xTOhJrUztOWjD7xsaJs4q2Srq1w",
    //           "payload": {
    //             "sub": "c27a05a2-4ce1-4173-be51-9bbc3fe65a0a",
    //             "email_verified": true,
    //             "iss": "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y",
    //             "cognito:username": "sai",
    //             "aud": "617jkna9pqeg8rmgtg9uv4e6j4",
    //             "event_id": "fad41b83-a696-11e8-8c6e-2f538f54d8a0",
    //             "token_use": "id",
    //             "auth_time": 1535002802,
    //             "name": "sai",
    //             "exp": 1535006402,
    //             "iat": 1535002802,
    //             "family_name": "ks",
    //             "email": "SKrishnasetty@scu.edu"
    //           }
    //         },
    //         "refreshToken": {
    //           "token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.pLpJ1NKuqvx4yHK1HaFcg-cIWzbRlihciz-mR5bFPol26aqLyF1p1wsXVP0HqY1s1hRSlS3AocWLtwcGwiZS2nhdnnyomd3gmb0AI0J1AfHSLkxmoWT_K75_DjaWItwkDKAakcsxpJp2HYkdYGxM5-sVlRG2yeK_14OzGQ1yU0t9Mx8ep7cp5eQaeeEoF1VACfJrpdXKud34h5gs1IPpIVGB95dzbxbGwzyqD9aaTD87y4z5y37KfUmUKFwXT6PNO4bK1g6YHltQLXiEUgi60RcubdbYINgqQm40yTOYhtPQPTaY5i30SSWBY80DSKeuP0YB0nQEYwrIi-mghy75iA.K6kcLL-0pbZaKWRg.jIF-k3i2PWMTL8EFNNa52Zhwrfnrf9fRa41dX4H__PoPGGViVYDnOYhXgH1-gT3x2v2EiYrzfXg6vTUIVPAXQeXqqtb6QyXctyTpCUSVls_kcef0B-XvvPtQdQLoL0ycHZlwlblOa8JJxDLP3-zu5PfMrJ3YcFW7Xte9W1z8HRs-rtynlb6e8TkFbqqbd7z8gTdPhGNSTaLN_vssmtc9_NXVazELXdaa0uRHmUC8lYwfo2ESk5gdujkrs2eRQ7iPFIXvBhu_LaC2uR0x5kpceTHPa249xix8yxivbkoDAW8IoTgDQQ3dBBH8NX_RyBdqSnxp08Mzsigz7dxQ_V41C3_pCVIYmlIvCwWMS1t8C8XYkQLOsGsZQGbmMtKBzSaQM5ccOT7YARl069XVTXbd_mPfwZjD1U6sRFomrTF5Ha0AM0pW36QHO4r5MmP06pKYsDQsm_1LYxsj-AdRFkAeVSof_rUNK3HlmnELP8dAZDhfaxTEFzYQHcTHX-TUXwS-CmTse9nT5jX5ooYKUuu7tx6RNdtUpwbYqIEVnnoD2TJh1yoqa_Z7wyFBiTJq96K_rxY2Vwq2ScgBgFfLDrMCusERpH2vBeQTE4THaYjfNBEvAwxzTlK3_F_aNOtIReUpMl2uNAjO7nGbAjy1YuiGZTBBjJYnxY3OMiCyE4Sw-oPFKTxbFeaMClp7zEF5_KCSc0TPKvbC3X4kOIwqeF1Pvq9jQC0dYnJH4MwYGynh5SeQWb_fR9Aq6ZY0mrfkBDxfKZgLI0Y27aEZNZrcFgMkToaboS_586-3QRFLXCNDAbE5ESr8qbC1fkG62mWexMfpYHGZ2sEofNXAJC9r6VogRuCajTbSMoji0zQT9SYfJE8o5OOJZhthV33uoEz3nNMO3tj-8ijTpBRem81NDMzWzE3W_8vfONjISbzzjZcGZfoIRtAhKIjWpTBsUGgIxoVEsvG7iphXiis6OItzHtilGkaK8TyPUiag5Nn-XI5KLYSdeJtEiPS0lC15K6uHLWKLYnDxJkr3nAr10NcwnfgouxI3Y4ckZ2fwT1PpKV8aq6hij8kDWPP-1wZBp5sHXacn9OGzCsHeRaPGfzV929n80WKgkD0V--wRDylH1eqFPTbaN3YEQdE4fB2JLEfNMu-fsY7DY13DJiJCh8v-Hy0JHO6T0xv1tQEmp3Vn1r9aphCV7nCsQ-FWTFvTT7Gq_oVdJ8sdbW18skyzjCGufBEWbpoiMs5S1kiMxgdmkuMleGSoe4QoIB0XpsoeghBVTSw.qoM9JCk1-4l9NMUzHz7HPw"
    //         },
    //         "accessToken": {
    //           "jwtToken": "eyJraWQiOiJNXC95a3pNTkg1RVhcL2g3dCtnZWY4Q3BqREpBZFBPRXo5azFsbWJrd2NYTW89IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJldmVudF9pZCI6ImZhZDQxYjgzLWE2OTYtMTFlOC04YzZlLTJmNTM4ZjU0ZDhhMCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1MzUwMDI4MDIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1NGMkRDUE81WSIsImV4cCI6MTUzNTAwNjQwMiwiaWF0IjoxNTM1MDAyODAyLCJqdGkiOiIyMWM4YzQwYS1hNzI3LTQ5ZjctOWMwMC1hOWZlNmZlZWY0M2EiLCJjbGllbnRfaWQiOiI2MTdqa25hOXBxZWc4cm1ndGc5dXY0ZTZqNCIsInVzZXJuYW1lIjoic2FpIn0.d0eoqcrnywxIgWoDTX60kDuAesNck0jTfRFHfDrWFan5vbhg15VrRfGT0jZlaNc91wK5Pm2Wvl09Cu4gFbihriZ3IMcbGcm12YtUVfhGRMF2P4qgpBWcyKCLCkmCAuonPtnF2WR6LESONoCvTKRAH_yyFcfUFVK9lrLRhUXYIzAMOGF9MnombZs9FFXK81xHc0DQRuJUaJNDNmFgVLCdf-aPtSg1AOJNNZm9FITtW7jKkPUl9yHN19fEztNAqiSQLcebtfsN7Z5CrtBSDEnERN81UJ7Q9pcZibm10UYNluFmqy2eyaos_JAv60PoFiBQ4DzCiqkGO3S4qoDwKcSn-w",
    //           "payload": {
    //             "sub": "c27a05a2-4ce1-4173-be51-9bbc3fe65a0a",
    //             "event_id": "fad41b83-a696-11e8-8c6e-2f538f54d8a0",
    //             "token_use": "access",
    //             "scope": "aws.cognito.signin.user.admin",
    //             "auth_time": 1535002802,
    //             "iss": "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y",
    //             "exp": 1535006402,
    //             "iat": 1535002802,
    //             "jti": "21c8c40a-a727-49f7-9c00-a9fe6feef43a",
    //             "client_id": "617jkna9pqeg8rmgtg9uv4e6j4",
    //             "username": "sai"
    //           }
    //         },
    //         "clockDrift": 0
    //       }
	
	// // if (cognitoUser != null) {
    // //     cognitoUser.getSession(function(err, result) {
    // //         if (result) {
    // //             console.log('You are now logged in.');

    // //             // Add the User's Id Token to the Cognito credentials login map.
    // //             AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    // //                 IdentityPoolId: 'us-east-2:81073ee5-eca0-499a-a0ea-8edab1debd6b',
    // //                 Logins: {
    // //                     'cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y': result.getIdToken().getJwtToken()
    // //                 }
    // //             });
    // //         }
    // //     });
    // // }

    // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //     IdentityPoolId: 'us-east-2:81073ee5-eca0-499a-a0ea-8edab1debd6b',
    //     Logins: {
    //         'cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y': "eyJraWQiOiJPZCtrcitlVFMwckRcL2pneTNJXC8zOWhpejkwdCtQZGVFSlVqKzNrUmQ0VWs9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfU0YyRENQTzVZIiwiY29nbml0bzp1c2VybmFtZSI6InNhaSIsImF1ZCI6IjYxN2prbmE5cHFlZzhybWd0Zzl1djRlNmo0IiwiZXZlbnRfaWQiOiJmYWQ0MWI4My1hNjk2LTExZTgtOGM2ZS0yZjUzOGY1NGQ4YTAiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUzNTAwMjgwMiwibmFtZSI6InNhaSIsImV4cCI6MTUzNTAwNjQwMiwiaWF0IjoxNTM1MDAyODAyLCJmYW1pbHlfbmFtZSI6ImtzIiwiZW1haWwiOiJTS3Jpc2huYXNldHR5QHNjdS5lZHUifQ.EzsoIOSuD-MY6HkYHEZo6BYdbZF3H2gkDeI4NfRh6EIamkNTBzqXEjAeyBlEzPv3nfRD8GmHl3CAp8RfjAZdO1wABE0PoIj1g23AAH11A5Qci49u3mEhOQF83rcQPmGDQpj5pjvJyWw5JGWtOe3kvmj4pGnAuVDggjE_WQrgDBxN8lgYnOJP1RvB3pGpJ9UWHUz1I0GkzPxb3158hRyvzJQ4n-4VgHHTvmGPn-o7UURh4GwE5reTRcGtF69ZQ8Tf13fyqs-JN3x4iEIr7UtcMoKPgDezA4CWwwGdmBH4mO7rb9-autCUuqi0Op5xTOhJrUztOWjD7xsaJs4q2Srq1w",
    //     }
    // });
	
	// AWS.config.region = 'us-east-2';
	
	// AWS.config.credentials.refresh((error) => {
    //     if (error) {
    //         console.error("",error);
    //     } else {
    //         console.log('Successfully logged!');
    //     }
    //     });

	// var cognitoidentity = new AWS.CognitoIdentity();
	
	// var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	// var params = {
	// 	UserPoolId: 'us-east-2_SF2DCPO5Y',
	// 	AttributesToGet: [
    //     'email',   
    //     'name',     
    //     'family_name',        
	// 	],
	// 	Limit: 60,
    // };
    // let LibrarianList =[];
	// cognitoidentityserviceprovider.listUsers(params, function(err, data) {
	// 	if (err){console.log(err, err.stack)}  // an error occurred
	// 	else 
	// 	{            
	// 		for (var user in data.Users){
                
    //             var name = data.Users[user].Attributes.length > 0? data.Users[user].Attributes[0].Value:'';                             
    //             var family_name = data.Users[user].Attributes.length > 1 ?data.Users[user].Attributes[1].Value:'';
    //             var email=data.Users[user].Attributes.length > 2 ?data.Users[user].Attributes[2].Value:'';
                
    //             var LibrarianInfo={
    //                 name: name,
    //                 family_name: family_name,
    //                 email: email,                                    
    //             }   
    //             LibrarianList.push(LibrarianInfo); 

    //             // console.log("name ===="+name);
    //             // console.log("user=="+JSON.stringify(data.Users[user].Attributes[1].Value));        
    //             // console.log("family=="+JSON.stringify(data.Users[user].Attributes[2].Value));        
    //         }                      
    //         this.setState({LibrarianList:LibrarianList})             
	// 	}
    // }.bind(this));       
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
            ]} className="-striped -highlight"
            showPagination={true}
            defaultPageSize={10}
            minRows={5}/>}               
            </div>
        )
         
    }
}

export default LibrarianList;