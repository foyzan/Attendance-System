

import error from "../utils/errorhandler.js";
import attendanceSessionService from "../service/attendanceSession.service.js";

const getEnable = async (req, res, next) => {
  try {
    const isSessionRunning = await attendanceSessionService.findSession();
    console.log(isSessionRunning);
    if (isSessionRunning) throw error(400, "attendance already running");

    const attendanceSession = await attendanceSessionService.createSession();
    return res.status(201).json({ message: "successful", attendanceSession });
  } catch (err) {
    next(err);
  }
};

const getDisable = async (req, res, next) => {
  try {
    const runningSession = await attendanceSessionService.findSession();
    if (!runningSession) throw error(400, "No running session available");

    runningSession.status = "COMPLETED";
    await runningSession.save();
    res.status(200).json(runningSession);
  } catch (err) {
    next(err);
  }
};

const getStatus = async (req, res, next) => {
  try {
    
    const status = await attendanceSessionService.getSessionStatus()
    res.status(200).json(status);
  } catch (err) {
    next(err);
  }
};

export default {
  getDisable,
  getEnable,
  getStatus,
};
