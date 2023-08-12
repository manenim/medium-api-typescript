import express from 'express'
import auth from '../controllers/auth'
import { authenticate } from 'passport'

const router = express.Router()

router.post('/register', auth.register)
router.post('/login', auth.login)

export default router