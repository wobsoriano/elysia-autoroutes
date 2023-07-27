import { describe, expect, it } from 'bun:test'
import { transformPathToUrl } from '../src/utils'

describe('cleanUrlString', () => {
  it('1 - profile', () => {
    expect(transformPathToUrl('user/profile/index.ts')).toBe('/user/profile')
  })

  it('2 - profile [id]', () => {
    expect(transformPathToUrl('user/profile/[id].ts')).toBe(
      '/user/profile/:id',
    )
  })

  it('3 - profile wildcard', () => {
    expect(transformPathToUrl('user/[...profile]/settings.ts')).toBe(
      '/user/*/settings',
    )
  })

  it('4 - user [game]', () => {
    expect(transformPathToUrl('user/[game].ts')).toBe('/user/:game')
  })

  it('5 - index', () => {
    expect(transformPathToUrl('/')).toBe('/')
  })

  it('6 - index.ts', () => {
    expect(transformPathToUrl('/index.ts')).toBe('/')
  })

  it('7 - index.js', () => {
    expect(transformPathToUrl('/index.js')).toBe('/')
  })

  it('8 - /profile/[game]/index.ts', () => {
    expect(transformPathToUrl('/profile/[game]/index.ts')).toBe(
      '/profile/:game',
    )
  })
})
