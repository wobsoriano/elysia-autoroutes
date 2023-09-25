import type Elysia from 'elysia'

export default (app: Elysia) => app.get('/', () => 'index')
