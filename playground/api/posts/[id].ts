import { t } from 'elysia'
import type { ElysiaApp } from '../..'

export default (app: ElysiaApp) => app.get('/', async (context) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params?.id}`)
  const data = await response.json()
  return data
}, { params: t.Object({ id: t.String() }) })
