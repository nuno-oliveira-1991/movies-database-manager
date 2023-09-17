import mongoose from "mongoose";

export default interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    roles: string[];
}