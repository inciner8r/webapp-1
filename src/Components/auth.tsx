import React, { useEffect, useState } from 'react';

const CLIENT_ID = '699954671747-bqj0rvn0q2296skerds6indulobrv1fv.apps.googleusercontent.com'; // Replace with your actual Google Client ID
const REDIRECT_URI = 'http://localhost:3000/oauth-callback'; // Replace with your actual redirect URI

const GoogleAuthExample: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleLoginClick = () => {
    const state = Math.random().toString(36).substring(7);
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20profile%20email&state=${state}`;
    window.location.href = authUrl;
  };

  const handleLogoutClick = () => {
    setLoggedIn(false);
    // Additional logout steps if needed
  };

  const parseAuthorizationCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      localStorage.setItem("code",code)
      exchangeCodeForToken(code);
      console.log("code", code)
    }
  };

  const exchangeCodeForToken = async (code: string) => {
    const tokenEndpoint = 'https://www.googleapis.com/oauth2/v4/token';

    const tokenRequestBody = {
      code,
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    };

    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(tokenRequestBody).toString(),
      });

      const tokenData = await response.json();
      handleTokenData(tokenData);
      console.log("token", tokenData);
    } catch (error) {
      console.error('Token exchange error:', error);
    }
  };

  const handleTokenData = (tokenData: any) => {
    setLoggedIn(true);
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  useEffect(() => {
    parseAuthorizationCode();
  }, []);

  return (
    <div>
      {loggedIn ? (
        <div className="text-white">
          <p>Welcome! You are logged in.</p>
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
      ) : (
        <button className="text-white" onClick={handleLoginClick}>Login with Google</button>
      )}
    </div>
  );
};

export default GoogleAuthExample;
