import { Router } from "express";
import userController from "../controller/user.controller.js";


const router = Router();


/**
 * get a use by ID or email
 * 
 */
router.get('/:userId',userController.getUserByID)

/**
 * update user by PATCH
 */
router.patch('/:userId', userController.patchUserByID)
/**
 * update user by PUT
 */
router.put('/:userId', ()=>{})


/**
 * delete user by ID or email
 */
router.delete('/:userId', userController.deleteUserByID)


/**
 * get all user
 * 
 */
router.get('/', userController.getUser)


/**
 * create user
 */
router.post('/',userController.postUser)



export default router