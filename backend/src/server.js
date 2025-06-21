import express from 'express';
import {startDatabase} from './config/db.js';
/* import { API_URL } from './config/variable.js'; */
import { PORT } from './config/variable.js';
/* import { MONGO_URI } from './config/variable.js'; */

const server = express();
server.use(express.json());
startDatabase();
/* app.use(cors()); */

const port = PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));