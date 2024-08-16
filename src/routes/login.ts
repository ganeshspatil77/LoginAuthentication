import { Router } from "express";
import { db } from "../db_connect";
import jwt from 'jsonwebtoken';

export const loginRouter = Router();

loginRouter.post('/login', async (req, res) => {

    try {
        const { usename, password } = req.body.criteria;
        console.log(usename, password);
        
        const user = await db.user.findFirst({
            where: {
                useName: usename
            }
        });

        if (usename && user?.Password == password) {
            const token = jwt.sign({
                email: user?.email,
                id: user?.id
            }, process.env.JWT_SEC as string)
            return res.status(200).json({ 
                errorCode:"000000",
                errorDescription:'success',
                data:{token:token} 
                });
        }

        if (!usename) {
            return res.json({
                message:'register first'
            })
        }
    } catch (error) {
        return res.json({
            errorCode:101010,
            errorDescription:'Invalid Crendentials'
        })
    }




})

loginRouter.post("/signup", async (req, res) => {
    try {
        const { usename, email, password } = req.body.criteria;

        const checkUser = await db.user.findFirst({
            where:{
                useName:usename
            }
        })

        if (checkUser) {
            return res.json({
                errorCode:999999,
                errorMessage:'user already present'
            })
        }

        const user = await db.user.create({
            data: {
                useName: usename,
                Password: password,
                email: email,
            }
        })
    
        return res.json({
            errorCode:"000000",
            errorDescription:'User created successfully.',
            data:[user]
         })
    } catch (error) {
        return res.json({
            errorCode:101010,
            errorDescription:'error'
        })
    }
 
})