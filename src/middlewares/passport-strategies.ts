import { Strategy as LocalStrategy } from 'passport-local';
import passport from "passport"
import User, { IUser } from '../models/user';
import bcrypt from 'bcrypt'



// passport.deserializeUser((user, done) => done(null, user));



passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done): Promise<any> => {
    try {
        const user = await User.findOne({email: email})

        if (!user) return done(null, false)
        
        const matchPwd = await bcrypt.compare(password, user.password)
        
        if (!matchPwd) return done(null, false)
        return done(null, user)
    } catch (error) {
        done(error, false)
    }
}))


passport.serializeUser((user: any, done) => {
    done(null, {
      _id: user._id,
      username: user.username,
      email: user.email
    })
})

passport.deserializeUser(async ( id:string, done: any) => {
    
    

    try {
        const user = await User.findById(id)
        if(!user) return done(null, false)
        done(null, {
      _id: user._id,
      username: user.username,
      email: user.email
    })
    } catch (error) {
        console.log(error)
    }

})


export default passport