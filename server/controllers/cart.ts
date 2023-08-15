import { Request, Response } from "express";
import db from "../db";




export const addToCart = async (req:Request, res:Response) => {
    const { product_id, product_type, user_id } = req.body;
  try {
    const validProductTypes = ['hotel', 'accommodations', 'flight'];
    if (!validProductTypes.includes(product_type)) {
      return res.status(400).json({ error: 'Invalid product_type' });
    }

    // Check if the product_id exists in the specified product_type table before adding it to the cart
    const productQuery = `SELECT * FROM ${product_type} WHERE id = $1`;
    const productResult = await db.query(productQuery, [product_id]);

    if (productResult.rowCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const query = `
      INSERT INTO cart (product_id, product_type, user_id)
      VALUES ($1, $2, $3)
    `;
    await db.query(query, [product_id, product_type, user_id]);
    res.status(201).json({success:true, message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({success:false, error: 'An error occurred while adding the item to cart' });
  }
}

export const removeFromCart = async (req:Request, res:Response) => {
    const  {item_id} = req.params;

    try {
        await db.query('delete from cart where id=$1',[item_id])
        res.status(200).json({success:true, message: 'Item removed from cart successfully' });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      res.status(500).json({success:false, error: 'An error occurred while removing the item from cart' });
    }
}



export const getCart = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const query = `
      SELECT c.id AS cart_item_id,
            p.*
      FROM cart AS c
      JOIN ${sanitizeTableName(req.body.product_type)} AS p
      ON c.product_id = p.id
      WHERE c.user_id = $1
    `;

    const {rows} = await db.query(query, [user_id]);
    res.status(200).json({data:rows});
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'An error occurred while fetching cart items' });
  }
};

function sanitizeTableName(tableName: string): string {
  // Add any validation or sanitization logic you may need
  // For example, you can ensure that the tableName only contains allowed characters
  // and doesn't contain any potential SQL injection vulnerabilities.
  // For simplicity, this example just returns the tableName as is.
  return tableName;
}
