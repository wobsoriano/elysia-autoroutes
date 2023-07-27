import type { Elysia } from 'elysia'
import { autoload } from './utils'

export interface Options {
  routesDir?: string
  prefix?: string
}

export function autoroutes(options?: Options) {
  return async function plugin(app: Elysia) {
    const { routesDir, prefix: routePrefix } = {
      ...options,
      routesDir: options?.routesDir ?? './routes',
      prefix: options?.prefix ?? '',
    }

    await autoload(app, routesDir, routePrefix)

    return app
  }
}
