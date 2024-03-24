import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.secretKey||'key'; // Replace with your actual secret key

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("token = ",token)

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    //const verifyOptions: VerifyOptions = { complete: true }; // Explicitly set complete property to true

//     jwt.verify(token, secretKey, verifyOptions, (err: Error | null, decoded: JwtPayload | undefined) => {
//         if (err) {
//             return res.status(403).json({ message: 'Failed to authenticate token.' });
//         }

//         // Attach decoded token data to request object
//         if (decoded) {
//             (req as any).user = decoded;
//         }
//         next();
//     });
// };

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
        return res.status(403).json({ message: 'Token verification failed' });
        }
        (req as any).user = decoded;
        console.log("user = ",(req as any).user)
        next();
    });
    }

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.userRole;

    if (userRole === 'admin') {
        next(); // Allow access to admin routes
    } else {
        return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
};

export const isUser = (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.userRole;
    console.log("userRole = ",userRole)
    if (userRole === 'user') {
        next(); // Allow access to user routes
    } else {
        return res.status(403).json({ message: 'Access denied. User role required.' });
    }
};
