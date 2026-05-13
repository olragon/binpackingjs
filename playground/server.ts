import index from "./index.html";

const server = Bun.serve({
  port: Number(process.env.PORT) || 3031,
  routes: {
    "/": index,
  },
  development: {
    hmr: true,
    console: true,
  },
});

console.log(`binpackingjs playground running at ${server.url}`);
