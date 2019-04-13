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
router.get('/getPublishNotice', Notice.getPublishNotice)

router.get('/getDirectory', Course.getDirectory)
router.post('/addChapter', Course.addChapter)
router.post('/editChapter', Course.editChapter)
router.post('/delChapter', Course.delChapter)

router.post('/addSection', Course.addSection)
router.post('/saveSectionForm', Course.saveSectionForm)
router.post('/uploadCourseFile', Course.uploadCourseFile)
router.post('/deleteCourseFile', Course.deleteCourseFile)
router.post('/getSignalCourseInfo', Course.getSignalCourseInfo)

module.exports = router
