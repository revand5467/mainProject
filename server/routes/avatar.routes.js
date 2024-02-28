
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import https from 'https';
import URLParse from 'url-parse';

function extractModelId(modelUrl) {
  // Handle potential empty or invalid URLs
  if (!modelUrl || !modelUrl.trim()) {
    return null; // Or handle the error as needed
  }

  const parsedUrl = URLParse(modelUrl);
  const pathname = parsedUrl.pathname;

  // Extract the ID from the pathname as needed based on your URL structure
  const modelId = pathname.split('/').pop().split('.')[0];
  // console.log(`id: ${modelId}`);
  return modelId;
}


dotenv.config();

const app = express();
const router = express.Router();
const subdomain = process.env.READYPLAYERME_SUBDOMAIN;
const apiKey = process.env.READYPLAYERME_API_KEY;

// API Base URL and Timeout
const subdomainUrl = 'https://fashiongpt.readyplayer.me';
const baseapiUrl = 'https://api.readyplayer.me'
const apiTimeout = 3000;

// Event Handlers:

// Get Anonymous User (GET /)
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from Avatar ROUTES' });
});

router.get('/createuser', async (req, res) => {
  try {
    const userData = req.body;

    const response = await axios.post( {
      headers: {
        // 'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json', // Explicitly set for clarity
      },
      body:{
        'token': ''
      }
    });
    console.log(response.data)

    const userId = response.data.data.id;
    const token = response.data.data.token;

    // console.log( `UserId: ${userId}`);
    // console.log(`Token: ${token}`);

    res.json({ userId, token }); // Send created user data back
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error processing request');
  }
});

// Create User (POST /)
router.post('/createuser', async (req, res) => {
  try {
    const userData = req.body;
    const createUrl = `${subdomainUrl}/api/users`;

    const response = await axios.post(createUrl, {
      timeout: apiTimeout,
      headers: {
        // 'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json', // Explicitly set for clarity
        'x-api-key' : apiKey,
      }
    });
    console.log(response.data)

    const userId = response.data.data.id;
    const token = response.data.data.token;

    // console.log( `UserId: ${userId}`);
    // console.log(`Token: ${token}`);

    res.json({ userId, token }); // Send created user data back
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error processing request');
  }
});

router.put('/saveavatar', async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);
    const avatarurl =userData.avatarId;
    const token= userData.token;
    const avatarid = extractModelId(avatarurl);
if (!avatarid) {
  console.log("Couldn't extract model ID from:", avatarurl); // Informative message
} else {
  console.log( `avatarId: ${avatarid}`);
  const createUrl = `${baseapiUrl}/v2/avatars/${avatarid}`;

  const response = await axios.post(createUrl, {
    timeout: apiTimeout,
    headers: {
      // 'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json', // Explicitly set for clarity
      'x-api-key' : apiKey,
      'Authorization' : `Bearer ${token}`
    }
  });
  console.log(response.data)
  const avatarId = response.data.data.id;
  const avatarSC = response.data.data.shortCode;
  res.json({ avatarId, avatarSC });
  
}
   // Send created user data back
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error processing request');
  }
});


export default router;


// const modelUrl = "https://models.readyplayer.me/65d20aa5c322b5dff04f303b.glb"; // Example URL
