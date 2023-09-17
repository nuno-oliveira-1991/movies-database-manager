import IUser from '../interfaces/UserInterface.js'
import UserModel from '../models/userModel.js'
import UserRepository from '../repositories/UserRepository.js';

class UserService {
  async getAllUsers(
    page: number, 
    limit: number, 
    sortBy: string, 
    sortOrder: string, 
  ) {    
    const sortParams: {[key: string]: 'asc' | 'desc'} = {
      [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc',
  };
  const result = await UserRepository.getAllUsers(page, limit, sortParams)
  const responseData = {
      users: result.users,
      currentPage: page,
      totalPages: Math.ceil(result.totalUsers / limit)
  }
  return responseData;
  }
  async updateMovie(userId: string, userData: IUser): Promise<IUser | null> {    
    try {
        const updatedUser = await UserRepository.updateUser(userId, userData)
        return updatedUser;
    } catch (error) {
        throw error
    }
  }
  async deleteMovie(userId: string): Promise<IUser | null> {    
    try {
        const deletedUser = await UserRepository.deleteUser(userId)
        return deletedUser;
    } catch (error) {
        throw error
    }
  }
}

export default new UserService();