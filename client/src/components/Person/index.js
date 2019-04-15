import React from 'react'
import {Tabs,Button,message} from 'antd'
import URL from '@/utils/url'
import axios from '@/utils/axios'
import Cookies from 'js-cookie'

import './style.less'
const TabPane = Tabs.TabPane;

message.config({
  top: 150,
  duration: 2,
  maxCount: 3,
});

class Person extends React.Component{
  constructor (props) {
    super (props);
    this.state={
      username:'',
      nickname:'',
      email:'',
      oldPass:'',
      newPass:''
    }
  }

  getStudentInfo(){
    axios.post(URL.getStudentInfo,{
      username:Cookies.get('studentName')
    }).then(res=>{
        if(res){
          this.setState({
            username:res.data.username,
            nickname:res.data.nickname || '',
            email:res.data.email
          })
        }
    })
  }

  changeEmail(e){
    this.setState({
      email:e.target.value
    })
  }

  changeNickName(e){
    this.setState({
      nickname:e.target.value
    })
  }

  changeOldPass(e){
    this.setState({
      oldPass:e.target.value
    })
  }
  changeNewPass(e){
    this.setState({
      newPass:e.target.value
    })
  }

  // 修改个人信息
  handlePersonInfo(){
    axios.post(URL.handlePersonInfo,{
      username:this.state.username,
      email:this.state.email,
      nickname:this.state.nickname
    }).then(res=>{
     if(res.code == 0){
        message.success('保存成功')
     }
    })
  }
  // 修改密码

  modifyPass(){
    axios.post(URL.modifyPass,{
      username:this.state.username,
      password:this.state.oldPass,
      newpassword:this.state.newPass
    }).then(res=>{
      if(res.code == 0){
        message.success('修改成功')
        this.setState({
          oldPass:'',
          newPass:''
        })
     }
    })
  }

  componentDidMount(){
    this.getStudentInfo()
  }

  render () {
    return(
      <Tabs defaultActiveKey="1" >
        <TabPane tab="资料设置" key="1">
            <p className="item">学号:{Cookies.get('studentName')}</p>
            <p className="item">邮箱：<input placeholder="email"  required value={this.state.email}
             onChange={(e)=>this.changeEmail(e)}
            /></p>
            <p className="item">昵称：<input placeholder="昵称"  required value={this.state.nickname}
             onChange={(e)=>this.changeNickName(e)}
            /></p>
            <Button type="primary" className='btn' onClick={()=>this.handlePersonInfo()}>保存</Button>
        </TabPane>
        <TabPane tab="修改密码" key="2">
            <p className="item">原密码：<input placeholder="原密码"  required value={this.state.oldPass}
             type='password' onChange={(e)=>this.changeOldPass(e)}
            /></p>
            <p className="item">新密码：<input placeholder="新密码"  required value={this.state.newPass}
             type='password' onChange={(e)=>this.changeNewPass(e)}
            /></p>
            <Button type="primary" className='btn' onClick={()=>this.modifyPass()}>确认修改</Button>
        </TabPane>
      </Tabs>
    )
  }
 }

 export default Person