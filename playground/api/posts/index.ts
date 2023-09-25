import type Elysia from 'elysia'

export default (app: Elysia) => app.get('/', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()
  return data
})
