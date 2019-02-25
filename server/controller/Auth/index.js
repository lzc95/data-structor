const model = require('../../models/index');
const MD5 = require('../../utils/md5')
let Auth = function (){

}

Auth.login = async function(ctx, next){
    try{
        let { username, password } = ctx.request.body
        password = MD5(password)
        let userData = await model.getUser(username, password);
        if(!userData.length){
            ctx.body = {
                code: -1,
                msg: '用户名或密码不合法！'
            }
        } else {
            ctx.session.username = username;
            ctx.cookies.set('username', username, { maxAge: 24 * 60 * 60 * 1000, httpOnly: false });
            ctx.body = {
                code: 0,
                msg: '登录成功！'
            }
        }
       
    } catch(err){
        console.log(err, '================')
    }
}

Auth.logout =  async function(ctx, next){
    if(ctx.session.username){
        ctx.session = null;
        ctx.cookies.set('username', null)
        ctx.body = {
            code: 0,
            mag: 'ok'
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '请先登录！'
        }
    }
    

}

// 检测状态
Auth.check = async function (ctx, next){
    if(ctx.session.username){
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

module.exports = Auth;