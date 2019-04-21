import React from 'react'
import {List,Card, Button} from 'antd'
import URL from '@/utils/url'
import axios from '@/utils/axios'
import Paper from './paper'

import './style.less'
class Task extends React.Component{
    constructor(props){
        super(props)
        this.state={
            paperData:[],
            isTest:false,
            paperId:-1,
            paperTitle:''
        }
    }

    goTest(id, title){
        this.setState({
            paperId:id,
            paperTitle:title,
            isTest:true
        })
    }

    gokPaperList(){
        this.setState({
            isTest:false
        })
    }

    componentDidMount(){
        axios.get(URL.getAllPaper)
        .then(res=>{
            if(res.code == 0){
                this.setState({
                    paperData:res.data
                })
            }
        })
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
                                <Button type="primary" className='btn' onClick={()=>this.goTest(v.id, v.paper_title)}>前往测验</Button>
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
                gokPaperList={()=>this.gokPaperList()}/>
            }
        </div>)
    }
  
}

export default Task