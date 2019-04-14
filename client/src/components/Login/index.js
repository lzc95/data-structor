import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
const FormItem = Form.Item
import './style.less'

class Login  extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      isLogin:true
    }
  }

  changeStatus(s){
    this.setState({
      isLogin:s
    })
  }

  // 登录
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.handleLogin(Object.assign(values,{type:0}))
      }
    })
  }

  // 注册
  handleRegister = (e) =>{
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.handleRegister(values)
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return(
      <div className="login_register">
        {/* 登录 */}
        {this.state.isLogin && <div >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名（学号）" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              <p  className="changeStatusBtn" onClick={()=>{this.changeStatus(false)}}>去注册</p>
            </FormItem>
          </Form>
        </div>
        }
        {/* 注册 */}
        {!this.state.isLogin && <div>
          <Form onSubmit={this.handleRegister} className="login-form">
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名（学号）" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                注册并登录
              </Button>
              <p  className="changeStatusBtn" onClick={()=>{this.changeStatus(true)}}>去登录</p>
            </FormItem>
          </Form>
        </div>
        }
      </div>
    )
  }
}

export default Form.create()(Login)