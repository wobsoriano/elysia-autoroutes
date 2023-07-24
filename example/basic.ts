import { autoroutes } from '../src'
import { Elysia } from "elysia";

const app = new Elysia()

app.use(autoroutes({
  prefix: '/api',
}))

app.get("/", async (context) => {
  return 'Hello'
})

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

