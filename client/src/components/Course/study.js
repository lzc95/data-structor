import React from 'react';
import { Tabs,Icon,Select } from 'antd';

import URL from '@/utils/url'
import axios from '@/utils/axios'

import './style.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

const fileUrl = URL.REQUEST_URL + 'upload/'

class Study extends React.Component{
    constructor(props){
        super(props)
        this.state={
            firstSelected: -1,
            secondSelected: -1,
            firstData:[],
            secondData:[],
            secondSelectedData: [],
            video:'',
            file:''

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

    changeFirst(v){
        console.log(v)
        let data = this.state.secondData.filter(item=>{
            return v == Object.keys(item)
        })
        console.log(data[0][Object.keys(data[0])])
        this.setState({
            firstSelected: v,
            secondSelectedData:data[0][Object.keys(data[0])]
        })
    }

    changeSecond(v){
        this.setState({
            secondSelected:v
        })
        this.getCourseInfo(v)
    }

    getCourseInfo(id){
        axios.post(URL.getSignalCourseInfo,{
            tId:id
        }).then(res=>{
            let data = res.data[0]
            this.setState({
                video:data.video,
                file:JSON.parse(data.file).response.file_path
            })
        })
    }
    
    // 返回课程列表
    goCourseList(){
        this.props.changeStudyStatus(false)
    }

    componentDidMount(){
        this.getDirectory()
        this.getCourseInfo(this.props.studyCourseId)
        console.log(this.props.parentId,this.props.studyCourseId)
        this.setState({
            firstSelected: this.props.parentId,
            secondSelected: this.props.studyCourseId
        })
    }

    render(){
        return(
            <div>
                <span onClick={()=>this.goCourseList()} className="name">课件</span>
                <Icon type="right" className='iconRightRow'/>
                <Select  defaultValue={this.state.firstSelected} style={{ width: 200 }} onChange={(v)=>this.changeFirst(v)}>
                {
                    this.state.firstData.map((d,index)=>{
                        return(
                            <Option value={d.id} key={d.id}>{d.title}</Option>
                        )
                    })
                    
                }
                </Select>
                <Icon type="right" className="iconRightRow"/>
                <Select defaultValue={this.state.secondSelected} style={{ width: 200 }} onChange={(v)=>this.changeSecond(v)}>
                {
                    this.state.secondSelectedData.map((d,index)=>{
                        return(
                            <Option value={d.id} key={d.id}>{d.title}</Option>
                        )
                    })
                    
                }
                </Select>
                <Tabs defaultActiveKey="1" style={{width:950}}>
                    <TabPane tab={<Icon type="video-camera" className="tab"/>} key="1">
                        <iframe  src={this.state.video} allowFullScreen frameBorder='0' width='950' height='600'></iframe>
                    </TabPane>
                    <TabPane tab={<Icon type="file" className="tab"/>} key="2">
                        <iframe src={fileUrl+this.state.file} width='950' height='600'></iframe>
                    </TabPane>
                    <TabPane tab={<Icon type="message" className="tab"/>} key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Study;