# elysia-autoroutes

File system routes for [Elysia.js](https://elysiajs.com/).

## Install

```bash
bun install elysia@0.6.24 elysia-autoroutes
```

## Usage

### Register the plugin

Note: It uses your project's `/routes` directory as source by default.

```ts
import { Elysia } from 'elysia'
import { autoroutes } from 'elysia-autoroutes'

const app = new Elysia()
  .use(autoroutes({
    routesDir: './routes',
    prefix: '/api' // -> optional
  }))
  .listen(3000)

export type ElysiaApp = typeof app
export type GetHandler = Parameters<typeof app.get>[1]
export type PostHandler = Parameters<typeof app.post>[1]
export type PutHandler = Parameters<typeof app.put>[1]
export type DelHandler = Parameters<typeof app.delete>[1]
```

Create your first route

```ts
// routes/index.ts
import type Elysia from 'elysia'

export default (app: Elysia) => app.get('/', { hello: 'world' })
```

### Directory Structure

Files inside your project's `/routes` directory will get matched a url path automatically.

```php
├── app.ts
├── routes
    ├── index.ts // index routes
    ├── posts
        ├── index.ts
        └── [id].ts // dynamic params
    └── users.ts
└── package.json
```

- `/routes/index.ts` → /
- `/routes/posts/index.ts` → /posts
- `/routes/posts/[id].ts` → /posts/:id
- `/routes/users.ts` → /users

### Examples

#### HTTP Method Matching

When you export functions like `get`, `post`, `put`, `patch`, `del`, etc. from a route file, they will be automatically associated with their respective HTTP methods during the matching process.

```ts
import type Elysia from 'elysia'

export default (app: Elysia) => app
  .get('/', () => ({ ... }))
  .post('/', () => ({ ... }))
  .put('/', () => ({ ... }))
  .patch('/', () => ({ ... }))
  .delete('/', () => ({ ... }))
```

#### Type-safety

You have the option to export the type of your primary Elysia instance and then import it into your route files.

Feel free to access application state and use decorators. 

You can have type safety for `params` and `body` by defining hooks.

```ts
import type { ElysiaApp } from '../app'

export default (app: ElysiaApp) => app
  .get('/', ({ store }) => ({ version: store.version }))
  .post('/', ({ store }) => ({ version: store.version }), { hooks: { params: T.Object({ id: T.String() }) } })
```

## License

MIT
