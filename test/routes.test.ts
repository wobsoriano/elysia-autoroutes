import { afterAll, describe, expect, test } from 'bun:test'
import Elysia from 'elysia'
import { autoroutes } from '../src'

const app = new Elysia()
  .use(autoroutes({ routesDir: './routes', prefix: '/api' }))
  .listen(8000)

describe('routes', () => {
  afterAll(() => app.stop())

  test('index', async () => {
    const response = await app.handle(
      new Request('http://localhost/api'),
    ).then(res => res.text())

    expect(response).toBe('index')
  })

  test('basic get', async () => {
    const response = await app.handle(
      new Request('http://localhost/api/user'),
    ).then(res => res.text())

    expect(response).toBe('get user')
  })

  test('basic post', async () => {
    const response = await app.handle(
      new Request('http://localhost/api/user', { method: 'POST' }),
    ).then(res => res.text())

    expect(response).toBe('post user')
  })

  test('with params', async () => {
    const response = await app.handle(
      new Request('http://localhost/api/user/101'),
    ).then(res => res.text())

    expect(response).toBe('get user 101')
  })

  test('with params deep', async () => {
    const response = await app.handle(
      new Request('http://localhost/api/user/69/todos/420'),
    ).then(res => res.json())

    expect(response).toMatchObject({
      id: '69',
      todoId: '420',
    })
  })

  test('catch all route', async () => {
    const response = await app.handle(
      new Request('http://localhost/api/profile/spark/settings'),
    ).then(res => res.json())

    expect(response).toMatchObject({
      '*': 'spark/settings',
    })
  })
})
