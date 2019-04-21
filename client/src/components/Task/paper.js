import React from 'react'
import {Radio, Button,Icon,Tag} from 'antd'
import URL from '@/utils/url'
import axios from '@/utils/axios'

const RadioGroup = Radio.Group;
import './style.less'
class Paper extends React.Component{
    constructor(props){
        super(props)
        this.state={
            paperInfo:[],
            result:[]
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
        console.log(this.state.result)
    }

    componentDidMount(){
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
                this.setState({
                  paperInfo:paperInfo,
                  result:new Array(data.length)
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
                        <div key={index}>
                            <h3>{index+1}.<Tag>单选</Tag>{item.problem}</h3>
                            <RadioGroup  defaultValue='' onChange={(v)=>this.handleChange(index,v)}>
                                <Radio style={radioStyle} value={'A'}>A.{item.A}</Radio>
                                <Radio style={radioStyle} value={'B'}>B.{item.B}</Radio>
                                <Radio style={radioStyle} value={'C'}>C.{item.C}</Radio>
                            </RadioGroup>
                        </div>
                    )
                })
            }
            <Button type="primary" onClick={()=>this.submitPaper()} className="submitPaper">提交答案</Button>    
        </div>)
    }
  
}

export default Paper