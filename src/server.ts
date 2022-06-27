import sirv from "sirv";
// NOTE: https://github.com/sveltejs/sapper/issues/1783#issuecomment-869221926
// import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import express from "express";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

express()
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, () => {
    // console.log(`App listening on port ${PORT}`)
  })
