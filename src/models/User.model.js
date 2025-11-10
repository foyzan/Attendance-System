import {model, Schema, Types} from 'mongoose'


const UserSchema = new Schema({
    name : {
        type : String,
        required : true,
        minlength : 2,
        maxlenght : 50,
    },
    email :  {
        type: String,
        required: true,
        unique: true, // Ensures no two users can register with the same email
        trim: true,
        lowercase: true,
        // --- Mongoose Validator for Email Format ---
        validate: {
            validator: function(v) {
                // Regex for basic email validation
                // This pattern ensures the email contains a local part, an @, and a domain with at least two characters after the final dot.
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    phone : {
        type : String,
        required : true,
        minlength : 11,
        maxlenght : 40,
    },
    password : {type: String, required : true, minlength: 6},
    role : {type : [String], required : true, default : ['STUDENT']},
    accountStatus : {
        type : String,
        enum : ["PENDING", "ACTIVE", "Rejected", "BLOCKED"],
        default : 'PENDING',
        required : true
    }
})


const User = model('User', UserSchema);
export default User;
