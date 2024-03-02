import { db } from "@/db/client";
import { users_table } from "@/db/schema";
import { createUser, findUserByEmailOrUsername } from "@/users/service.users";
import bcrypt from "bcrypt";

type CreateUserType = (typeof users_table)["$inferInsert"];

export async function signupUser(user: Omit<CreateUserType, "id">) {
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
