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
    saveChapter: prefix +'/saveChapter',
    addSection: prefix + '/addSection',
    uploadCourseFile: prefix + '/uploadCourseFile'
}