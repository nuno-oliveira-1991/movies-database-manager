import UserRepository from '../repositories/UserRepository.js';
class UserService {
    async getAllUsers(page, limit, sortBy, sortOrder) {
        const sortParams = {
            [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc',
        };
        const result = await UserRepository.getAllUsers(page, limit, sortParams);
        const responseData = {
            users: result.users,
            currentPage: page,
            totalPages: Math.ceil(result.totalUsers / limit)
        };
        return responseData;
    }
    async updateMovie(userId, userData) {
        try {
            const updatedUser = await UserRepository.updateUser(userId, userData);
            return updatedUser;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteMovie(userId) {
        try {
            const deletedUser = await UserRepository.deleteUser(userId);
            return deletedUser;
        }
        catch (error) {
            throw error;
        }
    }
}
export default new UserService();
//# sourceMappingURL=UserService.js.map