import { Elysia } from 'elysia'
import { autoroutes } from '../src'

const app = new Elysia()

app.get('/', () => 'Hello, Elysia!')

app.use(autoroutes({
  prefix: '/api',
  routesDir: './api',
}))

app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
