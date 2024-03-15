import { User } from "@prisma/client";

export class UserDto {
  email: string;
  id: number;
  isActivated: boolean;

  constructor(model: User) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
  }
}
