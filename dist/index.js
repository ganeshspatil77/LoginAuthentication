"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = require("./routes/login");
const user_1 = require("./routes/user");
const auth_1 = require("./middelwares/auth");
const app = (0, express_1.default)();
// (async () => {
//     await connectToMysql();
// })();
app.use(express_1.default.json());
app.use('/user', login_1.loginRouter);
app.use('/user', login_1.loginRouter);
app.use(auth_1.authMiddleware);
app.use('/user', user_1.userRouter);
app.use((err, req, res, next) => {
    res.status(500).send('Something broke!');
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server is on port ${port}.`);
});
