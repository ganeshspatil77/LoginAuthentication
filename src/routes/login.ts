import { Router } from "express";
import { db } from "../db_connect";
import jwt from 'jsonwebtoken';
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '469626663033-m8jpdboe7mjl4nduei0fjqquuckl3i2q.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

export const loginRouter = Router();

loginRouter.post('/login', async (req, res) => {

    try {
        const { usename, password } = req.body.criteria;
        const user = await db.user.findFirst({
            where: { useName: usename }
        });
        if (!user) {
            return res.json({ errorCode: "999999", errorDescription: 'Register first', data: {} })
        }

        if (usename && user?.Password == password) {
            const token = jwt.sign({ email: user?.email, id: user?.id }, process.env.JWT_SEC as string)
            return res.status(200).json({ errorCode: "000000", errorDescription: 'success', data: { token: token } });
        } else {
            return res.json({ errorCode: "999999", errorDescription: 'Invalid Credentials', data: {} })
        }


    } catch (error) {
        return res.json({
            errorCode: 101010,
            errorDescription: 'Invalid Crendentials'
        })
    }




})

loginRouter.post("/signup", async (req, res) => {
    try {
        const { usename, email, password } = req.body.criteria;

        const checkUser = await db.user.findFirst({
            where: {
                useName: usename
            }
        })

        if (checkUser) {
            return res.json({
                errorCode: 999999,
                errorMessage: 'user already present'
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
            errorCode: "000000",
            errorDescription: 'User created successfully.',
            data: [user]
        })
    } catch (error) {
        return res.json({
            errorCode: 101010,
            errorDescription: 'error'
        })
    }

})