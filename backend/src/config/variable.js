import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URL = process.env.MONGO_URL;
export const API_URL = process.env.API_URL;
export const JWT_KEY = process.env.JWT_KEY;
export const GOOGLE_CLIENT_ID_BACKEND = process.env.GOOGLE_CLIENT_ID_BACKEND;
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const SUPABASE_AVATAR_URL = process.env.SUPABASE_AVATAR_URL;
export const FRONTEND = process.env.FRONTEND;
export const SUPABASE_BUCKET_PRODUCT = process.env.SUPABASE_BUCKET_PRODUCT;