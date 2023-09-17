import UserAuthService from '../services/UserAuthService.js';
import RoleModel from './../models/roleModel.js';
import TokenService from '../services/TokenService.js';
import ApiError from '../utils/ApiError.js';
import { validationResult } from 'express-validator';
class UserAuthController {
    async register(req, res) {
        try {
            const errors = validationResult(req.body);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Error during registration.", errors });
            }
            const { name, email, password, roleIds } = req.body;
            const newUser = await UserAuthService.register(name, email, password, roleIds);
            const { accessToken } = TokenService.generateAccessToken(newUser);
            res.status(201).json({ accessToken: accessToken, user: newUser });
        }
        catch (error) {
            if (error instanceof ApiError) {
                console.log(error);
                res.status(error.status).json(error.errors);
            }
            else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const login = await UserAuthService.login(email, password);
            res.status(200).json(login);
        }
        catch (error) {
            if (error instanceof ApiError) {
                console.log(error);
                res.status(error.status).json(error.errors);
            }
            else {
                res.status(500).send('Internal Server Error');
            }
        }
    }
    async getAllRoles(req, res) {
        try {
            const allRoles = await UserAuthService.getAllRoles();
            console.log(allRoles);
            res.status(200).json(allRoles);
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
    async createRole(req, res) {
        try {
            const { name } = req.body;
            console.log(name);
            const newRole = { name };
            const savedRole = await UserAuthService.createRole(newRole);
            return res.status(201).json(savedRole);
        }
        catch (error) {
            console.log(error);
            res
                .status(500)
                .send('Failed to create role');
        }
    }
    async deleteRole(req, res) {
        try {
            const roleID = req.params.id;
            const deletedRole = await RoleModel.findByIdAndDelete(roleID);
            if (!deletedRole) {
                res.status(404).send('Role not found');
            }
            res.json(deletedRole);
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Failed to delete role');
        }
    }
}
export default new UserAuthController();
//# sourceMappingURL=UserAuthController.js.map