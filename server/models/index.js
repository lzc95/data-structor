const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const config = require('../config/database.json');

const pool = mysql.createPool({
    host: config.host,
    user: config.userName,
    password: config.password,
    database: config.databaseName,
    port: config.port,
    debug: true,
});

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    })
}

// ===============================登录&注册==================================
// 查找用户
exports.getUser = (name, password) => {
    let _sql = `select * from user where user.username="${name}" and user.password="${password}";`;
    return query(_sql);
}

// 检查学生是否已经注册
exports.checkUser = (name) => {
    let _sql =`select * from user where user.username = '${name}'`;
    return query(_sql);
}

exports.studentRegister =(username, email,password,type) =>{
    let _sql =`insert into user (username,email,password,type) values('${username}','${email}','${password}',${type})`;
    return query(_sql);
}



// ==========================公告 ================================
// 获取列表总数
exports.getNoticeTotal = ()=>{
    let _sql = `select count(*) as total from notice`;
    return query(_sql);
}
// 获取公告列表
exports.getNoticeList = ({...values}) =>{
    let start = (values.current-1)*values.pageSize
    let _sql = `select id, title,create_time from notice order by create_time desc limit ${values.pageSize} offset ${start}`;
    return query(_sql);
}
// 保存公告
exports.saveNotice = ({...values}) => {
    let _sql = ''
    let { id, title, content, creator, create_time} = values;
    if(!values.id){
        let filePath = path.join(__dirname, '../data')
        // console.log(filePath, '===============================');
        // 将内容保存至文件
        fs.writeFile(`${filePath}/${create_time}.txt`,`${content}`,function(err){
            if(err){
                return console.error(err);
            }
        });
        _sql = `insert into notice (title, content, creator, create_time) value('${title}', ${create_time}, '${creator}', ${create_time})`;
    } else {
        _sql = `update notice set title=${title},content=${content} where id=${id}`
    }
    return query(_sql)
}
// 删除公告
exports.delNotice=({...values})=>{
    let _sql = `delete from notice where id = ${values.id}`;
    let filePath = path.join(__dirname, '../data');
    fs.unlink(`${filePath}/${values.create_time}.txt`, function(err){
        if(err){
            return console.error(err)
        }
    })
    return query(_sql)
}

// 获取单条公告信息
exports.viewNotice=({...values})=>{
    let _sql =`select * from notice where id = ${values.id}`;
    return query(_sql)
}

// 发布公告
exports.publishNotice = ({...values}) =>{
    let _sql = `update notice set publish_time = ${values.publish_time} where id = ${values.id}`;
    return query(_sql)
}
// 获取公告列表
exports.getPublishNotice = () =>{
    let _sql = `select id,title,create_time,publish_time from notice where publish_time != '0' order by publish_time desc`;
    return query(_sql)
}

// ===================================课程目录 ======================================
exports.getDirectory = () =>{
    let _sql = `select * from dtree where id !=1`;
    return query(_sql)
}

exports.handleDirectory = ({...values}) =>{
    let { parent_id, title, type } = values;
    let _sql = `insert into dtree (parent_id, title, type) value(${parent_id}, '${title}',${type}) `;
    return query(_sql)
}

exports.editDirectory=({...values})=>{
    let {id, title} = values;
    let _sql = `update dtree set title='${title}' where id =${id}`;
    return query(_sql)
}

exports.delDirectory = ({...values})=>{
    let {id} = values;
    let _sql = `delete from dtree where id =${id} or parent_id = ${id}`;
    return query(_sql)
}

exports.getChapter = () =>{
    let _sql =`select id,title from dtree where type=1 `
    return query(_sql)
}

// =============================小节课程信息========================
// 获取课程详细信息
exports.getSignalCourseInfo =({...values})=>{
    let {tId} = values;
    let _sql=`select section.*,dtree.title from section,dtree where section.tId = ${tId} and dtree.id = ${tId}`;
    return query(_sql)
}

// 保存课程信息
exports.saveSectionForm = ({...values}) => {
    let {tId,description,video,file,hasCourseInfo} = values;
    let _sql= ''
    if(hasCourseInfo){
        _sql = `update section set description='${description}', video='${video}',file='${file}'  where tId=${tId}`;
    } else{
        _sql = `insert into section (tId,description,video,file) value(${tId},'${description}','${video}','${file}')`
    }
   
    return query(_sql)
}


// ====================================学生===============================
exports.getStudent = () =>{
    let _sql = `select id,username,email,nickname from user where type = 0 `
    return query(_sql)
}
exports.getStudentInfo = ({...values}) =>{
    let _sql = `select username,email,nickname from user where type = 0  and username ='${values.username}' `;
    return query(_sql)
}

exports.delStudent = ({...values}) =>{
    let _sql = `delete from user where id = ${values.id}`;
    return query(_sql)
}
// 修改个人资料
exports.handlePersonInfo = ({...values})=>{
    let _sql = `update user set email = '${values.email}', nickname = '${values.nickname}'
    where username = '${values.username}'`;
    return query(_sql)
}

exports.modifyPass = ({...values}) => {
    let _sql = `update user set password = '${values.newpassword}' where username = '${values.username}'`;
    return query(_sql)
}

// ======================================测试题======================================

exports.addPaper = ({...values}) =>{
    let _sql = `insert into paper (tId,paper_title,paper_content)values(${values.tId},'${values.title}','${values.data}')`;
    return query(_sql)
}

exports.getAllPaper = () => {
    let _sql = `select dtree.title,paper.* from dtree,paper where dtree.id = paper.tId`;
    return query(_sql);
}

exports.getPaperInfo = ({...values})=>{
    let _sql =`select * from paper where id = ${values.id}`;
    return query(_sql);
}

exports.delPaper = ({...values})=>{
    let _sql =`delete from paper where id = ${values.id}`;
    return query(_sql);
}

exports.submitPaper = ({...values})=>{
    let _sql =`insert into test_record (uName,pId,result,score) 
    values('${values.uName}',${values.pId},'${values.result}','${values.score}')`;
    return query(_sql);
}
exports.getStudentTestRecord = ({...values})=>{
    let _sql =`select * from test_record where uName = '${values.uName}'`;
    return query(_sql);
}

// =======================================留言===========================
exports.getMessage = ({...values}) => {
    let _sql = `select * from message where tId = ${values.tId}`;
    return query(_sql)
}

exports.addMessage = ({...values}) => {
    let _sql = `insert into message (tId,mTime,mCreator,mContent) 
    values(${values.cId},'${values.mTime}','${values.username}','${values.content}')`;
    return query(_sql);
}


//====================成绩分析====================
exports.getAllPaperName = () => {
    let _sql = `select id,paper_title from paper `;
    return query(_sql);
}
exports.getScore = ({...values}) => {
    let _sql = `select test_record.id,test_record.uName,test_record.score,user.nickname
    from test_record,user where pId = ${values.pId} and user.username = test_record.uName `;
    return query(_sql);
}