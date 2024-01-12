import express from 'express'
import { signup } from '../controller/user.controller.js';

const router=express.Router()

router.get('/signup',signup)



export default router;
