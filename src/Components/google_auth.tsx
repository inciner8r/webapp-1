// File: OAuthLogin.tsx

import React, { useEffect } from 'react';

const OAuthLogin: React.FC = () => {

  useEffect(() => {
    const oauthSignIn = () => {
      const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/auth';

      const params = {
        client_id: '699954671747-bqj0rvn0q2296skerds6indulobrv1fv.apps.googleusercontent.com',
        redirect_uri: 'http://localhost:3000/oauth-callback',
        response_type: 'token',
        scope: 'https://www.googleapis.com/auth/userinfo.email',
        include_granted_scopes: 'true',
        state: 'pass-through value',
      };

      const queryString = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

      const authorizationUrl = `${oauth2Endpoint}?${queryString}`;

      // Redirect the user to the Google OAuth authorization URL
      window.location.href = authorizationUrl;
    };

    oauthSignIn();
  }, []);

  return (
    <div>
      <p className="text-white">Redirecting to Google for OAuth...</p>
    </div>
  );
};

export default OAuthLogin;
