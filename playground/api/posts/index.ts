import type { ElysiaApp } from '../..'

export default (app: ElysiaApp) => app.get('/', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()
  return data
})
