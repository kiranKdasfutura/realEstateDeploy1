
import express from 'express'
import { google, signOut, signup, singnIn } from '../controller/auth.controller.js'

const router=express.Router()

//signUP user
router.post('/signup',signup)
router.post("/signin", singnIn);
router.post("/google",google)
router.get('/signout',signOut)
export default router