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

  // This removes the last slash from the string if it exists
  if (routeName.endsWith('/'))
    routeName = routeName.slice(0, -1)

  // This handle the case when only index remains, so a default route is created
  if (routeName.length === 0)
    return '/'

  return routeName.replace('//', '/')
}
