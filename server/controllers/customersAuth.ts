import { Request, Response } from 'express';
import db from '../db/index.js';
import {compare, hash} from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken';
import {sendEmail} from '../utils/email'
import crypto from 'crypto'
import { SECRET } from '../config';
import { createRefreshToken } from '../utils/auth';


export const register = async(req:Request, res:Response) =>{

    const {fullname, email, password} = req.body;

    try {
        const hashedPassword = await hash(password, 10);
        const token = crypto.randomBytes(32).toString('hex')
        const {rows} = await db.query("insert into customers (fullname, email, password) values ($1, $2, $3) returning *", [fullname, email, hashedPassword])
        await db.query("insert into verification_tokens (customerId, token) values ($1, $2)",[rows[0].id, token]);

        const url = `https://travel-booking-tau.vercel.app/customer-auth/${rows[0].id}/verify/${token}`

        await sendEmail(rows[0].email, "Verify Email", url)
        res.status(200).json({
            success: true,
            message: 'email sent to your account, please verify'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "signup failed. Try again"
        })
    }
}

export const verifyEmail = async(req:Request, res:Response) =>{
    const {id, token} = req.params;
    try {
        const {rows} = await db.query('select * from customers where id=$1',[id]);

        if(!rows[0]) return res.status(400).send({message: "Invalid link"});

        const results = await db.query('select * from verification_tokens where customerId=$1',[rows[0].id])
        if(!results.rows[0]) return res.status(400).send({message: "Invalid link"});

        await db.query("UPDATE customers SET verified = true WHERE id = $1", [rows[0].id])
        await db.query("DELETE FROM verification_tokens WHERE customerId=$1",[rows[0].id])

        res.redirect('http://localhost:8000/login');
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message: 'Email not verified'})
    }
}

 export const login = async (req: Request, res: Response) => {
   const { email, password } = req.body;
 
   try {
     // Check in customers table
     const { rows: customerRows } = await db.query('SELECT * FROM customers WHERE email = $1', [email]);
 
     if (customerRows[0]) {
       // User found in customers table
       if(!customerRows[0].verified) return res.status(401).json({success: false, message:'check your email for verification email'})
       // Check if password is correct for the customer
       const isCorrectPassword = await compare(password, customerRows[0].password);
 
       if (!isCorrectPassword) {
         return res.status(401).json({ success: false, message: "Wrong password" });
       }
 
       const { id, isAdmin,fullname, phonenumber, address } = customerRows[0];
 
       // Create access token
       const accessExpiresIn = 12 * 60 * 60; // 12 hours in seconds
       const accessToken = jwt.sign(
         { id: id, isAdmin: isAdmin },
         SECRET as Secret,
         { expiresIn: accessExpiresIn }
       );
 
       // Create refresh token
       const refreshToken = createRefreshToken(id, isAdmin); // Implement this function to create a refresh token
 
       // Set and send cookies to browser and client
       res.cookie('accessToken', accessToken, {
         httpOnly: true,
         expires: new Date(Date.now() + accessExpiresIn * 1000),
       });
 
       res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Refresh token expires in 30 days
       });
 
       return res.status(200).json({
         success: true,
         accessToken,
         refreshToken,
         data: { id, fullname, email, phonenumber, address },
       });
     } else {
       // If user not found in customers table, check in businesses table
       const { rows: businessRows } = await db.query('SELECT * FROM businesses WHERE email = $1', [email]);
 
       if (!businessRows[0]) {
         return res.status(404).json({
           success: false,
           message: "User doesn't exist",
         });
       }
       if(!businessRows[0].verified) return res.status(401).json({success: false, message: "check your mail for verificaion link"})
       // Check if password is correct for the business
       const isCorrectPassword = await compare(password, businessRows[0].password);
 
       if (!isCorrectPassword) {
         return res.status(401).json({ success: false, message: "Wrong password" });
       }
 
       const { id, name,isAdmin, category, phone, address, website, description } = businessRows[0];
 
       // Create access token
       const expiresIn = 12 * 24 * 60 * 60 * 1000; // 12 days in milliseconds
       const accessToken = jwt.sign(
         { id: id, isAdmin: isAdmin },
         SECRET as Secret,
         { expiresIn: "12d" }
       );
 
       // Create refresh token
       const refreshToken = createRefreshToken(id,isAdmin); // Implement this function to create a refresh token
 
       // Set and send cookies to browser and client
       res.cookie('accessToken', accessToken, {
         httpOnly: true,
         expires: new Date(Date.now() + expiresIn),
       });
 
       res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Refresh token expires in 30 days
       });
 
       return res.status(200).json({
         success: true,
         accessToken,
         refreshToken,
         data: { id, name, category, email, phone, address, website, description },
       });
     }
   } catch (error) {
     console.log(error);
     return res.status(500).json({ success: false, message: 'Login failed' });
   }
 };
 

export const logout =async (req:Request, res:Response) => {
    // Clear the access token cookie
    res.clearCookie('accessToken', { httpOnly: true });

    // Respond with a success message
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  };