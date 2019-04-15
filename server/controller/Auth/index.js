const model = require('../../models/index');
const MD5 = require('../../utils/md5')
let Auth = function (){

}

Auth.login = async function(ctx, next){
    try{
        console.log(ctx.request.header.origin)
        let { username, password, type } = ctx.request.body
        password = MD5(password)
        let userData = await model.getUser(username, password);
        if(!userData.length){
            ctx.body = {
                code: -1,
                msg: '用户名或密码不正确！'
            }
        } else {
            if(userData[0].type == type){
                if(type ==1) {
                    // 教师
                    ctx.session.teacherName = username;
                    ctx.cookies.set('teacherName', username, { 
                        maxAge: 24 * 60 * 60 * 1000,
                        httpOnly: false
                    });
                } else {
                    // 学生
                    ctx.session.studentName = username;
                    ctx.cookies.set('studentName', username, { 
                        maxAge: 24 * 60 * 60 * 1000,
                        httpOnly: false
                    });
                }  
                ctx.body = {
                    code: 0,
                    msg: '登录成功！'
                }
            } else {
                ctx.body = {
                    code: -1,
                    msg: '用户名或密码不正确！'
                }
            }    
        }
    } catch(err){
        console.log(err, '================')
    }
}


Auth.logout =  async function(ctx, next){
    let {type} = ctx.request.body
    if(type==1){
        if(ctx.session.teacherName){
            ctx.session.teacherName = null;
            ctx.cookies.set('teacherName', null)
            ctx.body = {
                code: 0,
                mag: 'ok'
            }
        }
    } else {
        if(ctx.session.studentName){
            ctx.session.studentName = null;
            ctx.cookies.set('studentName', null)
            ctx.body = {
                code: 0,
                mag: 'ok'
            }
        }
    }
    
}

// 检测状态
Auth.check = async function (ctx, next){
    let {type} = ctx.request.body;
    console.log(type, '***********************')
    if(type == 1) {
        if(ctx.session.teacherName){
            ctx.body={
                code: 0,
                msg: 'ok'
            }
        } else {
            ctx.body={
                code: -1,
                msg:'you have no auth!'
            }
        }
    } else {
        if(ctx.session.studentName){
            ctx.body={
                code: 0,
                msg: 'ok'
            }
        } else {
            ctx.body={
                code: -1,
                msg:'you have no auth!'
            }
        }
    }
   
}

Auth.studentRegister = async (ctx, next) =>{
    try{
        let { username, email, password } = ctx.request.body
       
        let userData = await model.checkUser(username);
        if(!!userData.length){
            ctx.body = {
                code: -1,
                msg: '该学号已经注册过了'
            }
        } else {
            password = MD5(password)
            let res = await model.studentRegister(username,email, password,0)
            if(res){
                ctx.session.username = username;
                ctx.cookies.set('username', username, { maxAge: 24 * 60 * 60 * 1000, httpOnly: false });
                ctx.body = {
                    code: 0,
                    msg: '注册成功！'
                }
            }  
        }
       
    } catch(err){
        console.log(err, '================')
    }
}

module.exports = Auth;