import { Hono } from "hono";
import { createAccessToken, createRefreshToken, signupUser } from "../auth.service";
import { SignupBody, signupBodySchema } from "../types";

const app = new Hono();

app.get("/", (c) => {
  return c.html("<h1>Hello Hono! signup route</h1>");
});

app.post("/", async (c) => {
  try {
    const body = signupBodySchema.parse(await c.req.json<SignupBody>());
    const user = await signupUser(body);
    const user_payload = { id: user[0]?.id };
    const access_token = createAccessToken(c, user_payload);
    await createRefreshToken(c, user_payload);
    return c.json({
      user,
      access_token,
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

export { app as signupRoute };
