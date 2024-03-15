import bcrypt from "bcrypt";
import { v4 } from "uuid";
// import { mailService } from "./mailService";
import { PrismaClient } from "@prisma/client";
import { tokenService } from "./tokenService";
import { UserDto } from "../dtos/userDto";

const prisma = new PrismaClient();

class UserService {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error("Пользотватель не найден");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async registration(email: string, password: string) {
    const candidate = await prisma.user.findUnique({ where: { email } });
    if (candidate) {
      throw new Error(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const activationLink = v4();
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        activationLink,
      },
    });
    // await mailService.sendActivationMail(email, activationLink);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  // async activate(activationLink: string) {
  //   const user = await prisma.user.findUnique({
  //     where: { activationLink },
  //   });
  //   if (!user) {
  //     throw new Error(
  //       `Пользователь с почтовым адресом ${activationLink} не существует`
  //     );
  //   }
  //   const newUserInfo = await prisma.user.update({
  //     where: { activationLink },
  //     data: { isActivated: true },
  //   });
  //   return newUserInfo;
  // }

  async getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  async deleteUser(id: number) {
    const user = await prisma.user.delete({ where: { id } });
    return user;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new Error("Нет токена");
    }
    const tokenVerify = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if (!tokenVerify || !tokenFromDB) {
      throw new Error("Неверный токен");
    }
    const user = await prisma.user.findFirst({
      where: { token: { refreshToken } },
    });
    const userDto = new UserDto(user!);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

export const userService = new UserService();
