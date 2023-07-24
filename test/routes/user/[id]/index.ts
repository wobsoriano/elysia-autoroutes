import type { Context } from 'elysia'

export const get = (context: Context) => `get user ${context.params?.id}`
