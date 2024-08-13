import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.headers

    const isVerified = jwt.verify(token as string, process.env.JWT_SEC as string);
        
    if (isVerified) {
        next();
    }
    } catch (error) {
        res.json({
            message: "Invalid Auth Headers"
        })
        
    }
    

}