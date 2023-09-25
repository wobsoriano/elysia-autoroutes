import type Elysia from 'elysia'

export default (app: Elysia) => app
  .get('/', () => 'get user')
  .post('/', () => 'post user')
  .put('/', () => 'put user')
  .patch('/', () => 'patch user')
  .delete('/', () => 'delete user')
