import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length >= 3 && value.length <= 20;
            },
            message: 'Name must be at least 3 characters long.'
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: 'Email is not valid.'
        }
    },
    password: {
        type: String,
        required: true,
        set: function (password) {
            return password;
        },
        get: function (password) {
            return password;
        },
    },
    roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            default: '64e673c9635281f317cb8e03'
        }],
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
//# sourceMappingURL=userModel.js.map