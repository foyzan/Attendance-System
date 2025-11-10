import error from "../utils/errorhandler.js"
import studentAttendanceService from "../service/studentAttendance.service.js";
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

       const studentAttendance = await studentAttendanceService.createStudentAttendanceService({ userId : req.user._id, attendanceSessionId : id })

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