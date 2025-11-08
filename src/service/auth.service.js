import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import userService from "./user.service.js";
import error from '../utils/errorhandler.js';

const registerService = async ({ name, email, password, phone, role, accountStatus}) => {
    const isUserExit = await userService.findUserByProperty('email', email)
    if (isUserExit) {
        throw error(404, "email already exit")
    }

    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);

    const user = await userService.createNewUser({name, email, password : hash, phone, role, accountStatus})
  
    return user;
}


const loginService = async ({ email, password }) => {
    const isUserExit = await userService.findUserByProperty('email', email)
    if (!isUserExit) {
        
        throw error(400, "wrong credential");
    }

    const isPasswordValid = await bcrypt.compare(password, isUserExit.password)
    if (!isPasswordValid) {
       throw error(400, "wrong credential");
    }

    const payload = {
        _id : isUserExit._id,
        name : isUserExit.name,
        email : isUserExit.email,
        role : isUserExit.email,
        accountStatus : isUserExit.accountStatus        
    }
    return  jwt.sign(payload, "1234", { expiresIn: '1h' })

   
}


export default {
    registerService,
    loginService
}