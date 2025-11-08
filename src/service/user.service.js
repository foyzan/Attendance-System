import userModel from "../models/User.model.js";

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return userModel.findById(value);
  }

  return userModel.findOne({ [key]: value });
};

const createNewUser = ({
  name,
  email,
  password,
  phone,
  role,
  accountStatus,
}) => {
  const user = new userModel({
    name,
    email,
    password,
    phone,
    role: role ? role : ["STUDENT"],
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });
  return user.save();
};

const findUser = () => {
  return userModel.find();
};

export default {
  findUserByProperty,
  createNewUser,
  findUser,
};
