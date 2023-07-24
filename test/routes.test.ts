import { describe, expect, test } from 'bun:test'
import Elysia from 'elysia'
import { autoroutes } from '../src'

describe('routes', () => {
  test('basic', async () => {
    const app = new Elysia().use(autoroutes({ routesDir: './routes' }))

    const response = await app.handle(
      new Request('http://localhost/basic'),
    ).then(res => res.text())

    expect(response).toBe('hi')
  })
})
