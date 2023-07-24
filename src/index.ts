import { Elysia } from 'elysia'
import path from 'pathe'
import fg from 'fast-glob'
import { transformPathToUrl } from './transformPathToUrl'

type FixMe = any

export interface Options {
  routesDir?: string
  prefix?: string
}

export type ValidMethods =
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'PATCH'
  | 'POST'
  | 'PUT'
  | 'OPTIONS'

export function autoroutes(options?: Options) {
  return async function plugin(app: Elysia) {
    const { routesDir, prefix: routePrefix } = {
      ...options,
      routesDir: options?.routesDir ?? './routes',
      prefix: options?.prefix ?? '',
    }

    const dirPath = getRoutesCWD(routesDir)
    
    const files = await fg('**/*.{ts,js,mjs}', {
      cwd: dirPath,
      absolute: true,
      onlyFiles: true,
    })

    for (const file of files) {
      const routeName = transformPathToUrl(file.replace(dirPath, ''), routePrefix);

      const routeModule = await import(file)

      for (const [method, handler] of Object.entries(routeModule)) {
        if (typeof handler === 'function') {
          app[method as unknown as Lowercase<ValidMethods>](routeName, handler as FixMe)
        } else {
          app[method as unknown as Lowercase<ValidMethods>](routeName, (handler as FixMe).handler, (handler as FixMe).hooks)
        }
      }
    }

    return app;
  }
}

function getRoutesCWD(dir: string) {
  let dirPath: string

  if (path.isAbsolute(dir)) {
    dirPath = dir
  } else if (path.isAbsolute(process.argv[1])) {
    dirPath = path.join(process.argv[1].substring(0, process.argv[1].lastIndexOf('/')), dir)
  } else {
    dirPath = path.join(process.cwd(), process.argv[1].substring(0, process.argv[1].lastIndexOf('/')), dir)
  }

  return dirPath
}
