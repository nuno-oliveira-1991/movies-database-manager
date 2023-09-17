import IUser from '../interfaces/UserInterface.js';
import UserModel from '../models/userModel.js';
import IRole from '../interfaces/RoleInterface.js';
import RoleModel from '../models/roleModel.js';
import UserRepository from '../repositories/UserRepository.js';
import RoleRepository from '../repositories/RoleRepository.js';
import TokenService from './TokenService.js';
import ApiError from './../utils/ApiError.js'
import bcrypt from 'bcryptjs';

class UserAuthService {
  async getAllUsers() {
    try {
      const allUsers: IUser[] = await UserModel.find()
        .populate('roles')
        .select('-password');
      return allUsers;
    } catch (error) {
      throw error
    }
  }
  async register(name: string, email: string, password: string, roleIds: string[] = []): Promise<IUser> {
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw ApiError.BadRequestError('Registration failed', [
          {field: 'email', message: `User ${name} already exists` }
        ]);
      }
      const hash = await bcrypt.hash(password, 10);
      const rolesToAssign = roleIds.length > 0 ? roleIds : ['64e673c9635281f317cb8e03'];
      const newUser: IUser = new UserModel({
        name,
        email,
        password: hash,
        roles: rolesToAssign,
      });
      const savedUser = await UserRepository.createUser(newUser);
      return savedUser;
    } catch (error) {
      throw error
    }
  }
  async login(email: string, password: string) {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw ApiError.BadRequestError('Authentication failed', [
          { field: 'email', message: 'User is not registered' },
        ]);
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw ApiError.BadRequestError('Authentication failed', [
          { field: 'password', message: 'Invalid password' },
        ]);
      }
      const { accessToken } = TokenService.generateAccessToken(user);
      return { accessToken, user };
    } catch (error) {
      throw error
    }
  }
  async getAllRoles () {
    try {
      const allRoles: IRole[] = await RoleModel.find()
      return allRoles;
    } catch (error) {
      throw error
    }
  }
  async createRole(newRole: IRole) {    
    try {
        const existingRole = await RoleModel.findOne(newRole);
        if (existingRole) {
          throw ApiError.BadRequestError('Failed to create role', [
            { field: 'role', message: `Role ${newRole.name} already exists`}
          ]);
        }
        const savedRole = await RoleRepository.createRole(newRole);
        return savedRole;
    } catch (error) {
        throw error
    }
  }
  async deleteRole(roleId: string) {    
    try {
        const roleToDelete = await RoleRepository.deleteRole(roleId)
        if (!roleToDelete) {
          throw ApiError.NotFoundError('Failed to delete role', [
            { field: 'password', message: 'Role not found' },
          ]);
        }
        return roleToDelete;
    } catch (error) {
        throw error
    }
  }
}

export default new UserAuthService();