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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const passport_1 = __importDefault(require("passport"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    //check if email already exist in db
    const user = yield user_1.default.findOne({ email: email });
    if (user) {
        console.log(user);
        return res.status(400).json({ message: 'user already exist' });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    const newUser = new user_1.default({
        username,
        email,
        password: hashedPassword
    });
    const savedUser = yield newUser.save();
    return res.status(200).json({
        massage: 'successfully saved user to DB',
        status: 200,
        data: {
            username: savedUser.username,
            email: savedUser.email
        }
    });
});
const login = (req, res, next) => {
    passport_1.default.authenticate("local", (err, user, info) => {
        //@ts-ignore
        req.session.isAuth = true;
        if (!user)
            return res.status(401).json({ message: "username or password is not valid" });
        req.logIn(user, (err) => {
            if (err) {
                console.log(err);
            }
            console.log(user);
            return res.status(200).json({
                message: "successfully logged in",
                data: user,
                isAuth: req.isAuthenticated()
            });
        });
    })(req, res, next);
    // console.log(req.authInfo)
    // res.send('you are logged in')
    console.log(req.session);
};
exports.default = { register, login };
