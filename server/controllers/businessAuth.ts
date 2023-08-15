import { Request, Response } from 'express';
import db from '../db/index.js';
import {hash} from 'bcrypt'
import {sendEmail} from '../utils/email'
import crypto from 'crypto'




export const register = async (req:Request, res:Response) => {
    const {name, email, address, phone, category, website, description, password} = req.body;

    try {
        const hashedPassword = await hash(password, 10);
        const token = crypto.randomBytes(32).toString('hex')
        const {rows} = await db.query("insert into businesses (name, email, address, phone, category, website, description, password) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *", 
        [name, email, address, phone, category, website, description, hashedPassword])
        await db.query("insert into verification_tokens_business (businessId, token) values ($1, $2)",[rows[0].id, token]);

        const url = `https://travel-booking-tau.vercel.app/business-auth/${rows[0].id}/verify/${token}`

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
        const {rows} = await db.query('select * from businesses where id=$1',[id]);

        if(!rows[0]) return res.status(400).send({message: "Invalid link"});

        const results = await db.query('select * from verification_tokens_business where businessId=$1',[rows[0].id])
        if(!results.rows[0]) return res.status(400).send({message: "Invalid link"});

        await db.query("UPDATE businesses SET verified = true WHERE id = $1", [rows[0].id])
        await db.query("DELETE FROM verification_tokens_business WHERE businessId=$1",[rows[0].id])

        res.redirect('http://localhost:8000/login')

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message: 'Email not verified'})
    }
}