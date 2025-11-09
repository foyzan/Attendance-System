import { model, Schema } from "mongoose";

const StudentAttendanceSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    attendanceSession: {
        type: Schema.Types.ObjectId,
        ref : 'AttendanceSession',
        required : true
    },
   
}, {
    timestamps: true
})
/**
 * Add the Unique Compound Index
 * 
 * same user will not be able to attend twice
 */
StudentAttendanceSchema.index({ 
    user: 1, 
    attendanceSession: 1 
}, { 
    unique: true 
});

const StudentAttendance = model('StudentAttendance', StudentAttendanceSchema);

export default StudentAttendance