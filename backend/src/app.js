import express from "express";
import { startDatabase } from "./config/db.js";
import { API_URL } from "./config/variable.js";
import { PORT } from "./config/variable.js";
import cors from "cors";
import productsRoutes from "./modules/products/producs.routes.js";
import usersRoutes from "./modules/users/users.routes.js"
import authRoutes from "./modules/auth/auth.routes.js"

const app = express();
app.use(express.json());

startDatabase();
app.use(cors());

app.use(`${API_URL}/products`, productsRoutes);
app.use(`${API_URL}/users`, usersRoutes);
app.use(`${API_URL}/auth`, authRoutes);


const port = PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
