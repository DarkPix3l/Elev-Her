import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URL = process.env.MONGO_URL;
export const API_URL = process.env.API_URL;
export const JWT_KEY = process.env.JWT_KEY;