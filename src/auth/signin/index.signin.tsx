import { Hono } from "hono";
import { createAccessToken, createRefreshToken, signinUser } from "../auth.service";
import { signinBodySchema, SigninBody } from "../types";


const app = new Hono();

// app.get("/", (c) => {
//  const form_action_json = c.req.json().then((data) => {
//   console.log("=========== returned actio data =======",data)
// })
// .catch((error) => {
//   console.log("=========== error =======",error.message)
// })

//   return c.html(
//     <AuthLayout title="Signin">
//       <SigninCompopnent />
//     </AuthLayout>
//   );
// });

app.post("/", async (c) => {
  try {
    const body = signinBodySchema.parse(await c.req.json<SigninBody>());
    const user = await signinUser(body);
    const user_payload = { id: user.id };
    const access_token = await createAccessToken(c, user_payload);
    await createRefreshToken(c, user_payload);

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

export { app as signinRoute };
