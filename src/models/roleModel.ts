import mongoose from 'mongoose';
import IRole from '../interfaces/RoleInterface.js'

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  }
});

const RoleModel = mongoose.model<IRole>("Role", RoleSchema);

export default RoleModel;