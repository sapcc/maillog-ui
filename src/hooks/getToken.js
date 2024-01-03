import React, { useEffect } from 'react';

const GetToken = () => {
  useEffect(() => {
    const keystoneEndpoint = 'https://identity-3.qa-de-1.cloud.sap/v3/auth/tokens';
    const applicationCredentialId = '10aa93038de04bc7a971ca96a2766447';
    const applicationCredentialSecret = '-eaSGgEoN-Ob2QsWL4qJQyGB_7Xe6YdskcJW5u4ZbS4bFcXmWBywYMrJXG7Sm-aLR3dApjvkqrvl1xbOKRUu7w';

    const requestBody = {
      auth: {
        identity: {
          methods: ['application_credential'],
          application_credential: {
            id: applicationCredentialId,
            secret: applicationCredentialSecret,
          },
        },
      },
    };
        console.log('Authentication start',);

    fetch(keystoneEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        // Check if the request was successful (status code 2xx)
        if (response.ok) {
          return response.json(); // Parse the JSON response
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then(data => {
        // Handle the JSON response data
        console.log('Authentication successful:', data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error during authentication:', error);
      });
  }, []); // Run once when the component mounts

  return (
    <div>
      <h1>Authentication Request</h1>
    </div>
  );
};

export default GetToken;
