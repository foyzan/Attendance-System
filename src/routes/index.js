import { Router } from "express";

import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js"
import authenticator from "../middleware/authentication.middleware.js";

const router = Router()

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/user',authenticator,userRouter);

export default router