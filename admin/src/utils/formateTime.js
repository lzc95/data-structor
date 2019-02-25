
function prefix0(arg){
    var d =''
    if (+arg <= 9) {
        d = '0' + arg
        return d
    } else {
        d = arg
        return d
    }
}
export default function formateTime(timestamp){
    let DATE = new Date(+timestamp)
    let year = DATE.getFullYear()
    let month = DATE.getMonth()+1
    let date = DATE.getDate()
    let hour = DATE.getHours()
    let min = DATE.getMinutes()
    let sec = DATE.getSeconds()
    
    // 不满两位数加'加0'处理
    month = prefix0(month)
    date = prefix0(date)
    hour = prefix0(hour)
    min = prefix0(min)
    sec = prefix0(sec)

    return `${year}-${month}-${date} ${hour}:${min}:${sec}`
}