import { serve } from '@hono/node-server'
import { Hono } from 'hono'


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono! index route')
})


const port = 5000
console.log(`Server is running on port http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
