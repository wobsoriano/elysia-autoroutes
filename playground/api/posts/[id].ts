import type { Context } from 'elysia'
import type { ElysiaApp } from '../..'

export async function get(context: Context<ElysiaApp['router'], ElysiaApp['store']>) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params?.id}`)
  const data = await response.json()
  return data
}
