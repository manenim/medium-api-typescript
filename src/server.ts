import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import postRoutes from './routes/posts'
import sessionMiddleware from './middlewares/session';
import { Strategy as LocalStrategy } from 'passport-local';
import AuthRoutes from './routes/auth'
import passport from 'passport';
import bcrypt from 'bcrypt';
import User from './models/user';
import session from 'express-session'
import MongoDBStotre from 'connect-mongodb-session'

import './middlewares/passport-strategies'


dotenv.config()


const port = process.env.PORT

const startServer = () => {
    const app = express()




    app.use(express.json())
    app.use(express.urlencoded({ extended: false }));
    app.use(cors({
    origin: 'http://127.0.0.1:5173', // Set the origin of your frontend application
    credentials: true, // Allow credentials (cookies, authentication headers, etc.)
    }));
    app.use(sessionMiddleware)
    app.use(passport.initialize())
    app.use(passport.session())
    

    app.get('/', (req: Request, res: Response) => {
        // @ts-ignore
        req.session.isAuth = true
        console.log(req.session)
        res.send('hello again')
    })

    app.use('/auth', AuthRoutes)
    app.use('/posts', postRoutes)

    app.listen(port, () => console.log(`server is listening at port ${port}`))
}

export default startServer
