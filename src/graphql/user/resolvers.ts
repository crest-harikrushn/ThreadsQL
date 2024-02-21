import UserService, { CreateUserPayload } from "../../services/user";

const queries = {
  getUserToken: async (
    _: any,
    payload: { email: string; password: string }
  ) => {
    const { email, password } = payload;
    const token = await UserService.getUserToken({ email, password });
    return token;
  },

  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = UserService.getUserByEmail(context.user.email as string);
      return user;
    }
    return { id: 123 };

    // throw new Error("Unknown!!");
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const user = await UserService.createUser(payload);
    return user.id;
  },
};

export const resolvers = { queries, mutations };
