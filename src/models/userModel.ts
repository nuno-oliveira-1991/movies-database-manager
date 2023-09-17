import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import IUser from '../interfaces/UserInterface.js';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        return value.length >= 3 && value.length <=20;
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
      validator: function (value: string) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: 'Email is not valid.'
    }
  },
  password: {
    type: String,
    required: true,
    set: function (this: IUser, password: string): string {
      // Hash password before storing it
      return password;
    },
    get: function (this: IUser, password: string): string {
      // Return hashed password when accessed
      return password;
    },
  },
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    default: '64e673c9635281f317cb8e03'
  }],
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;