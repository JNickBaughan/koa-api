const Koa = require("koa");
const OpenAPIBackend = require("openapi-backend").default;

const app = new Koa();

const api = new OpenAPIBackend({
  definition: "./openapi.yml",
  strict: true,
  handlers: {
    getUser: (ctx, koaCtx) => {
      console.dir(ctx);
      console.dir(koaCtx);
      koaCtx.body = {
        user: "bob",
      };
    },
  },
});

api.init();

app.use((ctx) => {
  api.handleRequest(ctx.request, ctx);
});

app.listen(1000);
