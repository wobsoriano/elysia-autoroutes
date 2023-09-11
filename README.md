# elysia-autoroutes

File system routes for [Elysia.js](https://elysiajs.com/). Inspired by Next.js file system routing.

## Install

```bash
bun install elysia-autoroutes
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
export type GetHandler = Parameters<typeof app.get>[1];
export type PostHandler = Parameters<typeof app.post>[1];
export type PutHandler = Parameters<typeof app.put>[1];
export type DelHandler = Parameters<typeof app.delete>[1];
```

Create your first route

```ts
// routes/index.ts
export async function get() {
  return { hello: 'world' }
}
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
import type { Context } from 'elysia'

export const get = (context: Context) => ({ ... })

export const post = (context: Context) => ({ ... })

// since it's not allowed to name constants 'delete', try 'del' instead
export const del = (context: Context) => ({ ... })
```

#### Hooks

Convert a function to an object with a `handler` and a `hooks` property:

```ts
import { t } from 'elysia'

export const post = {
  handler: ({ body }) => body,
  hooks: {
    body: t.Object({
      username: t.String(),
      password: t.String()
    })
  }
}
```

#### Type-safety

Currently, you have the option to export the type of your primary Elysia instance and then import it into your route files.

```ts
import type { Context } from 'elysia'
import type { GetHandler } from '../app'

export function get({ store }: GetHandler) {
  return {
    version: store.version
  }
}
```

## License

MIT
