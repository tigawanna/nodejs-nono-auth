import { Hono } from "hono";
import { getPaginatedUsers } from "./service.users";
const app = new Hono();

//  get all users
app.get("/", async (c) => {
  try {
    const page_number = parseInt(c.req.query("page") ?? "1");
    const page_size = parseInt(c.req.query("page_size") ?? "`");
    const users = await getPaginatedUsers(page_number, page_size);
    return c.json(users);
  } catch (error) {
    return c.json(error, 500);
  }
});

export { app as usersRoute };
