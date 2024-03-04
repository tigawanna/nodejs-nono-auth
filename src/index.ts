import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { usersRoute } from "./users/index.users";
import { authRoute } from "./auth/index.auth";
import { jwt } from "hono/jwt";
import { SECRETS } from "./utils";
import { env } from "hono/adapter";
import dotenv from "dotenv";
const app = new Hono();

// load .env variables
app.use(async (_, next) => {
  dotenv.config();
  await next();
});

app.use("/auth/*", (c, next) => {

  const { JWT_SECRET } = SECRETS.parse(c.env);
  const jwtMiddleware = jwt({
    secret: JWT_SECRET,
    cookie: "hono_auth",
  });
  return jwtMiddleware(c, next);
});

app.get("/", (c) => {
  console.log(
    " ====  access token   ====",
    env<{ ACCESS_TOKEN_SECRET: string; REFRESH_TOKEN_SECRET: string }>(c)
  );
  return c.text("Hello Hono! index route");
});

app.route("/users", usersRoute);
app.route("/auth", authRoute);

const port = 5000;
console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
