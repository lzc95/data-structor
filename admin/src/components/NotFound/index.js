import React from 'react'
import './style.css'
import not_found from '@/assets/img/404.svg'
class NotFound extends React.Component{
  constructor (props) {
    super(props)
  }
  go(params) {
    if (params == 'pre') {
      this.props.history.go(-1)
    } else {
      this.props.history.push('/')
    }
   
  }
  render(){
    return(
      <div  className="container">
        <div className="content">
          <img src={not_found}/> 
          <p className="tips">抱歉，您访问的页面找不到了，您可以</p>
          <p className="back">
            <span onClick={this.go.bind(this,'pre')}>返回上一页</span>或者
            <span onClick={this.go.bind(this,'index')}>要去系统首页看看吗？</span>
          </p>
        </div>
      </div>
    )
  }
}
export default NotFound