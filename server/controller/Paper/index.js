const model = require('../../models/index')

let Paper = function () {

}

Paper.addPaper = async (ctx ,next) =>{
    let {tId, title, data} = ctx.request.body
    let res = await model.addPaper({tId,title, data})
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

Paper.getAllPaper =  async (ctx, next) => {
    let res = await model.getAllPaper();
    if(res){
        let data = [];
        let temp = [];
        for(let i = 0; i < res.length; i++){
            if(temp.indexOf(res[i].tId) == -1){
                temp.push(res[i].tId);
                data.push({
                    tId:res[i].tId,
                    title:res[i].title,
                    children:[]
                })
            }
        }

        for(let i=0;i<res.length;i++){
            for(let j=0;j<data.length;j++){
                if(res[i].tId == data[j].tId){
                    data[j].children.push({
                        id:res[i].id,
                        paper_title: res[i].paper_title,
                        paper_content: res[i].paper_content
                    })
                }
            }
        }
        ctx.body = {
            code:0,
            data:data
        }
    } else {
        ctx.body={
            code: -1,
            msg: 'error'
        }
    }
}

Paper.getPaperInfo = async (ctx, next) => {
    let {id} = ctx.request.query;
    let res = await model.getPaperInfo({id})
    if(res){
        ctx.body={
            code:0,
            data:res[0]
        }
    }
}

Paper.delPaper  = async (ctx, next) =>{
    let {id} = ctx.request.query;
    let res = await model.delPaper({id})
    if(res){
        ctx.body={
            code:0,
            msg:'删除成功'
        }
    }
}

Paper.submitPaper  = async (ctx, next) =>{
    let {uName,pId,result,score} = ctx.request.body;
    let res = await model.submitPaper({uName,pId,result,score})
    if(res){
        ctx.body={
            code:0,
            msg:'提交成功'
        }
    }
}

Paper.getStudentTestRecord = async (ctx, next) =>{
    let {uName} = ctx.request.query;
    let res = await model.getStudentTestRecord({uName})
    if(res){
        ctx.body={
            code:0,
            data:res
        }
    }
}

Paper.getAllPaperName = async (ctx, next) =>{
    let res = await model.getAllPaperName()
    if(res){
        ctx.body={
            code:0,
            data:res
        }
    }
}

module.exports = Paper;






