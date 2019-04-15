const model = require('../../models/index')
const MD5 = require('../../utils/md5')

let Student = function () {

}

Student.getStudent = async (ctx, next) =>{
    let res = await model.getStudent()
    if(res){
        ctx.body={
            code : 0,
            data: res
        }
    }
}

Student.getStudentInfo= async (ctx, next) =>{
    let {username} = ctx.request.body
    let res = await model.getStudentInfo({username})
    if(res){
        ctx.body={
            code:0,
            data:res[0]
        }
    }
}
Student.handlePersonInfo = async (ctx, next) =>{
  let {username,email,nickname} = ctx.request.body;
  let res = await model.handlePersonInfo({username,email,nickname})
  if(res){
    ctx.body={
        code:0,
        msg:'ok'
    }
  }
}

Student.modifyPass = async (ctx,next) =>{
    let {username,password,newpassword} = ctx.request.body;
    password = MD5(password)
    newpassword = MD5(newpassword)
    let res = await  model.getUser({username,password})
    
    if(res){
        let res_ = await model.modifyPass({username,newpassword})
        if(res_){
            ctx.body={
                code:0,
                msg:'ok'
            }
        }
    }


}

module.exports = Student;






