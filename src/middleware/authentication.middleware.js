import jwt from 'jsonwebtoken';
import userModel from '../models/User.model.js'
const authenticator = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Authorization error" });
  }
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "1234");
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({ message: "invalid token" });
  }
};


export default authenticator
