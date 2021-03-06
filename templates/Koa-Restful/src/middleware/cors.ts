import { Context, Next } from "koa";

export default async (ctx: Context, next: Next): Promise<void> => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method.toUpperCase() === "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
};
