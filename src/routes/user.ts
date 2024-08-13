import { Router } from "express";
import { db } from "../db_connect";
import jwt from 'jsonwebtoken';
export const userRouter = Router();

userRouter.post("/update", async (req, res) => {
    const { usename, email, password, id } = req.body.criteria;

    const user = await db.user.update({
        where:{
            id:id
        },
        data:{
            useName : usename,
            email : email
        }
    })

    return res.json({
        successMessage:'User UPdated SuccessFully..',
        user
    })
})

userRouter.delete("/delete", async (req, res) => {
    const { id } = req.body.criteria;

    const user = await db.user.delete({
        where:{
            id:id
        }
    })

    if (!user) {
        return res.json({
            errorMessage:'User Not present'
        })
    }

    return res.json({
        successMessage:'User Delete successfully..'
    })
})