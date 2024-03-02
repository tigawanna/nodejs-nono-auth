import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { usersRoute } from './users/index.users'
import { authRoute } from './auth/index.auth'


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono! index route')
})

app.route('/users', usersRoute)
app.route('/auth', authRoute)

const port = 5000
console.log(`Server is running on port http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
