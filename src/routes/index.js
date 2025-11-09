import { Router } from "express";


// Router
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js"
import attendanceSessionRouter from "./attendanceSession.routes.js";
import studentAttendanceRouter from "./studentAttendance.routes.js";


// Middleware
import authenticator from "../middleware/authentication.middleware.js";
import StudentAttendance from "../models/StudentAttendance.model.js";

const router = Router()

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/user',authenticator,userRouter);
router.use('/api/v1/admin/attendance',authenticator,attendanceSessionRouter)
router.use('/api/v1/student/attendance',authenticator, studentAttendanceRouter)

export default router