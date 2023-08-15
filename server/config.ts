import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const PASSWORD = process.env.PASSWORD;
export const SECRET = process.env.SECRET;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PWD = process.env.EMAIL_PWD;
export const POSTGRES_URL = process.env.POSTGRES_URL
export const CLOUD_NAME = process.env.CLOUD_NAME
export const API_KEY = process.env.API_KEY
export const API_SECRET = process.env.API_SECRET
export const DB_USER = process.env.DB_USER
export const DB_NAME = process.env.DB_NAME
export const HOST = process.env.HOST
export const DB_PORT= process.env.DB_PORT
export const STRIPE_KEY:any = process.env.STRIPE_SECRET_KEY