import userService from "../service/user.service.js";
import error from "../utils/errorhandler.js";
import authService from "../service/auth.service.js";
const getUser = async (req, res, next) => {
  /**
   * TODO: filter, sort, pagination, select
   */

  try {
    const user = await userService.findUser();
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const postUser = async (req, res, next) => {
  if(!req.body) throw error(404, 'json body is required')
  const { name, email, password, phone, role, accountStatus } = req.body;
  if (!name || !email || !password || !phone) {
    throw error(400, "All fields (name, email, password, phone) are required");
  }

  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      phone,
      role,
      accountStatus,
    });

    res.status(201).json({ message: "user created successfully", user });
  } catch (err) {
    next(err);
  }
};

const getUserByID = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await userService.findUserByProperty("_id", userId);

    if (!user) {
      throw error(404, "user not found");
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const patchUserByID =  async(req, res, next) => {

  if(!req.body) throw error(404, 'json body is required')

  const { name,phone, role, accountStatus } = req.body;

  try {
    const { userId } = req.params;

    const user = await userService.findUserByProperty('_id', userId);
    if (!user) {
      throw error(404, "user not found");
    }

  
    user.name = name ?? user.name;
    user.phone = phone ?? user.phone;
    user.role = role ?? user.role;
    user.accountStatus = accountStatus ?? user.accountStatus;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err)
  }

};

const putUserByID = (req, res, next) => {};

const deleteUserByID = async (req, res, next) => {

    try {
    const { userId } = req.params;

    const user = await userService.findUserByProperty("_id", userId);

    if (!user) {
      throw error(404, "user not found");
    }

    await user.deleteOne()
    res.status(203).send();
  } catch (err) {
    next(err);
  }
};

export default {
  getUser,
  postUser,
  getUserByID,
  patchUserByID,
  putUserByID,
  deleteUserByID,
};
