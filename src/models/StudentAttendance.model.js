import { model, Schema } from "mongoose";

const StudentAttendanceSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },

    attendanceSession: {
        type: Schema.Types.ObjectId,
        ref : 'AttendanceSession'
    },
    createdAt : Date
})


const StudentAttendance = model('StudentAttendance', StudentAttendanceSchema);

export default StudentAttendance