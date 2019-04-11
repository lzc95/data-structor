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
        let { tId, title,description, video,fileList } = ctx.request.body;
        let file = fileList.join(';');
        
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
    console.log(ctx.request.files.file.name,'===================')
    let index = ctx.request.files.file.path.lastIndexOf('/')+1
    ctx.body={
        code:0,
        file_path:ctx.request.files.file.path.slice(index),
        file_name:ctx.request.files.file.name,
        msg:'success'
    }
}
// 删除资料
Course.deleteCourseFile = async (ctx, next) =>{
    let { file_path } = ctx.request.body;
    let delpath = pathLib.join(__dirname, `../../public/upload/${file_path}`)
    fs.unlink(delpath, function(err) {
        if (err) {
            return console.error(err);
        }
     });
     ctx.body={
        code:0,
        msg:'success'
    }
   
}

module.exports = Course
