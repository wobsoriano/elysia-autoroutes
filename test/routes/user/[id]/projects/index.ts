import type { ElysiaApp } from '../../../../routes.test'

export default (app: ElysiaApp) => app.get('/', (context) => {
  return {
    check: context.boop(),
    answer: context.store.magic,
  }
})
