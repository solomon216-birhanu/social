import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  emailAndPassword: { enabled: true },
  plugins: [
    admin(),
    nextCookies(),
  ],
});
