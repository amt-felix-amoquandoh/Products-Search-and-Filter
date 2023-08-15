import { Request, Response } from "express";
import db from "../db";
import crypto from 'crypto'
import { sendEmail } from "../utils/email";
import { compare, hash } from "bcrypt";

export const resetVerifyEmail = async (req:Request, res:Response) => {
    const {email} = req.body;

    try {
        const {rows:customer} = await db.query('select id from customers where email=$1',[email])

        if(customer[0]){
            const token = crypto.randomBytes(32).toString('hex');
            const url = `http://localhost:8000/reset-password/${customer[0].id}/${token}`

            await sendEmail(email, "Password reset link", url)
            res.status(200).json({
                success: true,
                message: 'password-reset link sent to your mail'
            })  
        }else{
            const {rows: business} = await db.query('select id from businesses where email=$1',[email]);

            if(!business[0]){
                return res.status(404).json({
                    success: false,
                    message: "User doesn't exist",
                });
            }
            const token = crypto.randomBytes(32).toString('hex');
            const url = `http://localhost:8000/reset-password/${business[0].id}/${token}`

            await sendEmail(email, "Password Reset", url)
            res.status(200).json({
                success: true,
                message: 'password-reset link sent to your mail'
            })  
        }
    } catch (error:any) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const changePassword = async (req: Request, res:Response) => {
    const {id, token} = req.params;
    const {newPassword} = req.body;

    try {
        const {rows: customer} = await db.query('select * from customers where id=$1', [id]);
        if(customer[0]){
            const samePassword = await compare(newPassword, customer[0].password);
            if(samePassword) return res.status(500).json({success: false, message: "you can't use this password, change another"})
            const hashedPassword = await hash(newPassword,10);
            await db.query('UPDATE customers SET password = $1 WHERE id = $2', [hashedPassword, id]);
            res.status(200).json({
                success: true,
                message: 'Password reset successful'
            })
        }else{
            const {rows: business} = await db.query('select * from businesses where id=$1', [id]);
            if(!business[0]){
                return res.status(404).json({
                    success: false,
                    message: "User doesn't exist",
                });
            }
            const samePassword = await compare(newPassword, business[0].password);
            if(samePassword) return res.status(500).json({success: false, message: "you can't use this password, change another"})
            const hashedPassword = await hash(newPassword,10);
            await db.query('UPDATE businesses SET password = $1 WHERE id = $2', [hashedPassword, id]);
            res.status(200).json({
                success: true,
                message: 'Password reset successful'
            })
        }
    } catch (error:any) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}