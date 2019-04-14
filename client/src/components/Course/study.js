import React from 'react';
import { Tabs,Icon,Select } from 'antd';
import NoData from './nodata'

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
            activeTab:'1',
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
    }

    getCourseInfo(id){
        axios.post(URL.getSignalCourseInfo,{
            tId:id
        }).then(res=>{
            let data = res.data[0]
            if(data){
                this.setState({
                    video:data.video,
                    file:JSON.parse(data.file).response.file_path
                })
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

    componentDidMount(){
        this.getDirectory()
        this.getCourseInfo(this.props.studyCourseId)
        this.sectionSelected(this.props.parentId)

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
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Study;