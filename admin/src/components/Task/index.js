import React from 'react'
import {Button} from 'antd'

class Task extends React.Component{
  constructor (props) {
    super (props)
  }
  render () {
    return(
      <div>
       <Button type="primary">添加测验</Button>
      </div>
    )
  }
 }

 export default Task