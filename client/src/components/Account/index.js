import React from 'react'
import {Input} from 'antd'


class Account extends React.Component{
  constructor (props) {
    super (props)
  }
  render () {
    return(
      <div className="changePassword">
        <p>原密码：<Input type="password" className="password-item"/></p>
        <p>新密码：<Input type="password" className="password-item"/></p>
        <p>确认密码：<Input type="password" className="password-item"/></p>
      </div>
    )
  }
 }

 export default Account