import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { usersRoute } from "./users/index.users";
import { authRoute } from "./auth/index.auth";
import { jwt } from "hono/jwt";
import { SECRETS } from "./utils";
import { env } from "hono/adapter";
import dotenv from "dotenv";
import { enviromentVariables } from "./lib/env";
const app = new Hono();

// load .env variables
app.use(async (_, next) => {
  dotenv.config();
  await next();
});

// app.use("/auth/*", (c, next) => {
//   const { ACCESS_TOKEN_SECRET } = enviromentVariables(c);
//   const jwtMiddleware = jwt({
//     secret: ACCESS_TOKEN_SECRET,
//     cookie: "hono_auth",
//   });
//   return jwtMiddleware(c, next);
// });

app.get("/", (c) => {
  console.log(" ====  auth headers   ====", c.req.header("Authorization"));
  return c.text("Hello Hono! index route");
});
app.get("/auth/uwu", (c) => {
    const payload = c.get("jwtPayload");
  console.log(" ====  auth headers   ====", payload);
  return c.text("Hello Hono! auth/uwu route");
});

app.route("/users", usersRoute);
app.route("/auth", authRoute);

const port = 5000;
console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
