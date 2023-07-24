import path from 'pathe'
import { handleParameters } from './handleParameters'

export function transformPathToUrl(file: string, routePrefix = '/') {
  let routeName = file
    .replace('index', '')
    .split(path.sep)
    .map(handleParameters)
    .join(path.sep)

  // Add prefix
  routeName = !routeName ? '/' : `${routePrefix}${routeName}`

  // Remove trailing slash
  if (routeName.endsWith(path.sep))
    routeName = routeName.substring(0, routeName.length - 1)

  return routeName.replace('//', '/')
}
