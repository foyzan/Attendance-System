import userModel from "../models/User.model.js"

export const findUserByProperty = (key, value)=>{

    if(key === '_id'){
        return userModel.findById(value);
    }

    return userModel.findOne({ [key] : value})
}

export const createNewUser = ({name, email, password, phone}) => {
    const user = new userModel({name, email, password, phone});
    return user.save()
}