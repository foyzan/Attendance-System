import { Router } from "express";

import attendanceSessionController from "../controller/attendanceSession.controller.js";
const router = Router()

router.get('/enable', attendanceSessionController.getEnable)
router.get('/disable', attendanceSessionController.getDisable)
router.get('/status', attendanceSessionController.getStatus)


export default router