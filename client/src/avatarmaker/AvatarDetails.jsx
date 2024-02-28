import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { Avatar } from '@readyplayerme/visage';

const AvatarDetails = () => {
  const location = useLocation();
  const [avatarUrl, setAvatarUrl] = useState('');
  useEffect (() => {

    const setAvatar = ( async()=>{

      // if (location.state && location.state.downloadUrl && location.state.token) {

        let storedUrl= localStorage.getItem('avURL');
        if(!storedUrl){
          localStorage.setItem("avURL", location.state.downloadUrl);
          storedUrl= localStorage.getItem('avURL');
          // localStorage.setItem("avURL", storedUrl);
        }
      console.log(storedUrl);
        setAvatarUrl(storedUrl); 
     
       console.log(location.state.token);
      const saveAvatar = async()=>{
  
        const response =  await fetch('http://localhost:8080/api/v1/avatar/saveavatar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${location.state.token}`
        },
        body:JSON.stringify({
          token: `${location.state.token}`,
          avatarId: `${location.state.downloadUrl}`,
        }),
  
      })
      const data = await response.json();
      console.log(data);
  
      }
      saveAvatar();
      console.log(avatarUrl);
    }
    // }
     )
   setAvatar();
  }, []);

  return (
    <div className="avatar-details absolute top-0">
      {avatarUrl && (
        <div>
          <h2>Your Downloaded Avatar</h2>
          {/* <img src={avatarUrl} alt="Downloaded Avatar" className="avatar-image" /> */}
          <Avatar modelSrc={avatarUrl} />
        </div>
      )}
      {!avatarUrl && (
        <div>
          <h2>No Avatar Found</h2>
          {/* Handle the case where no downloadUrl is available in the state */}
        </div>
      )}
    </div>
  );
};

export default AvatarDetails;
