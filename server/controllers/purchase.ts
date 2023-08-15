import { Stripe } from 'stripe';
import { config } from 'dotenv';
import { STRIPE_KEY } from '../config';
import { Request,Response } from 'express';
import db from '../db';
config();

const stripe = new Stripe(STRIPE_KEY, {
  apiVersion: '2022-11-15',
});


export const purchase = async (req:Request, res:Response) => {
    const {stripeTokenId, products} = req.body;
    let total = 0;
    try {
        products.forEach(async (item:any)=>{
            const {rows:product} = await db.query('select * from $1 where id=$2',[item.product_type, item.id])

            total += product[0].price;
        })

        const charge = await stripe.charges.create({
            amount: total,
            source: stripeTokenId,
            currency:"usd"
        })

        res.status(200).json({
            success: true,
            message:"Transaction successful",
            charge
        })
    } catch (error:any) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}