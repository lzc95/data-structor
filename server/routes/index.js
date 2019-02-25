const router = require('koa-router')()
const Auth = require('../controller/Auth')
const Notice = require('../controller/Notice')
const Course = require('../controller/Course')

router.use(async (ctx, next)=>{
   console.log(ctx.request.url)
   if ((ctx.request.url != '/login' && ctx.request.url != '/check') && !ctx.session.username) {
      ctx.status = 401
   } else {
      await next()
   }
})

router.get('/check', Auth.check)
router.post('/login', Auth.login);
router.get('/logout', Auth.logout)

router.post('/saveNotice', Notice.save)
router.get('/getNoticeList', Notice.getList)
router.post('/delNotice', Notice.delNotice)
router.post('/viewNotice', Notice.viewNotice)
router.post('/publishNotice', Notice.publishNotice)

router.get('/getDirectory', Course.getDirectory)
router.post('/saveChapter', Course.saveChapter)
router.post('/addSection', Course.addSection)
router.post('/uploadCourseFile', Course.uploadCourseFile)

module.exports = router
