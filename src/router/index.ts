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

// user
router.get("/users", authMiddleware, userController.getAllUsers);
router.delete("/user", authMiddleware, userController.deleteUser);

// Movie
router.get("/movies", authMiddleware, movieController.getMovies);
router.get("/movies/:id", authMiddleware, movieController.getMovie);
router.post("/movies", authMiddleware, movieController.createMovie);
router.patch("/movies/:id", authMiddleware, movieController.updateMovie);
router.delete("/movies/:id", authMiddleware, movieController.deleteMovie);
router.get("/movies/rating/:id", authMiddleware, movieController.getRating);
router.post(
  "/movies/rating",
  body("rating").isFloat({ min: 1, max: 5 }),
  authMiddleware,
  movieController.addRating
);
router.get("/movies/similar/:id", authMiddleware, movieController.getSimilar);
