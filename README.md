# elysia-autoroutes

File-system routes for [Elysia.js](https://elysiajs.com/).

## Install

```bash
bun add elysia-autoroutes
```

## Usage

### 1. Register the plugin

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

### 2. Create your first route in the `routesDir` directory

```ts
// file: routes/hello.ts
// url: http://localhost:3000/hello

export default {
  get: () => 'Hello world!'
}
```

### 3. Access params

```ts
// file: routes/todo/[todoId].ts
// url: http://localhost:3000/todo/:todoId

export default {
  get: (context) => `Todo id: ${context.params.todoId}`
}
```

### 4. Wildcard (*) routes

```ts
// file: routes/profile/[...id].ts
// url: http://localhost:3000/profile/*

export default {
  get: (context) => ({ wildcard: context.params })
}
```

### 5. Prefix route

```ts
// file: routes/hello.ts
// url: http://localhost:3000/api/hello

app.use(autoroutes({
  routesDir: './routes',
  prefix: '/api'
}))

export default {
  get: () => 'Hello world!'
}
```

## License

MIT
