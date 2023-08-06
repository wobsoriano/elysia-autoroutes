export function handleParameters(token: string) {
  const replacements = [
    // Clean the url extensions
    { regex: /\.(ts|js|mjs|cjs|jsx|tsx)$/u, replacement: '' },

    // Handle wild card based routes - users/[...id]/profile.ts -> users/*/profile
    { regex: /\[\.\.\..+\]/gu, replacement: '*' },

    // Handle generic square bracket based routes - users/[id]/index.ts -> users/:id
    { regex: /\[(.*?)\]/gu, replacement: (_subString: string, match: string) => `:${match}` },

    // Handle the case when multiple parameters are present in one file
    // users / [id] - [name].ts to users /: id -:name and users / [id] - [name] / [age].ts to users /: id -: name /: age
    { regex: /\]-\[/gu, replacement: '-:' },
    { regex: /\]\//gu, replacement: '/' },
    { regex: /\[/gu, replacement: '' },
    { regex: /\]/gu, replacement: '' },
  ]

  let url = token

  for (const { regex, replacement } of replacements)
    url = url.replace(regex, replacement as any)

  return url
}
