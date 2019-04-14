import React from 'react'
import './style.less'
import nodata from '@/assets/img/nodata.svg'
class Nodata extends React.Component{
  constructor (props) {
    super(props)
  }
  render(){
    return(
      <div  className="nodata">
          <img src={nodata} /> 
          <p className="tips">暂时没有找到相关资源</p>
      </div>
    )
  }
}
export default Nodata