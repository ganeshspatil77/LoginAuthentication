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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const db_connect_1 = require("../db_connect");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usename, email, password, id } = req.body.criteria;
    const user = yield db_connect_1.db.user.update({
        where: {
            id: id
        },
        data: {
            useName: usename,
            email: email
        }
    });
    return res.json({
        successMessage: 'User UPdated SuccessFully..',
        user
    });
}));
exports.userRouter.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body.criteria;
    const user = yield db_connect_1.db.user.delete({
        where: {
            id: id
        }
    });
    if (!user) {
        return res.json({
            errorMessage: 'User Not present'
        });
    }
    return res.json({
        successMessage: 'User Delete successfully..'
    });
}));
