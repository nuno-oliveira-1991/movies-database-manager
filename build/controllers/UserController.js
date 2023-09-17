import UserService from '../services/UserService.js';
class UserController {
    async getAllUsers(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const sortBy = req.query.sortBy || 'name';
            const sortOrder = req.query.sortOrder || 'desc';
            const allUsers = await UserService.getAllUsers(page, limit, sortBy, sortOrder);
            console.log(allUsers);
            res.status(200).json(allUsers);
        }
        catch (error) {
            res.status(500).send({ errorMessage: 'Cannot get users', error: error });
        }
    }
    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updatedData = {
                name: req.body.name,
                email: req.body.email,
                roles: req.body.roles,
            };
            const updatedUser = await UserService.updateMovie(userId, updatedData);
            if (!updatedUser) {
                res.status(404).send({ errorMessage: 'User not found' });
            }
            console.log(updatedUser);
            res.status(200).json(updatedUser);
        }
        catch (err) {
            res.status(500).send({ errorMessage: 'Cannot update user', error: err });
        }
    }
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const deletedUser = await UserService.deleteMovie(userId);
            if (!deletedUser) {
                res.status(404).send({ errorMessage: 'User not found' });
            }
            console.log(deletedUser);
            res.status(200).json(deletedUser);
        }
        catch (err) {
            res.status(500).send({ errorMessage: 'Cannot delete user', error: err });
        }
    }
}
export default new UserController();
//# sourceMappingURL=UserController.js.map