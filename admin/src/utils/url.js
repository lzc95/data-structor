let prefix = '/api'
module.exports={
    // 公告
    getNoticeList: prefix + '/getNoticeList',
    delNotice: prefix + '/delNotice',
    viewNotice: prefix + '/viewNotice',
    saveNotice: prefix + '/saveNotice',
    publishNotice: prefix + '/publishNotice',

    // 课程目录
    getDirectory: prefix + '/getDirectory',
    addChapter: prefix +'/addChapter',
    editChapter: prefix +'/editChapter',
    delChapter: prefix +'/delChapter',
    addSection: prefix + '/addSection',
    saveSectionForm: prefix + '/saveSectionForm',
    uploadCourseFile: prefix + '/uploadCourseFile',
    deleteCourseFile: prefix + '/deleteCourseFile',
    getSignalCourseInfo: prefix + '/getSignalCourseInfo',
    getChapter:prefix + '/getChapter',

    // 学生
    getStudent: prefix + '/getStudent',
    delStudent: prefix +'/delStudent',


    // 测试题
    addPaper: prefix + '/addPaper',
    getAllPaper: prefix + '/getAllPaper',
    delPaper: prefix + '/delPaper',
    getPaperInfo: prefix + '/getPaperInfo',


    // 密码
    modifyPass: prefix +'/modifyPass',

    //
   getAllPaperName: prefix + '/getAllPaperName',
   getScore: prefix + '/getScore' 
}