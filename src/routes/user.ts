import { Router } from "express";
import { db } from "../db_connect";
const nodemailer = require('nodemailer');
import { generateOTP } from "../helper/otphelper";
import jwt from 'jsonwebtoken';
export const userRouter = Router();

userRouter.post("/update", async (req, res) => {
    const { usename, email, password, id } = req.body.criteria;

    const user = await db.user.update({
        where: {
            id: id
        },
        data: {
            useName: usename,
            email: email
        }
    })

    return res.json({
        successMessage: 'User UPdated SuccessFully..',
        user
    })
})

userRouter.delete("/delete", async (req, res) => {
    const { id } = req.body.criteria;

    const user = await db.user.delete({
        where: {
            id: id
        }
    })

    if (!user) {
        return res.json({
            errorMessage: 'User Not present'
        })
    }

    return res.json({
        successMessage: 'User Delete successfully..'
    })
})

userRouter.post("/send-mail", async (req, res) => {
    try {
        const { email } = req.body.criteria;
        const otp = generateOTP();

        const user = await db.user.update({
            where: { email: email },
            data: {
                otp: otp
             }
        });


    
        


        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'ganeshp00137@gmail.com',
                pass: 'lrgvyxtgfdgsvnot',
            },
        });

        const mailOptions = {
            to: email,
            subject: 'Test mail',
            text: 'Hello Harshada',
            html: '<b>OTP is ' + otp + '</b>',
        };

        const info = await transporter.sendMail(mailOptions);

        // Success response
        res.status(200).json({ message: 'Email sent successfully', info });
    } catch (error) {
        // Error response
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email', error });
    }
})