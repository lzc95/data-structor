const model = require('../../models/index')

let Score = function () {

}

Score.getScore = async (ctx ,next) =>{
    let {pId} = ctx.request.query;
    let res = await model.getScore({pId})
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





module.exports = Score;






