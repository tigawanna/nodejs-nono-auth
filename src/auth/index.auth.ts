import { Hono } from "hono";
import { SigninBody, SignupBody, signinBodySchema, signupBodySchema } from "./types";
import { createAccessToken, readRefreshToken, signinUser, signupUser } from "./auth.service";

import { signinRoute } from "./signin/index.signin";
import { signupRoute } from "./signup/index.signup";

const app = new Hono();


app.post("/test", async (c) => {
  const form_data = c.req.formData();
  console.log(" ==== form data ==== ", form_data);
})

app.route("/signin",signinRoute);
app.route("/signup",signupRoute);

//  auth/srefresh
app.post("/refresh", async (c) => {
  try {
    const refresh_token_payload = await readRefreshToken(c);
    console.log("refresh_token_payload", refresh_token_payload);
  // const token = await sign(user, REFRESH_TOKEN_SECRET);
    return c.json({
      refresh_token_payload
    })
  }catch(e: any) {
    console.log("====  error verifying refresh token  === ", e);
    return c.json(
      {
        message: e.message,
        cause: e.cause,
        stack: e.stack,
        original_error: e,
      },
      500
    );

  }
})

export { app as authRoute };
