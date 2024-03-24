import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const secretKey: string = process.env.secretKey  || 'key';
function generateVerificationCode(): string {
    const min = 100000; 
    const max = 999999; 
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
}


export const register = async(req: Request, res: Response)=>{
    const {id,username,email, password, role,isVerified} = req.body;
    console.log("username = ",username,"email = ",email,"password = ",password,"role = ",role,"isVerified = ",isVerified)
    try{
        // const checkId = await User.findByPk(id)
        // if(checkId){
        //     return res.status(400).json({
        //         message:"This id is already taken"
        //     })
        // }
        const checkUser = await User.findOne({ where: { email } });
        console.log("checkUser = ",checkUser)
        if(checkUser){
            return res.status(400).json({
                message: "This mail id is already taken"
            })
        }
        var hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = generateVerificationCode(); 
        const newUser = await User.create({username,email,password: hashedPassword,role,isVerified,verificationCode: verificationCode})
        return res.status(200).json({
            message:"User Created",
            verificationCode: verificationCode
        })
    }catch(err){
        console.log("error = ",err);
        return res.status(500).json({
            error:"Internal server error"
        })
    }
    

}

export const verify = async(req: Request, res:Response)=>{
    const{verificationCode,email} = req.body;
    try{
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if(user.verificationCode == verificationCode){
            await user.update({isVerified:true})
            return res.status(200).json({
                message:"User verified successfully"
            })
        }else{
            return res.status(400).json({
                error:"Invalid verification code"
            })
        }
    }catch(err){
        console.log("error = ",err);
        return res.status(500).json({
            error:"Internal server error"
        })
    }
}

export const login =  async(req: Request, res:Response)=>{
    const {email,password} = req.body;
    try{
        const checkUser = await User.findOne({where:{email}})
        if(!checkUser){
            return res.status(404).json({
                message:"No user found"
            })
        }
        if(!checkUser.isVerified){
            return res.status(404).json({
                message:"This user is not verified"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, checkUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }
        const token = jwt.sign({ email: checkUser.email,userRole: checkUser.role }, secretKey, { expiresIn: '1h' });
        //userId: checkUser.id, 
        return res.status(200).json({
            token
        })
    }catch(err){
        console.log("error = ",err);
        return res.status(500).json({
            error:"Internal server error"
        })
    }
}