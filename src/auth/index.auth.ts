import { Hono } from "hono";
import { SignupBody } from "./types";
import { createUser } from "@/users/service.users";


const app = new Hono();

//  auth/signup
app.post("/signup", async (c) => {
  try {
    const body = await c.req.json<SignupBody>();
    const user = await createUser(body);
    return c.json({
      user,
    });
  } catch (error:any) {
    console.log("====  error creating user  === ", error);
    return c.json({
      original_error: error,
      cause: error.cause,
      stack: error.stack,
      message: error.message
    }, 500);
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

