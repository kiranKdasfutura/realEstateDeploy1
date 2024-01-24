import express from 'express'
import { deleteUser, updateUser } from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router=express.Router()
//
router.get('/check')
//update user
router.post('/update/:id',verifyToken,updateUser);
router.delete("/delete/:id",verifyToken,deleteUser);



export default router;
