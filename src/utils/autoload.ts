import path from 'node:path'
import type Elysia from 'elysia'
import type { LocalHandler, LocalHook } from 'elysia'
import { transformPathToUrl } from './transformPathToUrl'

const validMethods = ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'OPTIONS'] as const
type ValidMethods = typeof validMethods[number]

export async function autoload(app: Elysia, routesDir: string, routePrefix: string) {
  const router = new Bun.FileSystemRouter({
    style: 'nextjs',
    dir: getDirPath(routesDir),
  })

  const routeModules: Record<string, Record<Lowercase<ValidMethods>, LocalHandler<any, any> | {
    handler: LocalHandler<any, any>
    hooks?: LocalHook<any, any>
  }>> = {}
  const importPromises: Promise<void>[] = []

  for (const [nextRouteName, file] of Object.entries(router.routes)) {
    const routeName = transformPathToUrl(nextRouteName)

    importPromises.push(
      import(file).then((routeModule) => {
        routeModules[routeName] = routeModule
      }),
    )
  }

  await Promise.all(importPromises)

  app.group(routePrefix, (app) => {
    for (const [routeName, routeModule] of Object.entries(routeModules)) {
      for (const [method, handler] of Object.entries(routeModule)) {
        const normalizedMethod = method.toUpperCase() as ValidMethods
        if (validMethods.includes(normalizedMethod)) {
          if (typeof handler === 'function')
            app[method as unknown as Lowercase<ValidMethods>](routeName, handler)
          else
            app[method as unknown as Lowercase<ValidMethods>](routeName, handler.handler, handler.hooks)
        }
      }
    }

    return app
  })
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
