const router = require('koa-router')()
const Auth = require('../controller/Auth')
const Notice = require('../controller/Notice')
const Course = require('../controller/Course')
const Student = require('../controller/Student')

router.use(async (ctx, next)=>{
   console.log(ctx.request.url)
   if ((ctx.request.url != '/login' && ctx.request.url != '/check' && ctx.request.url != '/studentRegister') 
   && 
   (!ctx.session.teacherName && !ctx.session.studentName)) {
      ctx.status = 401
   } else {
      await next()
   }
})

router.post('/check', Auth.check)
router.post('/login', Auth.login)
router.post('/logout', Auth.logout)
router.post('/studentRegister',Auth.studentRegister)

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

router.get('/getStudent', Student.getStudent)
router.post('/getStudentInfo',Student.getStudentInfo)
router.post('/handlePersonInfo',Student.handlePersonInfo)
router.post('/modifyPass',Student.modifyPass)

module.exports = router
