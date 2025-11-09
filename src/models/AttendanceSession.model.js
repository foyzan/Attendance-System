import { model, Schema } from "mongoose";

const AttendanceSessionSchema = new Schema(
  {
    timeLimit: {
        type : Number,
        required : true,
        max : 30,
        min : 5,
        default : 5
    },
    status: {
        type : String,
        required : true,
        enum : ['RUNNING', 'COMPLETED'],
        default : 'RUNNING'
    }
  },
  { timestamps: true }
);

const AttendanceSession = model("AttendanceSession", AttendanceSessionSchema);

export default AttendanceSession;
