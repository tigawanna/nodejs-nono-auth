import { html } from "hono/html";

export const AuthLayout = (props: { children: any,title:string }) => html`
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Auth</title>
    </head>
    <body>
      <div class="p-4">
        <h1 class="text-4xl font-bold mb-4"><a href="/">${props.title}</a></h1>
        ${props.children}
      </div>
    </body>
  </html>
`;
