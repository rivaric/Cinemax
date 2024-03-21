import { Router } from "express";
import { userController } from "../controllers/userController";
import { movieController } from "../controllers/movieControlle";
import { body } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware";

export const router = Router();

// Auth
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 16 }),
  userController.login
);
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 16 }),
  userController.registration
);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);

// test
router.get("/users", authMiddleware, userController.getAllUsers);
router.delete("/user", authMiddleware, userController.deleteUser);

// Movie
router.get("/movies", authMiddleware, movieController.getMovies);
router.get("/movies/:id", authMiddleware, movieController.getMovie);
router.post("/movies", authMiddleware, movieController.createMovie);
router.patch("/movies/:id", authMiddleware, movieController.updateMovie);
router.delete("/movies/:id", authMiddleware, movieController.deleteMovie);

// Actor
// router.get("/actors", authMiddleware, actorController.getActors);
// router.get("/actors/:id", authMiddleware, actorController.getActor);
// router.post("/actors", authMiddleware, actorController.createActor);

// Director
// router.get("/director", authMiddleware, directorController.getDirector);
// router.get("/director/:id", authMiddleware, directorController.getDirector);
// router.post("/director", authMiddleware, directorController.createDirector);
