import { Request, Response  } from "express";
import GroceryItem from "../models/GroceryItem";


export const addGroceryItem = async(req: Request, res: Response)=>{
    const {name,price,quantity} = req.body;
    console.log("name = ",name,"price = ",price,"quantity = ",quantity)
    try{
        const existingItem = await GroceryItem.findOne({ where: { name } });
        if (existingItem) {
            console.log("inside");
            return res.status(400).json({ error: 'Item with the same name already exists' });
        }
        const newGroceryItem = await GroceryItem.create({name, price, quantity })
        res.status(201).json({
            message: 'Grocery item created successfully',
            data: newGroceryItem
        });
    }catch(err){
        console.log("error = ",err);
        res.status(500).json({error:"Internal server error"})
    }
}

export const updateGroceryItem = async(req: Request, res: Response)=>{
    const itemId = req.params.id;
    const {name, price, quantity} = req.body;
    try{
        const groceryItem = await GroceryItem.findByPk(itemId)
        if(!groceryItem){
            return res.status(404).json({error:"Item not found"})
        }
        groceryItem.name = name;
        groceryItem.price = price;
        groceryItem.quantity = quantity;

        await groceryItem.save()
        return res.status(200).json({
            message:"Item updated successfully",
            data: groceryItem
        })
    }catch(err){
        console.log("error = ",err);
        return res.status(500).json({
            error:"Internal server error"
        })
    }
}

export const findId = async(req: Request, res: Response)=>{
    const groceryId = req.params.id;
    console.log("id = ",groceryId)
    try{
        const Item = await GroceryItem.findByPk(groceryId)
        if(! Item){
            return res.status(404).json({
                error:"No Item found"
            })
        }
        return res.status(200).json({
            data:Item
        })
    }
    catch(err){
        console.log("error = ",err)
        return res.status(500).json({error:"Internal server error"})
    }
}

export const showAll = async(req: Request, res: Response)=>{
    try{
        const showAllItems = await GroceryItem.findAll()
        if(! showAllItems){
            return res.status(404).json({
                message:"No data found"
            })
        }
        return res.status(200).json({
            data: showAllItems
        })
    }catch(err){
        console.log("error = ",err);
        return res.status(500).json({
            error:"Internal server error"
        })
    }
    
}

export const deleteOne = async(req: Request, res: Response)=>{
    const deleteId = req.params.id;
    try{
        var deletedItem = await GroceryItem.findByPk(deleteId)
        if(!deletedItem){
            return res.status(404).json({
                message:"No Item found"
            })
        }
        var result = await deletedItem.destroy();
        return res.status(200).json({
            message:"Item deleted successfully"
        })
    }catch(err){
        console.log("error = ",err)
        return res.status(500).json({
            error:"Internal server error"
        })
    }
}