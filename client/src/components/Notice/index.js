import React from 'react'
import {List,Popover} from 'antd'
import { withRouter } from 'react-router-dom'
import axios from '@/utils/axios'
import URL from '@/utils/url'
import formateTime from '@/utils/formateTime'

import './style.css'

class Notice extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            title:'',
            content:'',
            publish_time:''
        }

    }

    viewNotice(id, create_time){
        axios.post(URL.getSingalNotice,{
            id:id,
            create_time:create_time
        })
        .then(res=>{
            this.setState({
                title:res.data.title,
                content:res.data.content,
                publish_time:res.data.publish_time
            })
        })
    }

    componentDidMount(){
        axios.get(URL.getPublishNotice).then(res=>{
         if(res.data){
            this.setState({
                data:res.data
            })
            this.viewNotice(res.data[0].id,res.data[0].create_time)
         }
        })
    }
    render(){
        return(<div>
            <div className="notice">
                <h2 className="align">{this.state.title}</h2>
                <p className="align time">
                    <span>发布时间：</span>
                    <span>{formateTime(this.state.publish_time)}</span>
                </p>
                <article dangerouslySetInnerHTML={{__html: this.state.content}} className="article"></article>
            </div>
            <Popover 
                placement="topRight"    
                content={<List
                itemLayout="horizontal"
                className="noticelist"
                dataSource={this.state.data}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    title={<span className='listTitle' onClick={()=>this.viewNotice(item.id, item.create_time)}>{item.title}</span>}
                    description={<span className='listTime'>{formateTime(item.publish_time)}</span>}
                    />
                </List.Item>
                )}
            />}>
                <div className='allNoticeCircle'>全部<br/>公告</div>
            </Popover>
        </div>)
    }
}

export default withRouter(Notice)