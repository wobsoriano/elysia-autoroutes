import { Elysia } from 'elysia'
import { autoroutes } from '../src'

const app = new Elysia()
  .get('/', () => 'Hello, Elysia!')
  .state('version', 1)
  .use(autoroutes({
    prefix: '/api',
    routesDir: './api',
  }))
  .listen(3000)

export type ElysiaApp = typeof app

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
