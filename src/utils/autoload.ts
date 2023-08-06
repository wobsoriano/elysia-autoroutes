import path from 'node:path'
import fs from 'node:fs'
import type Elysia from 'elysia'
import type { LocalHandler, LocalHook } from 'elysia'
import { transformPathToUrl } from './transformPathToUrl'

const validMethods = ['delete', 'get', 'head', 'patch', 'post', 'put', 'options'] as const
type ValidMethods = typeof validMethods[number]

export async function autoload(app: Elysia, routesDir: string) {
  const dirPath = getDirPath(routesDir)

  if (!fs.existsSync(dirPath))
    throw new Error(`Directory "${dirPath}" does not exist`)

  if (!fs.statSync(dirPath).isDirectory())
    throw new Error(`"${dirPath}" is not a directory.`)

  const router = new Bun.FileSystemRouter({
    style: 'nextjs',
    dir: dirPath,
  })

  const routeModules: Record<string, Record<ValidMethods, LocalHandler<any, any> | {
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

  for (const [routeName, routeModule] of Object.entries(routeModules)) {
    for (const [method, handler] of Object.entries(routeModule)) {
      const normalizedMethod = method === 'del' ? 'delete' : method.toLowerCase() as ValidMethods
      if (validMethods.includes(normalizedMethod)) {
        if (typeof handler === 'function')
          app[normalizedMethod](routeName, handler)
        else
          app[normalizedMethod](routeName, handler.handler, handler.hooks)
      }
    }
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
