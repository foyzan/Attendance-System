import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { createNewUser, findUserByProperty } from "./user.service.js";
import error from '../utils/errorhandler.js';

export const registerService = async ({ name, email, password, phone }) => {
    const isUserExit = await findUserByProperty('email', email)
    if (isUserExit) {
        throw error(404, "email already exit")
    }

    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);

    const user = await createNewUser({name, email, password : hash, phone})
  
    return user;
}


export const loginService = async ({ email, password }) => {
    const isUserExit = await findUserByProperty('email', email)
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