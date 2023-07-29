import dts from 'bun-plugin-dts'

async function build() {
  const entrypoint = 'src/index.ts'

  await Bun.build({
    entrypoints: [entrypoint],
    outdir: './dist',
    minify: false,
    target: 'node',
    plugins: [dts()],
  })
}

build()
