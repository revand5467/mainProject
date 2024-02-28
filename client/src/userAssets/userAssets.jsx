
import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator';
import { Avatar } from '@readyplayerme/visage';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Configuration (Replace placeholders)
const config: AvatarCreatorConfig = {
  clearCache: true,
  bodyType: 'fullbody', // Adjust as needed (fullbody, head)
  quickStart: false,
  language: 'en',
};

const style = { width: '100%', height: '100%', border: 'none', transform: 'scale(0.9)' };

const AvCall = () => {
  const [modelUrl, setModelUrl] = useState('');
  const [avatarDetails, setAvatarDetails] = useState(null);
  const navigate = useNavigate();

  // Replace with your server's endpoint URL
  // const serverUrl = 'YOUR_SERVER_URL'; // e.g., 'http://localhost:8080'

  const handleOnAvatarExported = async (event) => {
    setModelUrl(event.data.url);

    // fetch('/').then(response => response.json()).then(data => console.log(data.message));
    const response =  await fetch('http://localhost:8080/api/v1/avatar/assets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await response.json();
    console.log(data);

    navigate('/avatar-details', { state: { downloadUrl: event.data.url } });

   
  };

  return (
    <div className="h-full">
      {/* Display downloaded avatar if available */}
      {/* {modelUrl && <Avatar modelSrc={modelUrl} />} */}

      {/* Avatar Creator component, passing the export handler */}
      <AvatarCreator
        subdomain="fashiongpt" // Replace with your subdomain
        config={config}
        style={style}
        onAvatarExported={handleOnAvatarExported}
      />

      {/* Optionally display avatar details after successful export */}
      {avatarDetails && (
        <div>
          {/* Show download URL, progress bar, or other relevant information */}
        </div>
      )}
    </div>
  );
};

export default AvCall;
