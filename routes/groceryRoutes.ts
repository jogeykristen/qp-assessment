import express from 'express';
import {addGroceryItem,deleteOne,findId,showAll,updateGroceryItem} from '../controller/groceryController'
import { verifyToken,isAdmin, isUser} from '../middleware/authMiddleware'; 

const router = express.Router();

router.use(verifyToken);

router.post("/addItem",isAdmin,addGroceryItem)
router.post("/updateItem/:id",isAdmin,updateGroceryItem)
router.get("/showId/:id",isAdmin,findId)
router.get("/showAll",showAll)
router.delete("/delete/:id",isAdmin,deleteOne)


export default router