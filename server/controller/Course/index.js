const model = require('../../models/index')
const fs = require('fs')
const pathLib = require('path')


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

Course.addChapter = async (ctx, next) =>{
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

Course.editChapter = async (ctx, next) =>{
    try {
        let { id,title } = ctx.request.body;
        let res = await model.editDirectory({ id, title});
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

Course.delChapter = async (ctx, next) =>{
    try {
        let { id} = ctx.request.body;
        console.log(id)
        let res = await model.delDirectory({ id});
        if (res) {
            ctx.body = {
                code: 0,
                msg: '删除成功'
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

Course.saveSectionForm = async(ctx, next)=>{
    try{
        let { tId, title } = ctx.request.body;
        let res = await model.saveSectionForm({ tId, title});
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
    const oldPath=ctx.request.files.path;
    const newPath=ctx.request.files.path+pathLib.parse(ctx.request.files.originalname).ext;
    const newFileName=ctx.request.files.name+pathLib.parse(ctx.request.files.originalname).ext;
    fs.rename(oldPath,newPath,(err)=>{
        if(err){
            console.error(err);  
        } else {
           
        }
    })
    ctx.body={
        code:0,
        msg:'success'
    }
}
module.exports = Course
