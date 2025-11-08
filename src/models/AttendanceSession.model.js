import {model, Schema} from "mongoose";

const AttendanceSessionSchema = new Schema({
    timeLimit : Number,
    status : String,
    createdAt : Date
})


const AttendanceSession = model('AttendanceSession', AttendanceSessionSchema)

export default AttendanceSession