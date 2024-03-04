import { users_table } from "@/db/schema";
import { createUser, findUserByEmailOrUsername } from "@/users/service.users";
import bcrypt from "bcrypt";
import { SigninBody } from "./types";
import { enviromentVariables } from "@/lib/env";
import { Context, Env } from "hono";
import { jwt, sign, verify } from "hono/jwt";
import { BlankInput } from "hono/types";
import { getCookie, setCookie } from "hono/cookie";

type UserInsertType = (typeof users_table)["$inferInsert"];

export async function signupUser(user: Omit<UserInsertType, "id">) {
  try {
    const user_with_email_exists = await findUserByEmailOrUsername(user.email);

    if (user_with_email_exists?.[0]?.id) {
      throw new Error("Email already exists");
    }
    const user_with_username_exists = await findUserByEmailOrUsername(user.username);
    if (user_with_username_exists?.[0]?.id) {
      throw new Error("Username already exists");
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await createUser({
      ...user,
      id: crypto.randomUUID(),
      password: hashedPassword,
    });
  } catch (error) {
    // Handle errors appropriately

    throw error;
  }
}

export async function signinUser({ emailOrUsername, password: pass }: SigninBody) {
  try {
    const user = await findUserByEmailOrUsername(emailOrUsername);
    if (!user?.[0]?.id) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(pass, user?.[0]?.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // const accessToken = generateAccessToken(user);
    // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    // refreshTokens.push(refreshToken);
    // res.json({ accessToken: accessToken, refreshToken: refreshToken });
    const { password, ...rest } = user?.[0];
    return rest;
  } catch (err: any) {
    throw err;
  }
}

export async function createAccessToken(
  c: Context<Env, "/", BlankInput>,
  payload: { id: string }
) {
  const { ACCESS_TOKEN_SECRET } = enviromentVariables(c);
  const access_token = await sign(payload, ACCESS_TOKEN_SECRET);
  return access_token;
}
export async function readRefreshToken(c: Context<Env, "/", BlankInput>) {
  const { REFRESH_TOKEN_SECRET } = enviromentVariables(c);
  const refresh_token = getCookie(c, "kjz");
  if (!refresh_token) {
    return c.redirect("/auth/signin");
  }
  const refresh_token_payload = await verify(refresh_token, REFRESH_TOKEN_SECRET);
  return refresh_token_payload;
}
export async function createRefreshToken(
  c: Context<Env, "/", BlankInput>,
  payload: { id: string }
) {
  const { REFRESH_TOKEN_SECRET } = enviromentVariables(c);
  const refresh_token = await sign(payload, REFRESH_TOKEN_SECRET);
  setCookie(c, "kjz", refresh_token, { path: "/", httpOnly: true });
  return refresh_token;
}
