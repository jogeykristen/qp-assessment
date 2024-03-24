import express from 'express';
import {login, register, verify} from '../controller/userController'

const router = express.Router()

router.post("/register",register);
router.post("/verify",verify);
router.post("/login",login);

export default router