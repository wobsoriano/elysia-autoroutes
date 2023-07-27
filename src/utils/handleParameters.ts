export function handleParameters(token: string) {
  // Clean the url extensions like .ts or .js
  let url = token.replace(/\.(ts|js|mjs|cjs)$/u, '')

  // Handle wild card based routes - users/[...id]/profile.ts -> users/*/profile
  url = url.replace(/\[\.\.\..+\]/gu, '*')

  // Handle generic square bracket based routes - users/[id]/index.ts -> users/:id
  url = url.replace(/\[(.*?)\]/gu, (subString, match) => `:${match}`)

  // Handle the case when multiple parameters are present in one file
  // users / [id] - [name].ts to users /: id -:name and users / [id] - [name] / [age].ts to users /: id -: name /: age
  return url.replace(/\]-\[/gu, '-:').replace(/\]\/\[/gu, '/:')
}
