import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../models/user";
import passport from 'passport'
import LocalStrategy from 'passport-local'


const register = async (req: Request, res: Response): Promise<any> => {
    const { username, email, password } = req.body

    //check if email already exist in db
    const user = await User.findOne({ email: email })
    
    if (user) {
        console.log(user)
        return res.status(400).json({ message: 'user already exist' })
    } 
    
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    const savedUser = await newUser.save()
    

    return res.status(200).json({
        massage: 'successfully saved user to DB',
        status: 200,
        data: {
            username: savedUser.username,
            email: savedUser.email
        }
    })
}

const login = (req: Request, res: Response, next: NextFunction) => {

    passport.authenticate("local", (err: any, user: any, info: any) => {
        //@ts-ignore
        req.session.isAuth = true
        if (!user) return res.status(401).json({ message: "username or password is not valid" })
        req.logIn(user, (err) => {
            if (err) {
                console.log(err)
            }
            console.log(user)
            return res.status(200).json({
                message: "successfully logged in",
                data: user,
                isAuth: req.isAuthenticated()
            })
        })
    })(req, res, next)
    // console.log(req.authInfo)
    // res.send('you are logged in')
    console.log(req.session)
}

export default { register, login }

