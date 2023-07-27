import path from 'pathe'
import { handleParameters } from './handleParameters'

export function transformPathToUrl(filePath: string): string {
  const url: string = `/${filePath}`

  if (url.length === 1)
    return url

  let resultUrl: string = url
    .split(path.sep)
    .map(part => handleParameters(part))
    .join('/')

  if (resultUrl.endsWith('index'))
    resultUrl = resultUrl.replace('index', '')

  // This removes the last slash from the string if it exists
  if (resultUrl.endsWith('/'))
    resultUrl = resultUrl.slice(0, -1)

  // This handle the case when only index remains, so a default route is created
  if (resultUrl.length === 0)
    return '/'

  return resultUrl.replace('//', '/')
}
