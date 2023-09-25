import path from 'node:path'
import fs from 'node:fs'
import type Elysia from 'elysia'
import type { ElysiaDefaultMeta, ElysiaInstance, TypedSchema } from 'elysia'
import { transformPathToUrl } from './transformPathToUrl'

export async function autoload<T extends ElysiaInstance<{ store?: Record<string, unknown> | undefined; request?: Record<string, unknown> | undefined; error?: Record<string, Error> | undefined; schema?: TypedSchema<any> | undefined; meta?: ElysiaDefaultMeta | undefined }>>(app: Elysia<string, T>, routesDir: string) {
  const dirPath = getDirPath(routesDir)

  if (!fs.existsSync(dirPath))
    throw new Error(`Directory "${dirPath}" does not exist`)

  if (!fs.statSync(dirPath).isDirectory())
    throw new Error(`"${dirPath}" is not a directory.`)

  const router = new Bun.FileSystemRouter({
    style: 'nextjs',
    dir: dirPath,
  })

  const routeModules: Record<string, (group: Elysia<string, T>) => Elysia<string, T>> = {}
  const importPromises: Promise<void>[] = []

  for (const [nextRouteName, file] of Object.entries(router.routes)) {
    const routeName = transformPathToUrl(nextRouteName)

    importPromises.push(
      import(file).then((routeModule) => {
        routeModules[routeName] = routeModule.default
      }),
    )
  }

  await Promise.all(importPromises)

  for (const [routeName, routeModule] of Object.entries(routeModules))
    app.group<Elysia<string, T>, string>(routeName, routeModule)
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
