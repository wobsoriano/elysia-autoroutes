# elysia-autoroutes

File system routes for [Elysia.js](https://elysiajs.com/). Inspired by Next.js file system routing.

## Install

```bash
bun add elysia-autoroutes
```

## Usage

### Register the plugin

Note: It uses your project's `/routes` directory as source by default.

```ts
import { Elysia } from 'elysia'
import { autoroutes } from 'elysia-autoroutes'

new Elysia()
  .use(autoroutes({
    routesDir: './routes',
    prefix: '/api' // -> optional
  }))
  .listen(3000)
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

If you export functions named e.g. `get`, `post`, `put`, `patch`, `del` etc. from a route file, those will get matched their corresponding http method automatically.

```ts
export const get = (context) => ({ ... })

export const post = (context) => ({ ... })

// since it's not allowed to name constants 'delete', try 'del' instead
export const del = (context) => ({ ... })
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

## TODO

Context and hook types.

## License

MIT
