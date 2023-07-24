import { Elysia } from 'elysia'
import { autoroutes } from '../src'

const app = new Elysia()

app.use(autoroutes({
  prefix: '/api',
}))

app.get('/', async (context) => {
  return 'Hello'
})

app.get('/basic/*', (context) => {
  return context.params
})

app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
