import error from "../utils/errorhandler.js"
import attendanceSessionService from "../service/attendanceSession.service.js"
import StudentAttendanceModel from "../models/StudentAttendance.model.js"


const createStudentAttendanceService = async ({ userId, attendanceSessionId }) => {


    // Get session with await
    const session = await attendanceSessionService.findSession(attendanceSessionId);


    if (!session) {
        throw error(404, 'Attendance session not found');
    }

    if (session.status === "COMPLETED") {
        throw error(400, 'Attendance session has ended');
    }


    const studentAttendance = new StudentAttendanceModel({
        user: userId,
        attendanceSession: attendanceSessionId
    });

    await studentAttendance.save();
    await StudentAttendanceModel.ensureIndexes();

    return studentAttendance;


}


export default {
    createStudentAttendanceService
}