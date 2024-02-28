import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Configuration (Replace placeholders)

const style = { width: '100%', height: '100%', border: 'none', transform: 'scale(0.9)' };

const AvCall = () => {
  const [modelUrl, setModelUrl] = useState('');
  const [avToken, setAvToken] = useState('');
  const navigate = useNavigate();

  // Error state and handler
  const [error, setError] = useState(null);
  const handleError = (err) => setError(err.message);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Check if avToken is already fetched and stored in localStorage
        const storedToken = localStorage.getItem('avToken');
        if (storedToken) {
          console.log("stored", storedToken);
          setAvToken(storedToken);
          localStorage.setItem('avToken', storedToken);
          return; // Exit if token already exists
        }

        const response = await fetch(`http://localhost:8080/api/v1/avatar/createuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setAvToken(data.token);
        localStorage.setItem('avToken', data.token); // Store token in localStorage
        console.log("avtoken:", data.token);
      } catch (err) {
        handleError(err);
      }
    };

    fetchToken();
  }, []); // Empty dependency array for one-time execution

  const handleOnAvatarExported = async (event: AvatarExportedEvent) => {
    setModelUrl(event.data.url);

    // Use the locally stored or fetched avToken
    const token = localStorage.getItem('avToken');
    localStorage.clear();
    console.log("function token:", token);
    navigate('/avatar-details', {
      state: { downloadUrl: event.data.url, token: token },
    });
  };

  const config: AvatarCreatorConfig = {
    clearCache: false,
    bodyType: 'fullbody', // Adjust as needed
    quickStart: false,
    language: 'en',
  
    token: localStorage.getItem('avToken')!, // Use the stored/fetched avToken
  };

  // Conditionally render and handle errors
  return (
    <div className="h-full">
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          {/* Display downloaded avatar if available */}
          {/* {modelUrl && <Avatar modelSrc={modelUrl} />} */}

          {/* Avatar Creator component, passing the export handler */}
          <AvatarCreator
            subdomain='fashiongpt'
            config={config}
            style={style}
            onAvatarExported={handleOnAvatarExported}
          />

          {/* Optionally display avatar details after successful export */}
          {/* {avatarDetails && (
            <div>
              {/* Show download URL, progress bar, or other relevant information */}
            
        
        </>
          )
          }
  
    </div>
  );
};

export default AvCall;
