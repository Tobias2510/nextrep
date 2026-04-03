import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../db/auth-schema";
import { db } from "./db-connection";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: { enabled: true },
  user: {
    changeEmail: {
      enabled: true,
      updateEmailWithoutVerification: true,
    },
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [nextCookies()],
});
