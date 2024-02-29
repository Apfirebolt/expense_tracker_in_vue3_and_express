import { createApp } from './main'

export async function render(url) {
  const { app } = createApp()

  const router = app.$router

  router.push(url)

  await router.isReady()

  return app.$renderer.renderToString(app)
}