import { enviromentVariables } from "@/lib/env";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import { signinUser } from "../auth.service";
import { signinBodySchema, SigninBody } from "../types";
import {AuthLayout} from "../layout.auth"
import { SigninCompopnent } from "./components/SigninCompopnent";


const app = new Hono();

app.get("/", (c) => {
    return c.html(<AuthLayout title="Signin"><SigninCompopnent/></AuthLayout>)
})

app.post("/", async (c) => {
  try {
    const body = signinBodySchema.parse(await c.req.json<SigninBody>());
    const user = await signinUser(body);
    const user_payload = { id: user.id };
    const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = enviromentVariables(c);
    const access_token = await sign(user_payload, ACCESS_TOKEN_SECRET);
    const refresh_token = await sign(user_payload, REFRESH_TOKEN_SECRET);
    setCookie(c, "kjz", refresh_token, { path: "/", httpOnly: true });
    return c.json({
      user,
      access_token,
    });
  } catch (error: any) {
    console.log("====  error signing in user  === ", error);
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

export {app as signinRoute}
