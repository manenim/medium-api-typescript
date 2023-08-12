import { Request, Response } from 'express'

export const getPosts = (req: Request, res: Response) => {
    //@ts-ignore
    // req.session.isAuth = true
    console.log(req.session)
    res.send('fetched all posts')
}
