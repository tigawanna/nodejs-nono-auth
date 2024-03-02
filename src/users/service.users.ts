import { db } from "@/db/client";
import { users_table } from "@/db/schema";
import { count,eq,or } from "drizzle-orm";

export async function getPaginatedUsers(pageNumber = 1, pageSize = 10, count_rows = true) {
  try {
    const offset = (pageNumber - 1) * pageSize;
    const total_users = count_rows && (await db.select({ value: count() }).from(users_table));
    const users = await db
      .select()
      .from(users_table)
      .limit(pageSize) // Fetch only the specified number of users
      .offset(offset); // Skip the initial rows based on offset

    return {
      data: users,
      pageinfo: {
        total: users.length,
        totalPages: total_users ? Math.ceil(total_users[0].value / pageSize) : undefined,
        currentPage: pageNumber,
      },
    };
  } catch (error) {
    // Handle errors appropriately
    throw error;
  }
}

export async function findUserByEmailOrUsername(emailOrUsername: string) {
  try {
    const user = await db
      .select()
      .from(users_table)
      .where(or(eq(users_table.email, emailOrUsername),eq(users_table.username, emailOrUsername)));  
      return user;
  }
  catch(error){
    throw error
  }
}
