// File: OAuthLogin.tsx

import React, { useEffect } from 'react';
import {useGoogleLogin} from '@react-oauth/google';
import axios from "axios"

const OAuthLogin: React.FC = () => {

//   useEffect(() => {
//     const oauthSignIn = () => {
//       const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/auth';

//       const params = {
//         client_id: '699954671747-bqj0rvn0q2296skerds6indulobrv1fv.apps.googleusercontent.com',
//         redirect_uri: 'http://localhost:3000/oauth-callback',
//         response_type: 'token',
//         scope: 'openid email',
//         include_granted_scopes: 'true',
//         state: 'pass-through value',
//       };

//       const queryString = Object.entries(params)
//         .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
//         .join('&');

//       const authorizationUrl = `${oauth2Endpoint}?${queryString}`;

//       // Redirect the user to the Google OAuth authorization URL
//       window.location.href = authorizationUrl;
//     };

//     oauthSignIn();
//   }, []);


const responseGoogle = async (response: any) => {
    try {
      // Use the access_token to make an API request to get user information
      const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${response.tokenId}`,
        },
      });

      // Here, you can handle the user information or perform other actions
      console.log('User Info:', userInfoResponse.data);

      // Access the ID token directly from the response
      console.log('ID Token:', response.tokenId);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async respose => {
        try {
            const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${respose.access_token}`
                }
            })
            console.log(res.data)
            console.log("access_token", respose)
        } catch (err) {
            console.log(err)
        }
    }
});

const handleLoginClick = () => {
    login();
  };

  return (
    <div>
      <p className="text-white">Redirecting to Google for OAuth...</p>
      <button onClick={handleLoginClick}>
                    <i className="fa-brands fa-google"></i>
                    Continue with google
                </button>
                {/* <GoogleLogin
                    onSuccess={credentialResponse => {
                    console.log(credentialResponse.credential);
                    // var decoded = jwt_decode(credentialResponse.credential);
                    // console.log(decoded)
                }}
                    onError={() => {
                    console.log('Login Failed');
                }}/> */}
    </div>
  );
};

export default OAuthLogin;
