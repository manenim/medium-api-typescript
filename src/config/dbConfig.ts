import dotenv from 'dotenv'

dotenv.config()

const mongoUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gckpzfq.mongodb.net/?retryWrites=true&w=majority`

export default { mongoUri }
