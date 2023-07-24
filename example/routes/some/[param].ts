export default {
  get(context: any) {
    return `Hello ${context.params.param}!`
  }
}
