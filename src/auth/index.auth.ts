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
    console.log("====  error signing up user  === ", error);
    return c.json(
      {
        message: error.message,
        cause: error.cause,
        stack: error.stack,
        original_error: error,
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
  } catch (error:any) {
        console.log("====  error signing in user  === ", error);
    return c.json({
        message: error.message,
        cause: error.cause,
        stack: error.stack,
        original_error: error,
    }, 500);
  }
});

export { app as authRoute };
