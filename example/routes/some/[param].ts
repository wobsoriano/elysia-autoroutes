import { Context } from "elysia";

export const get = (context: Context) => `Hello ${context.params?.param}`
