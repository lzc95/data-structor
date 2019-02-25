const model = require('../../models/index')
const fs = require('fs')
const path = require('path')


let Course = function () {

}

Course.getDirectory = async (ctx, next) => {
    try{
        let res = await model.getDirectory();
        
        if (res) {
            let data = []
            for(let i=0; i<res.length;i++){
                if (res[i].type == 1) {
                    data.push({
                        id: res[i].id,
                        title: res[i].title,
                        children: []
                    })
                }
            }
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < res.length; j++) {
                    if (res[j].parent_id == data[i].id) {
                        data[i].children.push({
                            id: res[j].id,
                            title: res[j].title
                        })
                    }
                }
            }
            ctx.body = {
                code: 0,
                data:data,
                msg: '保存成功'
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '保存失败'
            }
        }
    }catch(err){

    }
}

Course.saveChapter = async (ctx, next) =>{
    try {
        let { title } = ctx.request.body;
        let res = await model.handleDirectory({ parent_id: 1, title, type: 1});
        console.log(res)
        if (res) {
            ctx.body = {
                code: 0,
                msg: '保存成功'
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '保存失败'
            }
        }
    } catch (err) {

    }
}

Course.addSection = async(ctx, next)=>{
    try{
        let { parent_id, title } = ctx.request.body;
        let res = await model.handleDirectory({ parent_id, title, type: 2 });
        if (res) {
            ctx.body = {
                code: 0,
                msg: '保存成功'
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

// 上传课件资料
Course.uploadCourseFile = async (ctx, next) =>{
    console.log(ctx.request.files,'===================')
    ctx.body={
        code:0,
        msg:'success'
    }
}
module.exports = Course
