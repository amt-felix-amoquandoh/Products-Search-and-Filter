import { Request, Response } from 'express';
import db from '../db';


export const createAccomodation =async (req: Request, res: Response) => {
    try {
        const columns = Object.keys(req.body).join(', ');
        const placeholders = Object.keys(req.body).map((_, index) => `$${index + 1}`).join(', ');

        const insertQuery = `INSERT INTO accommodations (${columns}) VALUES (${placeholders}) RETURNING *`;
        const values = Object.values(req.body);

        const {rows} = await db.query(insertQuery, values);

        res.json({ success:true, message: 'Accommodation added successfully.', data:rows[0] });
    } catch (err) {
        console.error('Error adding accommodation:', err);
        res.status(500).json({ error: 'An error occurred while adding accommodation.' });
    }

}


export const getAllAccomodation = async (req: Request, res: Response) => {
   
    try {
        const {rows: accommodations} = await db.query('select * from accommodations')

        res.status(200).json({success: true, data: accommodations})
    } catch (error) {
        res.status(500).json({success: false, message:'Internal server error'})
    }
}

export const getAccomodation = async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const {rows: accommodation} = await db.query('select * from accommodations where id=$1',[id])

        res.status(200).json({success: true, data: accommodation[0]})
    } catch (error) {
        res.status(500).json({success: false, message:error})
    }
}

export const getUserAccomodations = async (req: Request, res: Response) => {
    const {user_id} = req.params
    try {
        const {rows: accommodation} = await db.query('select * from accommodations where business_id=$1',[user_id])

        res.status(200).json({success: true, data: accommodation})
    } catch (error) {
        res.status(500).json({success: false, message:error})
    }
}

export const updateAccomodation =async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updateColumns = Object.keys(updates).map((key, index) => {
            return `${key} = $${index + 1}`;
        }).join(', ');

        const updateValues = Object.values(updates);

        const updateQuery = `UPDATE accommodations SET ${updateColumns} WHERE id = $${updateValues.length + 1} RETURNING *`;
        const values = [...updateValues, id];

        const{rows: updatedAccomodation} = await db.query(updateQuery, values);

        res.status(200).json({ success:true, message: 'Accommodation updated successfully.', data: updatedAccomodation[0] });
    } catch (err) {
        console.error('Error updating accommodation:', err);
        res.status(500).json({success:false, message: 'An error occurred while updating accommodation.' });
    }
}

export const deleteAccomodation = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        await db.query('delete from accommodations where id=$1',[id])

        res.status(200).json({success: true, message: 'item deleted'})
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}