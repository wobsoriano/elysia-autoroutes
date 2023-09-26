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
export type GetHandler = Parameters<typeof app.get>[1]
export type GetHandlerParams = Parameters<typeof app.get>[2]

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
