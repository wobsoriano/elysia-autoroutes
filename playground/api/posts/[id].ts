import { Context } from "elysia"

export async function get(context: Context) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + context.params?.id)
  const data = await response.json()
  return data
}
