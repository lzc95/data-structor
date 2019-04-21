import React from 'react'
import {Radio, Button,Icon,Tag,message} from 'antd'
import URL from '@/utils/url'
import axios from '@/utils/axios'
import Cookies from 'js-cookie'
const RadioGroup = Radio.Group;
import './style.less'
class Paper extends React.Component{
    constructor(props){
        super(props)
        this.state={
            paperInfo:[],
            result:[],
            paperId:-1,
            status:'',
            currentRecord:[],
            correctResult:[]
        }
    }

    handleChange(index,e) {
        let result = this.state.result;
        result[index] = e.target.value;
        this.setState({
            result:result
        })
    }
    
    // 返回试卷列表
    gokPaperList(){
        this.props.gokPaperList()
    }

    submitPaper(){
        let myResult = this.state.result
        let correctResult = this.state.correctResult;
        let success = 0
        for (var i=0;i< correctResult.length;i++){
            if(myResult[i] == correctResult[i]){
                success +=1
            }
        }
        console.log(success)
        let score = (success/correctResult.length).toFixed(2)
        console.log(score)
        axios.post(URL.submitPaper,{
            uName:Cookies.get('studentName'),
            pId:this.state.paperId,
            result:this.state.result.join(','),
            score:score
        }).then(res=>{
            if(res.code == 0){
                message.success('提交成功')
                setTimeout(()=>{
                    window.location.reload()
                },500)
               
            }
        })
    }

    componentDidMount(){
        this.setState({
            paperId:this.props.id,
            status:this.props.status,
            currentRecord:this.props.currentRecord[0]
        })
        axios.get(URL.getPaperInfo,{  
            params: {  
               id: this.props.id
            }
        })
        .then(res=>{
            if(res.code == 0){
                let data = res.data.paper_content.split('@@');
                let paperInfo = data.map(item=>{
                    return JSON.parse(item)
                })
                let correctResult = paperInfo.map(item=>{
                    return item.result
                })
                this.setState({
                  paperInfo:paperInfo,
                  result:new Array(data.length),
                  correctResult:correctResult
                })
            }
        })
    }


    render(){
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };
        return(<div>
           <Button onClick={()=>this.gokPaperList()}><Icon type="rollback"/>返回</Button>
           <h1 style={{textAlign:'center'}}>{this.props.title}</h1>
            {
                this.state.paperInfo.map((item,index)=>{
                    return(
                        <div key={index} style={{marginBottom:20}}>
                            <h3>{index+1}.<Tag>单选</Tag>{item.problem}</h3>
                            <RadioGroup  defaultValue='' 
                                onChange={(v)=>this.handleChange(index,v)} 
                                disabled={this.state.status == 'view'}>
                                <Radio style={radioStyle} value={'A'}>A.{item.A}</Radio>
                                <Radio style={radioStyle} value={'B'}>B.{item.B}</Radio>
                                <Radio style={radioStyle} value={'C'}>C.{item.C}</Radio>
                            </RadioGroup>
                            {this.state.status == 'view' &&
                             (<p>
                             <span className="correct">正确答案是：{item.result}</span> 
                             <span className='myResult'>你的答案是：{this.state.currentRecord.result.split(',')[index]}</span>
                             {item.result == this.state.currentRecord.result.split(',')[index] ?(<span style={{color:'#169866'}}>答对了</span>):
                              (<span style={{color:'red'}}>答错了</span>)}
                             </p>)}
                        </div>
                    )
                })
            }
            {this.state.status!=='view' && <Button type="primary" onClick={()=>this.submitPaper()} className="submitPaper">提交答案</Button>}  
        </div>)
    }
  
}

export default Paper