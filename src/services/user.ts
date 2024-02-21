import { createHmac, randomBytes } from "crypto";
import JWT from "jsonwebtoken";
import { prismaClient } from "../lib/db";

const JWT_SECRET = "some_secret_key";

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface GetUserToken {
  email: string;
  password: string;
}

class UserService {
  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;
    const salt = randomBytes(32).toString("hex");
    const hashedPassword = UserService.generateHash(salt, password);
    return prismaClient.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        salt,
      },
    });
  }

  private static generateHash(salt: string, password: string) {
    return createHmac("sha256", salt).update(password).digest("hex");
  }

  public static async getUserByEmail(email: string) {
    return await prismaClient.user.findUnique({ where: { email } });
  }

  public static async getUserToken(payload: GetUserToken) {
    const { email, password } = payload;

    const user = await UserService.getUserByEmail(email);

    if (!user) throw new Error("User Not found!");

    const userSalt = user.salt;

    const usersHashPassword = UserService.generateHash(userSalt, password);

    if (usersHashPassword !== user.password)
      throw new Error("Invalid Password");

    // Generate Token
    const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);

    return token;
  }

  public static decodeJWTToken(token: string) {
    const decoded = JWT.decode(token);
    return decoded;
  }
}

export default UserService;
