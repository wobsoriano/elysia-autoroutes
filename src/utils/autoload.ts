import fg from 'fast-glob'
import type Elysia from 'elysia'
import { transformPathToUrl } from './transformPathToUrl'

const validMethods = ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'OPTIONS'] as const
type ValidMethods = typeof validMethods[number]

export async function autoload(app: Elysia, dirPath: string, routePrefix: string) {
  const files = await fg('**/!(*.test|*.spec).{ts,js,mjs,cjs}', {
    cwd: dirPath,
    absolute: true,
    onlyFiles: true,
  })

  type RouteHandler = Parameters<Elysia['get']>[1]
  type RouteHooks = Parameters<Elysia['get']>[2]

  for (const file of files) {
    const routeName = transformPathToUrl(file.replace(dirPath, ''), routePrefix)
    const routeModule = await import(file)
    for (const [method, handler] of Object.entries(routeModule)) {
      const normalizedMethod = method.toUpperCase() as ValidMethods

      if (validMethods.includes(normalizedMethod)) {
        if (typeof handler === 'function')
          app[method as unknown as Lowercase<ValidMethods>](routeName, handler as RouteHandler)
        else
          app[method as unknown as Lowercase<ValidMethods>](routeName, (handler as { handler: RouteHandler }).handler, (handler as { hooks: RouteHooks }).hooks)
      }
    }
  }
}
