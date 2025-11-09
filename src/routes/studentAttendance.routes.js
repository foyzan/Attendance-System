import { Router } from "express";

import studentAttendanceController from "../controller/studentAttendance.controller.js";
const router = Router()

router.get('/status', studentAttendanceController.getAttendanceStatus)
router.get('/:id', studentAttendanceController.getAttendance)


export default router