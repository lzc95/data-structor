let prefix = '/api'
module.exports={
    REQUEST_URL: 'http://localhost:8080/',
    // 公告
    getPublishNotice: prefix + '/getPublishNotice',
    getSingalNotice: prefix + '/viewNotice',
    // 课程目录
    getDirectory: prefix + '/getDirectory',

    addChapter: prefix +'/addChapter',
    editChapter: prefix +'/editChapter',
    delChapter: prefix +'/delChapter',
    addSection: prefix + '/addSection',
    saveSectionForm: prefix + '/saveSectionForm',
    uploadCourseFile: prefix + '/uploadCourseFile',
    deleteCourseFile: prefix + '/deleteCourseFile',
    getSignalCourseInfo: prefix + '/getSignalCourseInfo'
}