import React from 'react'
import {Input,Button, message} from 'antd'
import Cookies from 'js-cookie'
import URL from '@/utils/url'
import axios from '@/utils/axios'
import './style.css'

class Account extends React.Component{
  constructor (props) {
    super (props)
    this.state={
      oldPassword:'',
      newPassword:'',
      rePassword:''
    }
  }

  handleOldPass(e){
    this.setState({
      oldPassword:e.target.value
    })
  }

  handleNewPass(e){
    this.setState({
      newPassword:e.target.value
    })
  }

  handleRePassword(e){
    this.setState({
      rePassword:e.target.value
    })
  }

  modifyPass(){
    let oldPass = this.state.oldPassword;
    let newPass = this.state.newPassword;
    let rePass = this.state.rePassword;

    if(newPass.trim() === rePass.trim()){
      axios.post(URL.modifyPass,{
        username:Cookies.get('teacherName'),
        password:oldPass,
        newpassword:newPass
      }).then(res=>{
        if(res.code ==0){
          message.success('修改成功')
          this.setState({
              oldPassword:'',
              newPassword:'',
              rePassword:''
          })
        }
      })
    } else {
        message.error('两次密码输入不一致')
        this.setState({
          rePassword:''
        })
    }
    
  }
  render () {
    return(
      <div className="changePassword">
        <p>原密码：<Input type="password" className="password-item"
        value={this.state.oldPassword}
        onChange={(e)=>this.handleOldPass(e)}/></p>
        <p>新密码：<Input type="password" className="password-item"
        value={this.state.newPassword}
        onChange={(e)=>this.handleNewPass(e)}/></p>
        <p>确认密码：<Input type="password" className="password-item"
        value={this.state.rePassword}
        onChange={(e)=>this.handleRePassword(e)}/></p>
        <Button type="primary" className="modifyPass"
        onClick={()=>this.modifyPass()}>确认修改</Button>
      </div>
    )
  }
 }

 export default Account