import express from 'express';
import { startDatabase } from './config/db.js';
import { API_URL, PORT, FRONTEND } from './config/variable.js';
import cors from 'cors';
import productsRoutes from './modules/products/products.routes.js';
import usersRoutes from './modules/users/users.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import catRoutes from './modules/categories/categories.routes.js';

const app = express();
app.use(express.json());

startDatabase();
app.use(cors({ origin: FRONTEND }));

app.use(`${API_URL}/products`, productsRoutes);
app.use(`${API_URL}/users`, usersRoutes);
app.use(`${API_URL}/auth`, authRoutes);
app.use(`${API_URL}/categories`, catRoutes);

const port = PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));
