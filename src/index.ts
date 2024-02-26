import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { postsApp } from './posts/posts.index'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono! index route')
})
app.route('/posts', postsApp)

const port = 5000
console.log(`Server is running on port http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
