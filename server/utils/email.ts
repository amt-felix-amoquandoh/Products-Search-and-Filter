import nodemailer from 'nodemailer'
import { EMAIL_PWD, EMAIL_USER } from '../config'

export const sendEmail = async(email:any, subject:any, text:any) => {
    try {
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PWD
            }
        })

        await transporter.sendMail({
            from: EMAIL_USER,
            to: email,
            subject: subject,
            text: text
        })
        console.log('email sent')
    } catch (error) {
        console.log('email not sent')
        console.log(error)
    }
}