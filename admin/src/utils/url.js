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
    deleteCourseFile: prefix + '/deleteCourseFile'
}