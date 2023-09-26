# elysia-autoroutes

File system routes for [Elysia.js](https://elysiajs.com/).

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
```

Create your first route

```ts
// routes/index.ts
import type { ElysiaApp } from './app'

export default (app: ElysiaApp) => app.get('/', { hello: 'world' })
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

## License

MIT

