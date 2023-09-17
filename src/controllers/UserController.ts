import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService.js';
import IUser from '../interfaces/UserInterface.js';
import ApiError from '../utils/ApiError.js';

class UserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const sortBy = req.query.sortBy as string || 'name';
      const sortOrder = req.query.sortOrder as string || 'desc'
      const allUsers = await UserService.getAllUsers(page, limit, sortBy, sortOrder);
      console.log(allUsers)
      res.status(200).json(allUsers)
    } catch (error) {
      res.status(500).send({ errorMessage: 'Cannot get users', error: error })
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
        const userId = req.params.id;
        const updatedData = {
            name: req.body.name, 
            email: req.body.email, 
            roles: req.body.roles,
        } as IUser;
        const updatedUser = await UserService.updateMovie(userId, updatedData)
        if (!updatedUser) {
          res.status(404).send({ errorMessage: 'User not found' })
        }
        console.log(updatedUser)
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).send({ errorMessage: 'Cannot update user', error: err })
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
        const userId = req.params.id;
        const deletedUser = await UserService.deleteMovie(userId)
        if (!deletedUser) {
            res.status(404).send({ errorMessage: 'User not found' })
        }
        console.log(deletedUser)
        res.status(200).json(deletedUser)
    } catch (err) {
        res.status(500).send({ errorMessage: 'Cannot delete user', error: err })
    }
  }
}

export default new UserController();






