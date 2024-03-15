import { Request, Response } from "express";
import { tokenService } from "../services/tokenService";
export default function (req: Request, res: Response, next?: any) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const tokenVerify = tokenService.validateAccsessToken(accessToken);
    if (!tokenVerify) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  } catch (err) {
    next(err);
  }
}
