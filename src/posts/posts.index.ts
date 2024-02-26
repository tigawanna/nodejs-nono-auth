import { Hono } from "hono";

const postsApp = new Hono();

postsApp.get("/", (c) => {
  return c.text("posts route");
});

export { postsApp }
