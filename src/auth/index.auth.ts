import { Hono } from "hono";
import { SigninBody, SignupBody, signinBodySchema, signupBodySchema } from "./types";
import { signinUser, signupUser } from "./auth.service";

const app = new Hono();

//  auth/signup
app.post("/signup", async (c) => {
  try {
    const body = signupBodySchema.parse(await c.req.json<SignupBody>());
    const user = await signupUser(body);
    return c.json({
      user,
    });
  } catch (error: any) {
    console.log("====  error creating user  === ", error);
    return c.json(
      {
        original_error: error,
        cause: error.cause,
        stack: error.stack,
        message: error.message,
      },
      500
    );
  }
});

//  auth/signin
app.post("/signin", async (c) => {
  try {
    const body = signinBodySchema.parse(await c.req.json<SigninBody>());
    const user = await signinUser(body);
    return c.json({
      user,
    });
  } catch (error) {
    return c.json(error, 500);
  }
});

export { app as authRoute };
