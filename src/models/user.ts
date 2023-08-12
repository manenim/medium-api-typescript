import mongoose, { Schema } from 'mongoose'

export interface IUser {
    username: string;
    email: string;
    password: string;
}


const UserSchema = new Schema({
    username: String,
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
})

export default mongoose.model<IUser>('User', UserSchema)
