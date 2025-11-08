import {model, Schema} from 'mongoose';


const ProfileSchema = new Schema({
    user: {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    profilePicture: String
})


const Profile = model('Profile', ProfileSchema);
export default Profile;