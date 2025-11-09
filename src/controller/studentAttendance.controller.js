import error from "../utils/errorhandler.js"
import attendanceSessionService from "../service/attendanceSession.service.js"
import StudentAttendanceModel from "../models/StudentAttendance.model.js"
const getAttendance = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw error(400, 'Session ID is required');
        }

        // Validate session ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw error(400, 'Invalid session ID format');
        }

        // Get session with await
        const session = await attendanceSessionService.findSession(id);
        if (!session) {
            throw error(404, 'Attendance session not found');
        }

        if (session.status === "COMPLETED") {
            throw error(400, 'Attendance session has ended');
        }
        

        const studentAttendance = new StudentAttendanceModel({
            user: req.user._id,
            attendanceSession: id
        });

        await studentAttendance.save();
        await StudentAttendanceModel.ensureIndexes();


        res.status(201).json({
            message: 'Attendance marked successfully',
            attendance: studentAttendance
        });

    } catch (err) {
        // Handle duplicate key error explicitly
        if (err.code === 11000) {
            return next(error(400, 'Attendance already marked for this session'));
        }
        next(err);
    }
}

const getAttendanceStatus = (req, res, next) => { }


export default {
    getAttendance,
    getAttendanceStatus
}