import express from 'express'
import { updateUser } from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router=express.Router()
//
router.get('/check')
//update user
router.post('/update/:id',verifyToken,updateUser);




export default router;
