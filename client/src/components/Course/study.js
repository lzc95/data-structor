import React from 'react';
import { Tabs,Icon,Select,Input,Button,List,message,Avatar } from 'antd';
import NoData from './nodata'
import Cookies from 'js-cookie'

import URL from '@/utils/url'
import axios from '@/utils/axios'
import formateTime from '@/utils/formateTime'

import './style.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { TextArea } = Input;

const fileUrl = URL.REQUEST_URL + 'upload/'

class Study extends React.Component{
    constructor(props){
        super(props)
        this.state={
            firstSelected: -1,
            secondSelected: -1,
            activeTab:'1',
            firstData:[],
            secondData:[],
            secondSelectedData: [],
            video:'',
            file:'',
            messageData:[],
            mContent:''

        }
    }

    getDirectory(){
        axios.get(URL.getDirectory).then(res => {
            let data = res.data
            let firstData = data.map(v=>{
                return{
                    id: v.id,
                    title:v.title
                }
            })
            let secondData = data.map(v=>{
                return{
                    [v.id]:v.children
                }
            })
          this.setState({
            firstData:firstData,
            secondData:secondData
          })
          console.log(firstData,secondData)
        })
    }

    // 列表跳转到学习页面 锁定当前节点
    sectionSelected(v){
        axios.get(URL.getDirectory).then(res => {
            let data = res.data
            let secondData = data.map(v=>{
                return{
                    [v.id]:v.children
                }
            })
            let sectionData = secondData.filter(item=>{
                return v == Object.keys(item)
            })
            this.setState({
                secondSelectedData:sectionData[0][Object.keys(sectionData[0])]
            })
          
        })
    }

    changeFirst(v){
        console.log(v)
        let data = this.state.secondData.filter(item=>{
            return v == Object.keys(item)
        })
        console.log(data[0][Object.keys(data[0])])
        this.setState({
            firstSelected: v,
            secondSelected: -1,
            secondSelectedData:data[0][Object.keys(data[0])]
        })
    }

    changeSecond(v){
        this.setState({
            secondSelected:v
        })
        this.getCourseInfo(v)
        this.getMessage(v)
    }

    getCourseInfo(id){
        axios.post(URL.getSignalCourseInfo,{
            tId:id
        }).then(res=>{
            let data = res.data[0]
            if(data){
                this.setState({
                    video:data.video,    
                })
                if(data.file){
                    this.setState({
                        file:JSON.parse(data.file).response.file_path
                    })
                } else{
                    this.setState({
                        file:''
                    })
                }
            } else{
                this.setState({
                    video:'',
                    file:''
                })
            }
        })
    }
    //第二个select获得焦点时删除默认Option('请选择课时')
    handelFocus(){
        this.setState({
            secondSelected: '请选择课时'
        })
    }

    // 返回课程列表
    goCourseList(){
        this.props.changeStudyStatus(false)
    }

   //切换面板
    changeTab(tab){
       this.setState({
           activeTab:tab
       })
    } 


    // 获取留言
    getMessage(id){
        axios.get(URL.getMessage,{
            params:{
                tId:id
            }
        }).then(res=>{
            if(res.code == 0){
                this.setState({
                    messageData:res.data
                })
            }
        })
    }

    // 发表留言
    addMessage(){
        if(this.state.mContent.trim()!==''){
            axios.post(URL.addMessage,{
                username:Cookies.get('studentName'),
                cId:this.props.studyCourseId,
                content:this.state.mContent
            }).then(res=>{
                if(res.code == 0){
                    message.success('发表成功')
                    this.setState({
                        mContent:''
                    })
                }
            })
        } else{
            message.warning('留言不能为空')
        }
        
    }

    handleMessage(e){
        this.setState({
            mContent:e.target.value
        })
    }

    componentDidMount(){
        this.getDirectory()
        this.getCourseInfo(this.props.studyCourseId)
        this.sectionSelected(this.props.parentId)
        this.getMessage(this.props.studyCourseId)

        this.setState({
            firstSelected: this.props.parentId,
            secondSelected: this.props.studyCourseId,
            activeTab:this.props.activeTab + ''
        })
    }

    render(){
        return(
            <div>
                <span onClick={()=>this.goCourseList()} className="name">课件</span>
                <Icon type="right" className='iconRightRow'/>
                <Select  defaultValue={this.props.parentId} style={{ width: 200 }} onChange={(v)=>this.changeFirst(v)}>
                {
                    this.state.firstData.map((d,index)=>{
                        return(
                            <Option value={d.id} key={d.id}>{d.title}</Option>
                        )
                    })
                    
                }
                </Select>
                <Icon type="right" className="iconRightRow"/>
                <Select value={this.state.secondSelected} style={{ width: 200 }} onChange={(v)=>this.changeSecond(v)} onFocus={()=>this.handelFocus()}>
                {this.state.secondSelected == -1 && <Option value={-1} key={-1}>请选择课时</Option> } 
                {
                    this.state.secondSelectedData.map((d,index)=>{
                        return(
                            <Option value={d.id} key={d.id}>{d.title}</Option>
                        )
                    })
                    
                }
                </Select>
                <Tabs activeKey={this.state.activeTab+''} style={{width:950}} onChange={(v)=>this.changeTab(v)}>
                    <TabPane tab={<Icon type="video-camera" className="tab"/>} key="1">
                        {!!this.state.video ? 
                        <iframe  src={this.state.video} allowFullScreen frameBorder='0' width='950' height='600'></iframe>
                        : <NoData/>}
                    </TabPane>
                    <TabPane tab={<Icon type="file" className="tab"/>} key="2">
                        {!!this.state.file ?
                        <iframe src={fileUrl+this.state.file} width='950' height='600'></iframe>
                        : <NoData/>
                        }
                    </TabPane>
                    <TabPane tab={<Icon type="message" className="tab"/>} key="3">
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.messageData}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<span>{item.mContent}</span>}
                                description={<span>{formateTime(item.mTime)}
                                <span style={{marginLeft:30}}>发表人：{item.mCreator}</span></span>}
                                />
                            </List.Item>
                            )}
                        />
                        <p style={{marginTop:30}}>发表留言：</p>
                        <TextArea rows={4} onChange={(e)=>this.handleMessage(e)}/>
                        <Button type="primary"  style={{marginTop:10}}
                        onClick={()=>this.addMessage()}>发表</Button>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Study;