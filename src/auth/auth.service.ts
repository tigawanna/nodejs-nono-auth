import { users_table } from "@/db/schema";
import { createUser, findUserByEmailOrUsername } from "@/users/service.users";
import bcrypt from "bcrypt";
import { SigninBody } from "./types";

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

export async function signinUser({emailOrUsername, password:pass}:SigninBody) {
  try {
    const user = await findUserByEmailOrUsername(emailOrUsername);
    if(!user?.[0]?.id) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(pass, user?.[0]?.password);
    if(!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const {password, ...rest} = user?.[0]
    return rest

  }catch(err: any) {

    throw err
  }
}
