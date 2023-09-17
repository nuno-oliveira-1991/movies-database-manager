import express from "express";
import UserAuthController from "../controllers/UserAuthController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { check } from "express-validator";

const router = express.Router();
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

router.post(
  "/register",
  [
    check("name", "Name can't be empty").notEmpty(),
    check("email", "Email can't be empty").notEmpty(),
    check("email", "Invalid email").isEmail(),
    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .matches(passwordRegex)
      .withMessage("Password must be safe and secure"),
  ],
  UserAuthController.register
);
router.post(
  "/login",
  [
    check("email", "Email can't be empty").notEmpty(),
    check("email", "Invalid email").isEmail(),
    check("password", "Password can't be empty").notEmpty(),
  ],
  UserAuthController.login
);

// Roles Router (not in use)
router.get(
  '/roles',
  UserAuthController.getAllRoles
);
router.post(
  "/roles", 
  check("name", "Name can't be empty").notEmpty(), 
  authMiddleware,
  UserAuthController.createRole
);
router.delete(
  '/roles/:id',
  authMiddleware,
  UserAuthController.deleteRole
);

export default router;
