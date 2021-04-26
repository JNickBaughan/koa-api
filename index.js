const Koa = require("koa");
const axios = require("axios");
const OpenAPIBackend = require("openapi-backend").default;
const bodyparser = require("koa-bodyparser");
const cors = require("@koa/cors");

const app = new Koa();
app.use(bodyparser({ enableTypes: ["json"] }));
app.use(cors());

const getUser = async () => {
  const response = await axios.get("http://api:1001/user");
  return response.data;
};

const api = new OpenAPIBackend({
  definition: "./openapi.yml",
  strict: true,
  handlers: {
    getUser: async (ctx, koaCtx) => {
      try {
        return getUser().then((data) => {
          console.dir(data);
          koaCtx.body = data;
          koaCtx.status = 200;
        });
      } catch (err) {
        console.log("error");
        koaCtx.app.emit("error", err, koaCtx);
      }
    },
  },
});

api.init();

app.use((ctx) => {
  api.handleRequest(ctx.request, ctx);
});

app.listen(1000);
