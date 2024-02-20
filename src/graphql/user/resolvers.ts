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
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const user = await UserService.createUser(payload);
    return user.id;
  },
};

export const resolvers = { queries, mutations };
