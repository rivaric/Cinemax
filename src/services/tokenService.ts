import jwt, { Secret } from "jsonwebtoken";
import { UserDto } from "../dtos/userDto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TokenService {
  generateToken(payload: UserDto) {
    const accessToken = jwt.sign(
      payload,
      <Secret>process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "30m",
      }
    );
    const refreshToken = jwt.sign(
      payload,
      <Secret>process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return { accessToken, refreshToken };
  }

  validateAccsessToken(token: string) {
    try {
      const tokenVerify = jwt.verify(
        token,
        <Secret>process.env.JWT_ACCESS_SECRET
      );
      return tokenVerify;
    } catch (err: any) {
      return null;
    }
  }

  async validateRefreshToken(token: string) {
    try {
      const tokenVerify = jwt.verify(
        token,
        <Secret>process.env.JWT_REFRESH_SECRET
      );
      return tokenVerify;
    } catch (err: any) {
      return null;
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const existingToken = await prisma.token.findUnique({
      where: { userId },
    });

    if (existingToken) {
      const tokenData = await prisma.token.update({
        where: { userId },
        data: { refreshToken },
      });
      return tokenData;
    }

    const token = await prisma.token.create({
      data: {
        userId,
        refreshToken,
      },
    });
    return token;
  }

  async removeToken(refreshToken: string) {
    const token = await prisma.token.delete({
      where: { refreshToken },
    });
    return token;
  }

  async findToken(refreshToken: string) {
    const token = await prisma.token.findUnique({
      where: { refreshToken },
    });
    return token;
  }
}

export const tokenService = new TokenService();
