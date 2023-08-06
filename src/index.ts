import { Elysia } from 'elysia'
import { autoload } from './utils'

export interface Options {
  routesDir?: string
  prefix?: string
}

export function autoroutes(options?: Options) {
  const { routesDir, prefix } = {
    ...options,
    routesDir: options?.routesDir ?? './routes',
    prefix: options?.prefix ?? '',
  }

  const seed = { routesDir, prefix }
  const autoroutesPlugin = new Elysia({
    prefix,
    name: `autoroutes-${JSON.stringify(seed)}`,
    seed,
  })

  return async function plugin(app: Elysia) {
    await autoload(autoroutesPlugin, routesDir)

    app.use(autoroutesPlugin)

    return app
  }
}
