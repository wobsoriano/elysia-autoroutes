import type Elysia from 'elysia'
import { t } from 'elysia'

export default (app: Elysia) => app.get('/', context => `get user ${context.params?.id}`, { params: t.Object({ id: t.String() }) })
