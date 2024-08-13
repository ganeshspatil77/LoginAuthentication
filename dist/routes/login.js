"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_1 = require("express");
const db_connect_1 = require("../db_connect");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.loginRouter = (0, express_1.Router)();
exports.loginRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usname, pass } = req.body.criteria;
        const user = yield db_connect_1.db.user.findFirst({
            where: {
                useName: usname
            }
        });
        if (usname && (user === null || user === void 0 ? void 0 : user.Password) == pass) {
            const token = jsonwebtoken_1.default.sign({
                email: user === null || user === void 0 ? void 0 : user.email,
                id: user === null || user === void 0 ? void 0 : user.id
            }, process.env.JWT_SEC);
            return res.status(200).json({ token });
        }
        if (!usname) {
            return res.json({
                message: 'register first'
            });
        }
    }
    catch (error) {
        return res.json({
            errorDescription: 'Invalid Crendentials'
        });
    }
}));
exports.loginRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usename, email, password } = req.body.criteria;
        const checkUser = yield db_connect_1.db.user.findFirst({
            where: {
                useName: usename
            }
        });
        if (checkUser) {
            return res.json({
                errorMessage: 'user already present'
            });
        }
        const user = yield db_connect_1.db.user.create({
            data: {
                useName: usename,
                Password: password,
                email: email,
            }
        });
        return res.json({ user });
    }
    catch (error) {
        return res.json({});
    }
}));
