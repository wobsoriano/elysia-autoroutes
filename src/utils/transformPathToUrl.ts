import path from 'pathe'
import { handleParameters } from './handleParameters'

export function transformPathToUrl(filePath: string) {
  const url = `/${filePath}` // Add leading slash to the URL

  if (url.length === 1)
    return url // If the URL is just "/", return it as is

  const resultUrl = url
    .split(path.sep)
    .map(part => handleParameters(part))
    .join('/') // Map and join the URL parts using handleParameters function

  // Remove 'index' from the end of the URL if it exists
  let finalUrl = resultUrl.endsWith('index') ? resultUrl.replace(/\/?index$/, '') : resultUrl

  // Remove the trailing slash from the URL if it exists
  finalUrl = finalUrl.replace(/\/$/, '')

  // If the URL is empty, replace it with the root path "/"
  if (finalUrl.length === 0)
    return '/'

  // Replace multiple slashes with a single slash
  return finalUrl.replace(/\/{2,}/g, '/')
}
