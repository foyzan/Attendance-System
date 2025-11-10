
import AttendanceSessionModel from "../models/AttendanceSession.model.js"
import { addMinutes, isAfter } from "date-fns";
import error from "../utils/errorhandler.js";
const createSession = async () => {
    const attendanceSession = new AttendanceSessionModel({})
    await attendanceSession.save()
    return attendanceSession
}

const findSession = async (data = null)=>{
    if(data){
        const Session = await AttendanceSessionModel.findById(data);
        return Session 
    }

    const isSessionRunning = await AttendanceSessionModel.findOne({status : 'RUNNING'});
    return isSessionRunning; 
}

const getSessionStatus = async(data = null) =>{
    const runningSession = await findSession(data);


    if (!runningSession) throw error(400, "No running session available");

    const timeLimit = addMinutes(
      new Date(runningSession.createdAt),
      runningSession.timeLimit
    );
    const isSessionCompleted = isAfter(new Date(), timeLimit);
    if (isSessionCompleted) {
      runningSession.status = "COMPLETED";
    }

    await runningSession.save();

    return runningSession;
}


export default {
    createSession,
    findSession,
    getSessionStatus
}