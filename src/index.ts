import type { Elysia } from 'elysia'
import path from 'pathe'
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

    const dirPath = getDirPath(routesDir)

    await autoload(app, dirPath, routePrefix)

    return app
  }
}

function getDirPath(dir: string) {
  let dirPath: string

  if (path.isAbsolute(dir))
    dirPath = dir
  else if (path.isAbsolute(process.argv[1]))
    dirPath = path.join(process.argv[1], '..', dir)
  else
    dirPath = path.join(process.cwd(), process.argv[1], '..', dir)

  return dirPath
}
