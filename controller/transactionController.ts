// import { Request, Response } from 'express';
// import Transaction from '../models/transaction';
// import User from '../models/User';
// import GroceryItem from '../models/GroceryItem';

// export const createTransaction = async (req: Request, res: Response) => {
//     const { customer_id, product_id, quantity, total_price } = req.body;

//     try {
//         // Check if the customer with the provided customer_id exists
//         const customer = await User.findByPk(customer_id);
//         if (!customer) {
//             return res.status(404).json({ message: 'Customer not found' });
//         }

//         // Check if the product with the provided product_id exists
//         const product = await GroceryItem.findByPk(product_id);
//         if (!product) {
//             return res.status(404).json({ message: `Product with ID ${product_id} not found` });
//         }

//         // Create the transaction
//         const transaction = await Transaction.create({ 
//             // customer_id, 
//             // product_id, 
//             quantity,
//             total_price,
//         });

//         return res.status(201).json({ message: 'Transaction created successfully', transaction });
//     } catch (error) {
//         console.error('Error creating transaction:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };


import { Request, Response } from 'express';
import Transaction from '../models/transaction';
import User from '../models/User';
import TransactionItem from '../models/transactionItem';
import GroceryItem from '../models/GroceryItem';

export const createTransaction = async (req: Request, res: Response) => {
    const { customer_id, items } = req.body;

    try {
        // Check if the customer with the provided customer_id exists
        const customer = await User.findByPk(customer_id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Calculate the total price of the transaction
        let totalPrice = 0;
        for (const item of items) {
            const { product_id, quantity } = item;
            const product = await GroceryItem.findByPk(product_id);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${product_id} not found` });
            }
            totalPrice += product.price * quantity;
        }

        // Create the transaction
        const transaction = await Transaction.create({ customer_id, total_price: totalPrice, createdAt: new Date() });

        // Create transaction items
        for (const item of items) {
            const { product_id, quantity } = item;
            await TransactionItem.create({ transaction_id: (transaction as any).id, product_id, quantity });
        }

        return res.status(201).json({ message: 'Transaction created successfully', transaction });
    } catch (error) {
        console.error('Error creating transaction:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

