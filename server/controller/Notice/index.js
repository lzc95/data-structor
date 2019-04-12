const model = require('../../models/index')
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')

let Notice = function () {

}

Notice.getList = async (ctx, next) => {
    try{
        let {current, pageSize} = ctx.request.query
        let result = await model.getNoticeTotal()
        let data = await model.getNoticeList({current, pageSize})
        ctx.body={
            code: 0,
            data: data,
            total:result[0].total
        }
    } catch(err){

    }
}

Notice.save = async (ctx, next) => {
    try{
        let {title, content} = ctx.request.body;
        let creator = ctx.session.username;
        let create_time = Date.now()
        let res = await model.saveNotice({title, content, creator, create_time});
        if(res){
            ctx.body = {
                code: 0,
                msg:'保存成功'
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '保存失败'
            }
        }
    } catch(err){

    }
}

Notice.delNotice = async (ctx, next) =>{
    try{
        let {id, create_time} = ctx.request.body
        let data = await model.delNotice({id, create_time})
        if (data){
            ctx.body={
                code:0,
                data:data
            }
        }
    }catch(err){

    }
}

Notice.viewNotice =  async(ctx, next)=>{
    try{
        let {id, create_time} = ctx.request.body
        let data = await model.viewNotice({id})

        let filePath = path.join(__dirname, '../../data');
        let content = fs.readFileSync(`${filePath}/${create_time}.txt`)
        data[0].content = content.toString()
        if (data){
            ctx.body = {
                code: 0,
                data: data[0]
            }
        }   
    }catch(err){
        console.log(err)
    }
}

Notice.publishNotice = async(ctx, next) =>{
    try{
        let {isSenndEmail} = ctx.request.body
        let transporter = nodemailer.createTransport({
            host: 'smtp.163.com',
            port: 465,
            secure: true,
            auth: {
            user: '18792867055@163.com', //邮箱的账号
            pass: 'luozc1995'//邮箱的密码
            }
        });
        let mailOptions = {
            from: '"课程管理系统" <18792867055@163.com>', // sender address
            to: '1410647500@qq.com', // list of receivers
            subject: 'Hello ✔', // 邮件主题
            text: 'Hello world ?', // 存文本类型的邮件正文
            html: '<b>Hello world ?</b>' // html类型的邮件正文
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });

        
        ctx.body = {
            code: 0,
            msg: 'ok'
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = Notice;






