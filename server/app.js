const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const session = require('koa-session')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const path = require('path')
const route = require('./routes/index')

// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir:path.join(__dirname,'/public/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
 
  }
}));

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


//session
app.keys = ['luozc@FE'];
const CONFIG = {
  key: 'koa:session',   //cookie key 
  renew: false,
  maxAge: 24 * 60 * 60 * 1000, // cookie的过期时间 
  overwrite: false,  //是否可以overwrite    
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  // signed: true,   //签名默认true
  // rolling: true,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
};
app.use(session(CONFIG, app));

//跨域设置
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  ctx.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  await next();
});

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(route.routes(), route.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
