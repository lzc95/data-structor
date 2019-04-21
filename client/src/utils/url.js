let prefix = '/api'
module.exports={
    REQUEST_URL: 'http://localhost:8080/',
    // 公告
    getPublishNotice: prefix + '/getPublishNotice',
    getSingalNotice: prefix + '/viewNotice',
    // 课程目录
    getDirectory: prefix + '/getDirectory',
    getSignalCourseInfo: prefix + '/getSignalCourseInfo',

    // 个人
    getStudentInfo: prefix + '/getStudentInfo',
    handlePersonInfo: prefix +'/handlePersonInfo',
    modifyPass: prefix + '/modifyPass',


    // 测试
    getAllPaper: prefix + '/getAllPaper',
    getPaperInfo: prefix + '/getPaperInfo',

    // 留言
    getMessage: prefix + '/getMessage',
    addMessage: prefix + '/addMessage',


}