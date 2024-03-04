import { Context } from "hono";
import { env } from "hono/adapter";
import { BlankInput, Env } from "hono/types";

export function enviromentVariables(c: Context<Env, "/", BlankInput>) {
  interface EnvVariables extends Record<string, unknown> {
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
  }
return env<EnvVariables>(c);
}
