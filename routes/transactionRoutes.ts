import express from 'express';
import { createTransaction } from '../controller/transactionController';
import { verifyToken,isAdmin, isUser} from '../middleware/authMiddleware'; 

const router = express.Router();

router.use(verifyToken);

router.post("/createOrder",isUser,createTransaction)


export default router