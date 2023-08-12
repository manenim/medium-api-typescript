import { NextFunction, Request, Response } from 'express'
import session from 'express-session'
import MongoDBStotre from 'connect-mongodb-session'
import config from '../config/dbConfig'

const mongoDBStotreSession = MongoDBStotre(session)

const store = new mongoDBStotreSession({
    uri: config.mongoUri,
    collection: 'mySessions'
})

// Catch errors
store.on('error', (error) => {
  console.log(error);
});

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return session({
        secret: 'some secret',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: (1000 * 60 * 60 * 24) * 7,
            secure: "auto",
            // sameSite: 'none',
        },
        store: store,
    })(req, res, next)
}

export default sessionMiddleware