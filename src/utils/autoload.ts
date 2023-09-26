import path from 'node:path'
import fs from 'node:fs'
import type Elysia from 'elysia'
import type { DecoratorBase } from 'elysia'
import { transformPathToUrl } from './transformPathToUrl'

export async function autoload<Decorator extends DecoratorBase>(app: Elysia<string, Decorator>, routesDir: string) {
  const dirPath = getDirPath(routesDir)

  if (!fs.existsSync(dirPath))
    throw new Error(`Directory "${dirPath}" does not exist`)

  if (!fs.statSync(dirPath).isDirectory())
    throw new Error(`"${dirPath}" is not a directory.`)

  const router = new Bun.FileSystemRouter({
    style: 'nextjs',
    dir: dirPath,
  })

  const routeModules: Record<string, (group: Elysia<string, Decorator>) => Elysia<string, Decorator>> = {}
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
    app.group<Elysia<string, Decorator>, string>(routeName, routeModule)
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
