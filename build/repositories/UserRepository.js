import UserModel from '../models/userModel.js';
class UserRepository {
    async getAllUsers(page, limit, sortParams) {
        try {
            console.log('Fetching all users...');
            const skip = (page - 1) * limit;
            const countPromise = UserModel.countDocuments();
            const dataPromise = UserModel.find()
                .sort(sortParams)
                .skip(skip)
                .limit(limit);
            const [totalUsers, users] = await Promise.all([countPromise, dataPromise]);
            return { totalUsers, users };
        }
        catch (error) {
            console.error('Error finding users:', error);
            throw error;
        }
    }
    async getOneUser(userId) {
        try {
            return await UserModel.findById(userId);
        }
        catch (error) {
            console.error('Error finding user:', error);
            throw error;
        }
    }
    async createUser(userData) {
        try {
            const newUser = new UserModel(userData);
            return await newUser.save();
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    async updateUser(userId, userData) {
        try {
            return await UserModel.findByIdAndUpdate(userId, userData, { new: true });
        }
        catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
    async deleteUser(userId) {
        try {
            return await UserModel.findByIdAndDelete(userId);
        }
        catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
}
export default new UserRepository();
//# sourceMappingURL=UserRepository.js.map