import { Request, Response } from "express";
import { userService } from "../services/userService";
import { validationResult } from "express-validator";

class UserController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 60 * 24 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 60 * 24 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
  async getAllUsers(req: Request, res: Response) {
    const users = await userService.getAllUsers();
    res.json(users);
  }
  async deleteUser(req: Request, res: Response) {
    const { id } = req.body;
    const user = await userService.deleteUser(id);
    res.json(user);
  }
  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.refresh(refreshToken);
      res.cookie("refreshToken", token.refreshToken, {
        maxAge: 30 * 60 * 24 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(token);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
  async activate(req: Request, res: Response) {}
}

export const userController = new UserController();
