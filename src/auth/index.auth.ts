import { Hono } from "hono";
import { SignupBody } from "./types";

const app = new Hono();

//  auth/signup
app.post("/signup", async (c) => {
  try {
    const body = await c.req.json<SignupBody>();
    return c.json({
      body,
    });
  } catch (error) {
    return c.json(error, 500);
  }
});


//  auth/signin
app.post("/signin", async (c) => {
  try {
    const body = await c.req.json<SignupBody>();
    return c.json({
      body,
    });
  } catch (error) {
    return c.json(error, 500);
  }
});

export { app as authRoute };
