
import express from 'express'
import { signup, singnIn } from '../controller/auth.controller.js'

const router=express.Router()

//signUP user
router.post('/signup',signup)
router.post("/signin", singnIn);


export default router