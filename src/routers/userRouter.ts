import express from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  '/users', 
  UserController.getAllUsers
);
router.put(
  '/users/:id', 
  authMiddleware,
  UserController.updateUser
);
router.delete(
  '/users/:id', 
  authMiddleware,
  UserController.deleteUser
);

export default router;