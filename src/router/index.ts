import { Router } from "express";
import { userController } from "../controllers/userController";
import { body } from "express-validator";
// import authMiddleware from "../middlewares/authMiddleware";

export const router = Router();

router.post("/login", userController.login);
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 16 }),
  userController.registration
);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);

// test
router.get("/users", userController.getAllUsers);
router.delete("/user", userController.deleteUser);
