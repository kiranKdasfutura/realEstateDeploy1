
import express from 'express'
import { google, signup, singnIn } from '../controller/auth.controller.js'

const router=express.Router()

//signUP user
router.post('/signup',signup)
router.post("/signin", singnIn);
router.post("/google",google)

export default router