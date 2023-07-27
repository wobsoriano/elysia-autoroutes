import fg from 'fast-glob'
import type Elysia from 'elysia'
import { transformPathToUrl } from './transformPathToUrl'

const validMethods = ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'OPTIONS'] as const
type ValidMethods = typeof validMethods[number]

export async function autoload(app: Elysia, dirPath: string, routePrefix: string) {
  const files = await fg('**/*.{ts,js,mjs,cjs}', {
    cwd: dirPath,
    absolute: true,
    onlyFiles: true,
  })

  type RouteHandler = Parameters<Elysia['get']>[1]
  type RouteHooks = Parameters<Elysia['get']>[2]

  for (const file of files) {
    const url = transformPathToUrl(file.replace(dirPath, ''))
    const routeName = routePrefix ? `/${routePrefix}${url}` : url
    const routeModule = await import(file)

    for (const [method, handler] of Object.entries(routeModule)) {
      if (!validMethods.includes(method.toUpperCase() as ValidMethods))
        continue

      if (typeof handler === 'function')
        app[method as unknown as Lowercase<ValidMethods>](routeName, handler as RouteHandler)
      else
        app[method as unknown as Lowercase<ValidMethods>](routeName, (handler as { handler: RouteHandler }).handler, (handler as { hooks: RouteHooks }).hooks)
    }
  }
}
