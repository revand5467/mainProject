import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import dalleRoutes from './routes/dalle.routes.js'; // (Optional)
import avatarRoutes from './routes/avatar.routes.js'; // Replace with your actual Avatar route file

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Handle potentially large avatar payloads

// Mount your avatar routes at the desired path (adapt if needed):
// app.use('/api/v1/avatar', avatarRoutes);

// Optional DALL.E routes (assuming you have them implemented):
if (dalleRoutes) {
  app.use('/api/v1/dalle', dalleRoutes);
}
if (avatarRoutes) {
  app.use('/api/v1/avatar', avatarRoutes);
}


// Default route for testing or placeholder:
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Your app is running!' });
  console.log("running");
});

app.listen(8080, () => console.log('Server listening on port 8080'));
 