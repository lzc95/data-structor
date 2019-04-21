const model = require('../../models/index')

let Message = function () {

}

Message.getMessage = async (ctx ,next) =>{
    let {tId} = ctx.request.query;
    let res = await model.getMessage({tId})
    if(res){
        ctx.body={
            code: 0,
            data:res
        }
    } else {
        ctx.body={
            code: -1,
            msg: 'error'
        }
    }
}

Message.addMessage = async (ctx ,next) =>{
    let {username,content,cId} = ctx.request.body;
    let mTime = new Date().getTime();
    let res = await model.addMessage({username,content,cId,mTime})
    if(res){
        ctx.body={
            code: 0,
            msg: 'ok'
        }
    } else {
        ctx.body={
            code: -1,
            msg: 'error'
        }
    }
}



module.exports = Message;






