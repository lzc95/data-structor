import React from 'react'
import {List,Card, Button} from 'antd'
import URL from '@/utils/url'
import axios from '@/utils/axios'
import Paper from './paper'
import Cookies from 'js-cookie'

import './style.less'
class Task extends React.Component{
    constructor(props){
        super(props)
        this.state={
            paperData:[],
            isTest:false,
            paperId:-1,
            paperTitle:'',
            record_paper:[],
            status:'',
            record:[],
            currentRecord:[]
        }
    }

    goTest(id, title,status){
        let currentRecord = this.state.record.filter(item=>{
            return item.pId == id
        })
        this.setState({
            paperId:id,
            paperTitle:title,
            isTest:true,
            status:status,
            currentRecord:currentRecord
        })
    }

    gokPaperList(){
        this.setState({
            isTest:false
        })
    }

    getAllPaper(){
        axios.get(URL.getAllPaper)
        .then(res=>{
            if(res.code == 0){
                this.setState({
                    paperData:res.data
                })
            }
        })
    }

    getStudentTestRecord(){
        axios.get(URL.getStudentTestRecord,{
            params:{
                uName:Cookies.get('studentName')
            }
        }).then(res=>{
            if(res.code == 0){
                let record_paper = res.data.map(item=>{
                    return item.pId
                })
                this.setState({
                    record_paper:record_paper,
                    record:res.data
                })
                
            }
        })
    }

    componentDidMount(){
        this.getAllPaper()
        this.getStudentTestRecord()
    }
    render(){
        return(<div>
            {!this.state.isTest && this.state.paperData.map(item=>{
            return(
                <Card
                    type="inner"
                    title={item.title}
                    key={item.tId}
                    className='cardMargin'
                    >
                    <List
                        itemLayout="horizontal"
                        dataSource={item.children}
                        renderItem={ v => (
                        <List.Item className='line'>
                            <List.Item.Meta
                            title={<span>
                                <span>{v.paper_title}</span>
                                <Button type="default" className='btn2'
                                disabled={this.state.record_paper.indexOf(v.id) ==-1}
                                onClick={()=>this.goTest(v.id, v.paper_title,'view')}>查看测验记录</Button>
                                <Button type="primary" className='btn1' 
                                disabled={this.state.record_paper.indexOf(v.id) !==-1}
                                onClick={()=>this.goTest(v.id, v.paper_title,'edit')}>前往测验</Button>
                            </span>}
                            />
                        </List.Item>
                        )}
                    />
                </Card>)
            })}
            {
                this.state.isTest && <Paper 
                id={this.state.paperId} 
                title={this.state.paperTitle}
                status={this.state.status}
                currentRecord={this.state.currentRecord}
                gokPaperList={()=>this.gokPaperList()}/>
            }
        </div>)
    }
  
}

export default Task