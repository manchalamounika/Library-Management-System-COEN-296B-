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
        
        var cognitoUser= {
            "idToken": {
              "jwtToken": "eyJraWQiOiJPZCtrcitlVFMwckRcL2pneTNJXC8zOWhpejkwdCtQZGVFSlVqKzNrUmQ0VWs9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfU0YyRENQTzVZIiwiY29nbml0bzp1c2VybmFtZSI6InNhaSIsImF1ZCI6IjYxN2prbmE5cHFlZzhybWd0Zzl1djRlNmo0IiwiZXZlbnRfaWQiOiI2ODIwM2E2NS1hYjYxLTExZTgtOGIyNS1mMzg1MDgzZmU4OTYiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUzNTUyOTU0OCwibmFtZSI6InNhaSIsImV4cCI6MTUzNTUzMzE0OCwiaWF0IjoxNTM1NTI5NTQ4LCJmYW1pbHlfbmFtZSI6ImtzIiwiZW1haWwiOiJTS3Jpc2huYXNldHR5QHNjdS5lZHUifQ.NOy4rgT5n3tv_9_Z_3RT04ZE7FEEj8ZnKenrs80wxU5a6H_wr50Lec_VrOwxv63mA6nIWy8g7scrg9xvATGhSViwbo14Ke6cle3nAj7mNgBverF32fRObR0WfF8BA6Uvojai6blk5oxnyQgpjrtpMPv4BFVWxbKzKXFHMoXaNW57Jg2jalVYcsIaabmG1DkrDsJzDdxiVBgQvfMgtSz4XBBC5jqLUzeaNiJ5NJOICQnF54kVX7vkcb8njxcH1ApYSi8ELYUUBUfk8v12EA_96B5aGfcS0Hqxa3e8Fw2wumZLKU1J_H6AdCgNsELYajNo7AYSjvtmxqa49RpihD0Y2g",
              "payload": {
                "sub": "c27a05a2-4ce1-4173-be51-9bbc3fe65a0a",
                "email_verified": true,
                "iss": "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y",
                "cognito:username": "sai",
                "aud": "617jkna9pqeg8rmgtg9uv4e6j4",
                "event_id": "68203a65-ab61-11e8-8b25-f385083fe896",
                "token_use": "id",
                "auth_time": 1535529548,
                "name": "sai",
                "exp": 1535533148,
                "iat": 1535529548,
                "family_name": "ks",
                "email": "SKrishnasetty@scu.edu"
              }
            },
            "refreshToken": {
              "token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.rFCy2JvB-wt7GF1TklP2prn1H9chuCAARVf9oLc9LcVr1wy0T2PEyvW7RHFEjlJCtaYhmN0L4oLGvutAL3YvQWQUL7GbUTTwijYl0T8Xrnohqk_WTMFbNXRUTewIdFAUFIprmBIRYX7Y5XpCabFeapxQ3H0EpoNKElFDCknw6aglhENytRzuTA7g2TB5ZDbAYwfte4OrddTzKEh1CRbRVTD9OP4qYtxyHXGh15UX1P9Ru62PKGFeErtK2YT4P03jYW-k92b5VzOQeNXZBQcQg5GPbzqNFanvKyOByN24T5TdkNn8rlxC-XZo1k8xel2nD-zIlh7cvJRxTvnTUCvpoA.sVxl5mbbUNmYP1qF.k3e2g8dnG2BzTZYCBmHq_Dx9bY_2mSQyqpqUO_jwR0iDHOMYXjAEfeAAqT8BAKSYFDFnwlH0_Qa3tzhFae2C2RO6FVEDxvqpSjyC8NOOw3uwkt3-4F_WyNU11A9zm1NUU02xRI9GHJoUYBJASTJH74QN74ujToBN3vcb7GVV3wv_UhWK79I-4PPQjt1RtOYmmlPa1Gd1rRAREC2R-yju4ii-MXWcsggUDopt8HOqXjwbvvHjm6XnwTMR0WoDQMFFVOOZIY76j583d0FfbQgEW3jvOfreESVOUx-cflmOGgk0gYB6Bwv1zXf7dX7wrk6XBuzvm2RPWMbhuu4H_r2InnZ79Lq6BYEkZEgcwwQ_-6d1ea7_bPg_GhWC0RHcRmcu_g2OhSrIP-0ds8E42MkNInlKjk5F_JWaY5mkjXSRTDUIjJuQ_ClCvaJORKu5trx5qzH1_z5GDj4XBX4bwACWICpcvM84yW4NYMJZQXdl6WliIOkeQXwD57hz04BJx7Ce_wY3qvTq-1Nx315upA1KbIm5WxIuutXZAfj_vpAJukQPUUdr4rBgFv0nCdQq60Wae0PQVqJanbCD47VMAU2BwxKDpMlU4nPEjLHzr-dafNxRnm6dIJtnPn4r1fjSQoSzJptN_GWq0XeBLQSLgrv-WYab0xkBcfFpIvJUqajoeJeNIR2SbFZGqdOKzYOx-sp8FF9ugbk5zB-smnUr-JdURoGZwFZc6lnYQMnMjph9rjmAeViUtpRROpK6qKBPqVW8IQQ0ZVEXu85H8291vazbveRa18WslhTpTvs0XVyGVro6_PB_eGJBo-XwO3yMRTnhrvBvFvVzhyUcMr5NJ0Qz2E6Ud8Lsfr6xilcQ6PHFIyfSmEJ9zmLpZWjz6WSNp074Pqjg8kNo4UTsoGaCXbxCIACIrzR0SOlBi4WJokj-SfzvZgE_IwWGVUqakBW0VrTN6uKVLdwKIMrwep3VJ3NRZA7XnjAOLzPkEFcUXsD-iVidGXerz1XgoNZyABhq3jQQyQW5vdElGPaBUgf0IGbKH5JeTaJuUPExz4qtsM-0lJpHL5vgs86ND_ivyHKER1DSJ9GODGskVlwfoOriR72_oohIJLyMA6fHVXXzad2IBm9YuOgnXi37GbdCLC87GlyFvmDB0La9EzU_F6-PMaRqxLjRiwdDYilFUsDYriU4dz1s1Nc7_w0wmFe-o6ZZIvaRSPJonqNWkO_Ys5xaK3kFIE332zCz1fMjomm-vrr3fhs_eHDzvVet1mMBHaE682U.ufqg6dd7YI0IBWybwRHiqg"
            },
            "accessToken": {
              "jwtToken": "eyJraWQiOiJNXC95a3pNTkg1RVhcL2g3dCtnZWY4Q3BqREpBZFBPRXo5azFsbWJrd2NYTW89IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJldmVudF9pZCI6IjY4MjAzYTY1LWFiNjEtMTFlOC04YjI1LWYzODUwODNmZTg5NiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1MzU1Mjk1NDgsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX1NGMkRDUE81WSIsImV4cCI6MTUzNTUzMzE0OCwiaWF0IjoxNTM1NTI5NTQ4LCJqdGkiOiIxOGY2OGUxYi0yMGJiLTRkYzktOTUxOS1kMjA4NWE5YWEyOGQiLCJjbGllbnRfaWQiOiI2MTdqa25hOXBxZWc4cm1ndGc5dXY0ZTZqNCIsInVzZXJuYW1lIjoic2FpIn0.B9qgcYCKkRuUKRIZZnoN-c9bFemQ1-0JzQUvezFX0WUdbF9JSeNY4I1jRcfA8emAHljfstY0m87zYHg4mOiTSDCxn--D7yEqFYxLKYtJ17CNOllzCsDxt94TClA60dU2Fp5L2IGcCyJPeed0lxLP8XKhqZ9hWemcaWMo9qiDxsoptfaXDJ3_U8vS0Q5ar6RihNf6cD4r7NT8C3oKFIyZT-48_3_m1sw8Sb7uetZN_CYFwnImZJSWHWaG9VQiN-fyuC0pWAoH3OKs4vB3Up2iT1olVS-9oZEZoSkTNLn02I4JTFOr5gKz2l3v30pciX7alh633am5uiFAkYcPmscAKA",
              "payload": {
                "sub": "c27a05a2-4ce1-4173-be51-9bbc3fe65a0a",
                "event_id": "68203a65-ab61-11e8-8b25-f385083fe896",
                "token_use": "access",
                "scope": "aws.cognito.signin.user.admin",
                "auth_time": 1535529548,
                "iss": "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y",
                "exp": 1535533148,
                "iat": 1535529548,
                "jti": "18f68e1b-20bb-4dc9-9519-d2085a9aa28d",
                "client_id": "617jkna9pqeg8rmgtg9uv4e6j4",
                "username": "sai"
              }
            },
            "clockDrift": 12
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
            'cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y': "eyJraWQiOiJPZCtrcitlVFMwckRcL2pneTNJXC8zOWhpejkwdCtQZGVFSlVqKzNrUmQ0VWs9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjMjdhMDVhMi00Y2UxLTQxNzMtYmU1MS05YmJjM2ZlNjVhMGEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfU0YyRENQTzVZIiwiY29nbml0bzp1c2VybmFtZSI6InNhaSIsImF1ZCI6IjYxN2prbmE5cHFlZzhybWd0Zzl1djRlNmo0IiwiZXZlbnRfaWQiOiI2ODIwM2E2NS1hYjYxLTExZTgtOGIyNS1mMzg1MDgzZmU4OTYiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUzNTUyOTU0OCwibmFtZSI6InNhaSIsImV4cCI6MTUzNTUzMzE0OCwiaWF0IjoxNTM1NTI5NTQ4LCJmYW1pbHlfbmFtZSI6ImtzIiwiZW1haWwiOiJTS3Jpc2huYXNldHR5QHNjdS5lZHUifQ.NOy4rgT5n3tv_9_Z_3RT04ZE7FEEj8ZnKenrs80wxU5a6H_wr50Lec_VrOwxv63mA6nIWy8g7scrg9xvATGhSViwbo14Ke6cle3nAj7mNgBverF32fRObR0WfF8BA6Uvojai6blk5oxnyQgpjrtpMPv4BFVWxbKzKXFHMoXaNW57Jg2jalVYcsIaabmG1DkrDsJzDdxiVBgQvfMgtSz4XBBC5jqLUzeaNiJ5NJOICQnF54kVX7vkcb8njxcH1ApYSi8ELYUUBUfk8v12EA_96B5aGfcS0Hqxa3e8Fw2wumZLKU1J_H6AdCgNsELYajNo7AYSjvtmxqa49RpihD0Y2g",
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
		UserPoolId: 'us-east-2_zFJU1vK2t',
		AttributesToGet: [
        'email',   
        'name',     
        'family_name',                       
		],
		Limit: 60,
    };
    let LibrarianList =[];
	cognitoidentityserviceprovider.listUsers(params, function(err, data) {
		if (err){console.log(err, err.stack)}  // an error occurred
		else 
		{            
			for (var user in data.Users){
                console.log("user lib-----"+JSON.stringify(data.Users[user]))
                var name = data.Users[user].Attributes.length > 0? data.Users[user].Attributes[0].Value:'';                             
                var family_name = data.Users[user].Attributes.length > 1 ?data.Users[user].Attributes[1].Value:'';
                var email=data.Users[user].Attributes.length > 2 ?data.Users[user].Attributes[2].Value:'';
                
                var LibrarianInfo={
                    name: name,
                    family_name: family_name,
                    email: email,                                                        
                }   
                LibrarianList.push(LibrarianInfo); 
                       
            }                      
            this.setState({LibrarianList:LibrarianList})             
		}
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
            ]} className="-striped -highlight"
            showPagination={true}
            defaultPageSize={10}
            minRows={5}/>}               
            </div>
        )
         
    }
}

export default LibrarianList;